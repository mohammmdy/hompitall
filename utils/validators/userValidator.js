const slugify = require("slugify");
const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddelware");
const User = require("../../models/userModel");
const bcrypt = require("bcrypt");
const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z]).{6,}$/;
const gmailRegex = /@gmail\.com$/;

exports.createUserValidator = [
  check("userName")
    .notEmpty()
    .withMessage("User required")
    .isLength({ min: 3 })
    .withMessage("Too short User name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

  check("email")
    .notEmpty()
    .withMessage("email is requiered")
    .isEmail()
    .withMessage("invalid email")
    .custom((val) =>
      User.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error(`E-mail already in use`));
        }
      })
    ),

  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters")
    .custom((password, { req }) => {
      if (!passwordRegex.test(password)) {
        throw new Error('[!@#$%^&*(),.?":{}|<>]كلمة المرور يجب أن تحتوي على حرف كبير وحرف خاص');
      }

      if (password !== req.body.passwordConfirm) {
        throw new Error("تأكيد كلمة المرور غير صحيح");
      }

      return true;
    }),

  check("passwordConfirm")
    .notEmpty()
    .withMessage("password confirm is required"),

  check("phone")
    .optional()
    .isMobilePhone(["ar-EG"])
    .withMessage("invalid phone number only accept Egy phone numbers"),

  check("role").optional(),
  validatorMiddleware,
];

exports.getUserValidator = [
  check("id").isMongoId().withMessage("Invalid user id format"),
  validatorMiddleware,
];

exports.updateUserValidator = [
  check("id").isMongoId().withMessage("Invalid User id format"),
  body("userName")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("email")
    .optional()
    .isEmail()
    .withMessage("invalid email")
    .custom((val) =>
      User.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error(`E-mail already in use`));
        }
      })
    ),
  check("phone")
    .optional()
    .isMobilePhone(["ar-EG"])
    .withMessage("invalid phone number only accept Egy phone numbers"),

  check("age").optional(),

  check("gender").optional(),

  check("role").optional(),
  validatorMiddleware,
];

exports.changeUserPasswordValidator = [
  body("currentPassword")
    .notEmpty()
    .withMessage("يرجى ادخال كلمة كلمة السر الحالية"),
  body("passwordConfirm")
    .notEmpty()
    .withMessage("يرجى تأكيد كلمة السر الجديدة"),
  body("updatedPassword")
    .notEmpty()
    .withMessage("يرجى ادخال كلمة السر الجديدة")
    .matches(passwordRegex)
    .withMessage('[!@#$%^&*(),.?":{}|<>]كلمة المرور يجب أن تحتوي على حرف كبير وحرف خاص')
    .custom(async (val, { req }) => {
      //verify password confirmation
      if (val !== req.body.passwordConfirm) {
        throw new Error("يرجى ادخال تأكيد كلمة السر بشكل صحيح");
      }
      return true;
    }),
  validatorMiddleware,
];

exports.deleteUserValidator = [
  check("id").isMongoId().withMessage("Invalid User id format")
    .custom(async (val) => {
      const user = await User.findById(val)
      if (!user) return Promise.reject(new Error(`there is no user for this id`));
      if (user.active == false) return Promise.reject(new Error(`user is diactivated already`));
      return true
    }),

  validatorMiddleware,
];

exports.updateLoggedUserValidator = [
  body("userName")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("email")
    .optional()
    .isEmail()
    .withMessage("يرجى ادخال الايميل بطريقة صحيحة")
    .custom((val) => {
      if (!gmailRegex.test(val)) {
        throw new Error("يجب أن يكون البريد الإلكتروني من نوع Gmail");
      }
      return true;

    })
    .custom((val) =>
      User.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error(`هذا الايميل مستخدم بالفعل`));
        }
      })
    )
  ,
  check("phone")
    .optional()
    .isMobilePhone(["ar-EG"])
    .withMessage("رقم الهاتف يجب ان يكون مصرى"),

  validatorMiddleware,
];
