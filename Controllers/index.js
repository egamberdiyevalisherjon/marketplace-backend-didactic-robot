const AppError = require("../Utils/appError");
const catchAsync = require("../Utils/catchAsync");

exports.getAllOf = (Model) =>
  catchAsync(async (req, res, next) => {
    const list = await Model.find({});
    res.status(200).json(list);
  });

exports.getOneOf = (Model) =>
  catchAsync(async (req, res, next) => {
    const { _id } = req.params;
    const item = await Model.findOne({ _id });
    res.status(200).json(item);
  });

exports.create = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.create(req.body);
    if (data) {
      res.status(201).json(data);
    } else {
      next(new AppError("errorInCreation"));
    }
  });

exports.update = (Model) =>
  catchAsync(async (req, res, next) => {
    const { _id } = req.params;
    const data = await Model.findOneAndUpdate({ _id }, { ...req.body });
    if (data) {
      res.status(200).json(data);
    } else {
      next(new AppError("generalError"));
    }
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const { _id } = req.params;
    const data = await Model.deleteOne({ _id });
    if (data.deletedCount === 1) {
      res.status(200).json({
        message: "deletedSuccessfully",
      });
    } else {
      next(new AppError("errorInDeletion"));
    }
  });
