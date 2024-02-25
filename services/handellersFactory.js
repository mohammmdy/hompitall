const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");
const { model } = require("mongoose");
const User = require("../models/userModel");

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const Doc = await Model.create(req.body);
    res.status(201).json({ data: Doc });
  });

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    // const{ id } = req.params;
    let document = Model;

    if (Model == User) {
      document = await Model.findByIdAndUpdate(req.params.id,
        { active: false },
      );

    } else {
      document = await Model.findByIdAndDelete(req.params.id);
    }

    if (!document) {
      return next(new ApiError(`No document for this id ${id}`, 404));
    }
    res.status(201).json({ msg: 'sucsses' });
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!document) {
      return next(
        new ApiError(`No document for this id ${req.params.id}`, 404)
      );
    }
    document.save()
    res.status(200).json({ data: document });
  });

exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findById(id);
    if (!document) {
      return next(new ApiError(`No document for this id ${id}`, 404));
    }
    res.status(200).json({ data: document });
  });

exports.getAll = (Model, modelName = "") =>
  asyncHandler(async (req, res) => {
    let filter = {};
    if (req.filterObj) {
      filter = req.filterObj;
    }
    // Build query
    const documentsCounts = await Model.countDocuments();
    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
      .paginate(documentsCounts)
      .filter()
      .search(modelName)
      .limitFields()
      .sort();

    // Execute query
    const { mongooseQuery, paginationResult } = apiFeatures;
    const documents = await mongooseQuery;

    res
      .status(200)
      .json({ results: documents.length, paginationResult, data: documents });
  });
