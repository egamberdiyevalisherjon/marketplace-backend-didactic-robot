const mongoose = require("mongoose");
const Client = require("../Models/Client");
const catchAsync = require("../Utils/catchAsync");
const { hashPassword } = require("../Utils/password");

exports.create = catchAsync(async (req, res) => {
  const { password, ...rest } = req.body;
  const hashedPassword = await hashPassword(password || rest.phoneNumber);

  const client = new Client({ ...rest, role: "monitor" });
  client.password = hashedPassword;

  await client.save();

  res.status(201).send(client);
});

exports.addToCart = catchAsync(async (req, res) => {
  if (!Array.isArray(req.body))
    return res.status(400).json({
      message: "Not an array",
    });
  const cartItems = req.body.map((i) => ({
    ...i,
    product: new mongoose.Types.ObjectId(i.product),
  }));
  let client = await Client.findByIdAndUpdate(
    req.client._id,
    { $push: { cart: cartItems } },
    { new: true }
  );

  res.send(client.cart);
});

exports.update = catchAsync(async (req, res) => {
  const { password, ...rest } = req.body;
  const { _id } = req.params;
  const client = await Client.findOne({ _id });

  for (let p in rest) {
    client[p] = rest[p];
  }

  if (password) {
    const hashedPassword = await hashPassword(req.body.phoneNumber);
    client.password = hashedPassword;
  }

  await client.save();

  res.send(client);
});

exports.getInfo = catchAsync(async (req, res) => {
  res.send(req.client);
});
