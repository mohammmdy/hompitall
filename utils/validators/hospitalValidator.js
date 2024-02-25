const slugify = require("slugify");
const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddelware");
const hospital = require("../../models/hospitalModel");
const bcrypt = require("bcrypt");

exports.createHospitalValidator = [
  check("name")
    .notEmpty()
    .withMessage("hospital name required")
    .isLength({ min: 3 })
    .withMessage("Too short hospital name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    })
    .custom((val) =>
      hospital.findOne({ name: val }).then((hospital) => {
        if (hospital) {
          return Promise.reject(new Error(`this hospital is already exist`));
        }
      })
    ),

  check("email")
    .optional()
    .isEmail()
    .withMessage("invalid email")
    .custom((val) =>
      hospital.findOne({ email: val }).then((hospital) => {
        if (hospital) {
          return Promise.reject(new Error(`E-mail already in use`));
        }
      })
    ),
  check('address')
    .notEmpty()
    .withMessage('address required ')
    .custom((val) =>
      hospital.findOne({ address: val }).then((hospital) => {
        if (hospital) {
          return Promise.reject(new Error(`this address is already exist`));
        }
      })
    ),
  check('beds')
    .notEmpty()
    .withMessage('beds required '),

  check("phone")
    .notEmpty()
    .withMessage('phone required'),
  check('cases')
    .notEmpty()
    .withMessage('cases required')
  ,
  check('type')
    .notEmpty().withMessage('type required'),
  check('latitude')
    .notEmpty().withMessage('latitude required'),
  check('longitude')
    .notEmpty().withMessage('longitude required'),
  validatorMiddleware,

];


exports.updateHospitalValidator = [
  check("id").isMongoId().withMessage("Invalid hospital id format"),
  body("name")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    })
    .custom((val) =>
      hospital.findOne({ name: val }).then((hospital) => {
        if (hospital) {
          return Promise.reject(new Error(`hospital name already in use`));
        }
      })
    ),
  check('address').optional(),
  check('latitude').optional(),
  check('longitude').optional(),
  check("email")
    .optional()
    .isEmail()
    .withMessage("invalid email")
    .custom((val) =>
      hospital.findOne({ email: val }).then((hospital) => {
        if (hospital) {
          return Promise.reject(new Error(`E-mail already in use`));
        }
      })
    ),

  check("phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage("invalid phone number only accept Egy and SA phone numbers"),
  validatorMiddleware,
];


exports.deleteHospitalValidator = [
  check("id").isMongoId().withMessage("Invalid hospital id format")
    .custom(async (val) => {
      const Hospital = await hospital.findById(val)
      if (!Hospital) return Promise.reject(new Error(`there is no hospital for this id`));
      return true
    }),
  validatorMiddleware,
];
