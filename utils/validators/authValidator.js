const slugify = require("slugify");
const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddelware");
const User = require("../../models/userModel");
// const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])/;
const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z]).{6,}$/;
const gmailRegex = /@gmail\.com$/;


exports.signupValidator = [
  check("userName")
    .notEmpty()
    .withMessage("يرجى ادخال اسم المستخدم")
    .isLength({ min: 3 })
    .withMessage("اسم المستخدم ثلاثة حروف او اكتر")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("email")
    .notEmpty()
    .withMessage("الخاص بك'gmail'يرجى ادخال ")
    .isEmail()
    .withMessage("الخاص بك بطريقة صحيحة'gmail'يرجى ادخال ")
    .custom((val) => {
      if (!gmailRegex.test(val)) {
        throw new Error("يجب أن يكون البريد الإلكتروني من نوع Gmail");
      }
      return true
    })
    .custom((val) =>
      User.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error(`!هذا الايميل مستخدم بالفعل`));
        }
      })
    ),

  check("password")
    .notEmpty()
    .withMessage("يرجى ادخال كلمة المرور")
    .isLength({ min: 6 })
    .withMessage("يجب أن تكون كلمة المرور على الأقل 6 أحرف")
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
    .withMessage("يرجى تأكيد كلمة السر"),

  check("role").optional(),

  check("gender").notEmpty().withMessage("يرجى ادخال النوع "),

  check("age")
    .optional()
    .isNumeric()
    .withMessage("يرجى ادخال العمر بشكل صحيح"),

  check("phone")
    .notEmpty()
    .withMessage("يرجى ادخال رقم الهاتف")
    .isMobilePhone(["ar-EG"])
    .withMessage("رقم الهاتف يجب ان يكون مصرى"),
  validatorMiddleware,
];

exports.loginValidator = [
  check("email")
    .notEmpty()
    .withMessage("يرجى ادخال الايميل الخاص بك"),

  check("password")
    .notEmpty()
    .withMessage("يرجى ادخال كلمة السر"),
  validatorMiddleware,
];

exports.resetPasswordValidator = [
  check("newPassword")
    .notEmpty()
    .withMessage('يجب ادخال كلمة سر جديدة')
    .isLength({ min: 6 })
    .withMessage("يجب أن تكون كلمة المرور على الأقل 6 أحرف")
    // .custom((password, { req }) => {
    //   if (!passwordRegex.test(password)) {
    //     throw new Error('[!@#$%^&*(),.?":{}|<>]كلمة المرور يجب أن تحتوي على حرف كبير وحرف خاص');
    //   }
    // })
    .matches(passwordRegex)
    .withMessage('[!@#$%^&*(),.?":{}|<>]كلمة المرور يجب أن تحتوي على حرف كبير وحرف خاص')
    .custom((newPassword, { req }) => {
      if (newPassword !== req.body.passwordConfirm) {
        throw new Error("تأكيد كلمة المرور غير صحيح");
      }
      return true;
    }),

  validatorMiddleware,
];
