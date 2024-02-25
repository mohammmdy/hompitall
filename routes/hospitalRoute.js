const express = require("express");
const {
  createHospitalValidator,
  updateHospitalValidator,
  deleteHospitalValidator
} = require("../utils/validators/hospitalValidator");



const {
  createhospital,
  updatehospital,
  deletehospital,
  gethospitals
} = require("../services/hospitalService");

const router = express.Router();

const authService = require('../services/authService')
router.use(authService.protect, authService.allowedTo("admin")); //this middleware is general for all routes(in use)

router.route("/")
  .get(gethospitals)
  .post(createHospitalValidator, createhospital);
router
  .route("/:id")
  .put(updateHospitalValidator, updatehospital)
  .delete(deleteHospitalValidator, deletehospital);

module.exports = router;
