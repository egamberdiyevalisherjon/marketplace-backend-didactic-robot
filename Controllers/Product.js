const Product = require("../Models/Product");
const catchAsync = require("../Utils/catchAsync");

exports.create = catchAsync(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).send(product);
});

exports.getAll = catchAsync(async (req, res, next) => {
  const data = await Product.find().populate("category");

  res.status(200).json(data);
});

exports.searchProduct = catchAsync(async (req, res, next) => {
  let text = req.query.q;
  const data = await Product.find({
    $or: [
      {
        "name.uz": { $regex: text, $options: "i" },
        "name.ru": { $regex: text, $options: "i" },
      },
    ],
  }).populate("category");

  res.status(200).json(data);
});

exports.getOne = catchAsync(async (req, res, next) => {
  const { _id } = req.params;
  const product = await Product.findOne({ _id });
  res.status(200).json(product);
});

exports.getAllByCategory = catchAsync(async (req, res, next) => {
  const { _id } = req.params;
  const data = await Product.find({ category: _id });
  res.status(200).json(data);
});

exports.deleteOne = catchAsync(async (req, res, next) => {
  const { _id } = req.params;
  await Product.findOneAndDelete({ _id });

  res.status(200).json({ message: "Product Deleted Successfully" });
});

exports.update = catchAsync(async (req, res) => {
  const { _id } = req.params;
  const product = await Product.findOneAndUpdate({ _id }, req.body);

  res.send(product);
});
