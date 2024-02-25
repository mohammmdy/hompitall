const asyncHandlers = require("express-async-handler");
const bcrypt = require("bcrypt");

const factory = require("./handellersFactory");
const generateToken = require("../utils/generateToken");
const User = require("../models/userModel");

// @desc    Get list of users
// @route   GET /api/v1/users
// @access  private
exports.getUsers = factory.getAll(User);

// @desc    Get specific user by id
// @route   GET /api/v1/users/:id
// @access  private
exports.getUser = factory.getOne(User);

// @desc    Create user
// @route   POST  /api/v1/users
// @access  Private
exports.createUser = factory.createOne(User);

// @desc    Update specific user
// @route   PUT /api/v1/users/:id
// @access  Private
exports.updateUser = factory.updateOne(User);

// @desc    Delete specific user
// @route   DELETE /api/v1/users/:id
// @access  Private
exports.deleteUser = factory.deleteOne(User);

// @desc    Get my data (logged user data)
// @route   GET /api/v1/users/getMe
// @access  private/protect
exports.getLoggedUserData = asyncHandlers(async (req, res, next) => {
  req.params.id = req.user._id;
  next();
});

exports.updateLoggedUserPassword = asyncHandlers(async (req, res, next) => {
  // Retrieve the user from the database
  const user = await User.findById(req.user._id);

  // Check if the provided current password matches the password in the database
  const isPasswordValid = await bcrypt.compare(
    req.body.currentPassword,
    user.password
  );

  if (!isPasswordValid) {
    return res.status(400).json({ error: "كلمة السر الحالية غير صحيحة" });
  }

  // Update user password based on user payload (req.user.id)
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      password: await bcrypt.hash(req.body.updatedPassword, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );

  // Generate token
  const token = generateToken(updatedUser._id);

  res.status(200).json({ data: updatedUser, token });
});

// @desc    update my data (logged user data without password or role)
// @route   PUT /api/v1/users/updateMe
// @access  private/protect
exports.updateLoggedUserData = asyncHandlers(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,

    req.body
    ,
    { new: true }
  );
  res.status(200).json({ data: updatedUser });
});

