const crypto = require("crypto");

const jwt = require("jsonwebtoken");
const bcrybt = require("bcrypt");

const asyncHandlers = require("express-async-handler");
const ApiError = require("../utils/apiError");
const sendEmail = require("../utils/sendEmail");
const generateToken = require("../utils/generateToken");

const User = require("../models/userModel");
const { response } = require("express");

// @desc    SignUp
// @route   GET /api/v1/auth/signup
// @access  Public
exports.signup = asyncHandlers(async (req, res, next) => {
  //1.create user

  const user = await User.create({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    gender: req.body.gender,
    phone: req.body.phone,
    age: req.body.age,
  });
  //2.send response to client side
  res.status(201).json({ data: user });
});

// @desc    login
// @route   GET /api/v1/auth/login
// @access  Public
exports.login = asyncHandlers(async (req, res, next) => {
  //1.check if user exists&check if password is correct
  const user = await User.findOne({ email: req.body.email });
  const userActive = await User.findOne({ email: req.body.email, active: false });
  if (userActive) {
    return next(new ApiError("هذا المستخدم تم حظره مؤقتا", 401))
  }
  if (!user || !(await bcrybt.compare(req.body.password, user.password))) {
    return next(new ApiError("خطأ فى الايميل او كلمة السر", 401));
  }

  //2.genarate token
  const token = generateToken(user.id);

  //3.send response to client side
  res.status(200).json({ data: user, token });
});

// @desc   make sure the user is authenticated(logged in)
exports.protect = asyncHandlers(async (req, res, next) => {
  //1.check if token exists,if exists get it
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new ApiError(
        "يرجى تسجيل الدخول اولا ",
        401
      )
    );
  }
  //2.verefy token (no change happened,expired token)
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  //3.check if user exists
  const currentUser = await User.findById(decoded.userId);
  if (!currentUser) {
    return next(
      new ApiError(
        "المستخدم غير موجود ",
        401
      )
    );
  }
  //4.check if user changed password after token created
  if (currentUser.passwordChangedAt) {
    const passChangedTimestamp = parseInt(
      currentUser.passwordChangedAt.getTime() / 1000,
      10
    );
    //password Changed after token created (error)
    if (currentUser.passwordChangedAt) {
      if (passChangedTimestamp > decoded.iat) {
        return next(
          new ApiError("المستخدم قام بتغيير كلمة السر برجاء اعادة تسجيل الدخول", 401)
        );
      }
    }
  }
  req.user = currentUser;
  next();
});

//@desc    Authorization (user permissions)
exports.allowedTo = (role) =>
  asyncHandlers(async (req, res, next) => {
    //1.access roles
    //2.access registered user (req.user.role)
    if (!role.includes(req.user.role)) {
      return next(
        new ApiError("غير مسموح لك ", 403)
      );
    }
    next();
  });

// @desc    Forget password
// @route   POST /api/v1/auth/forgotPassword
// @access  Public
exports.forgotPassword = asyncHandlers(async (req, res, next) => {
  //1.get user by email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new ApiError(`لا يوجد مستخدم لهذا الايميل : ${req.body.email}`, 404)
    );
  }

  //2.if user exists , generate hash reset random 6 digits and save it un db
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(resetCode)
    .digest("hex");

  //#save hashed password reset code into db
  user.passwordResetCode = hashedResetCode;
  //#1.add expiration time for password reset code
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  user.passwordResetVerefied = false;
  //#2.save password to database
  await user.save();

  const message = `Hi ${user.userName}, \n We received a request to reset password on your email account. \n >>>>> ${resetCode} <<<<< \n Enter the code to complete the reset. \n Thanks for helping us keep your account secure :)  \n Homepital team `;


  //3.send the reset code via email 
  try {
    console.log(message);
    await sendEmail({
      email: user.email,
      message,
      subject: "your password reset code (it's valid for 10 minutes)",
    });
  } catch (err) {
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetVerefied = undefined;

    await user.save();
    return next(new ApiError("حدث خطأ فى ارسال الكود للايميل الخاص بك", 500));
  }
  res
    .status(200)
    .json({ status: "success", message: "تم ارسال الكود الخاص بك" });
});

// @desc    verify password reset code
// @route   POST /api/v1/auth/verifyResetCode
// @access  Public
exports.verifyPasswordResetCode = asyncHandlers(async (req, res, next) => {
  //  get user based on reset code
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(req.body.resetCode)
    .digest("hex");
  const user = await User.findOne({
    passwordResetCode: hashedResetCode,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ApiError("الكود غير صحيح او انتهت صلاحيته"));
  } else {
    user.passwordResetVerefied = true;

    await user.save();
    // create token to know who change his pass
    const token = generateToken(user.id);
    res.status(200).json({ message: "الكود صحيح", data: user, token });

  }
});

// @desc    Reset password
// @route   POST /api/v1/auth/resetPassword
// @access  Public
exports.resetPassword = asyncHandlers(async (req, res, next) => {
  //1. Get user from the request object
  const user = req.user
  // Check if user exists
  if (!user) {
    return next(
      new ApiError(`لا يوجد مستخدم خاص بهذا الكود`, 404)
    );
  }

  //2. Check if reset code verified
  if (!user.passwordResetVerefied) {
    return next(new ApiError(`انتهت صلاحية الكود`, 400));
  }

  // Update user password and reset related fields
  user.password = req.body.newPassword;
  user.passwordResetVerefied = undefined;
  user.passwordResetExpires = undefined;
  user.passwordResetCode = undefined;

  await user.save();

  res.status(200).json('تم تغيير كلمة السر بنجاح');
});
