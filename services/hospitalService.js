const factory = require("./handellersFactory");
const hospital = require("../models/hospitalModel");

// @desc    Get list of hospitals
// @route   GET /api/v1/hospitals
// @access  private
exports.gethospitals = factory.getAll(hospital);

// @desc    Create hospital
// @route   POST  /api/v1/hospitals
// @access  Private
exports.createhospital = factory.createOne(hospital);

// @desc    Update specific hospital
// @route   PUT /api/v1/hospitals/:id
// @access  Private
exports.updatehospital = factory.updateOne(hospital);

// @desc    Delete specific hospital
// @route   DELETE /api/v1/hospitals/:id
// @access  Private
exports.deletehospital = factory.deleteOne(hospital);




