const Client = require("../Models/Client");
const User = require("../Models/User");
const catchAsync = require("../Utils/catchAsync");
const { sign } = require("../Utils/jwt");
const { comparePassword } = require("../Utils/password");

exports.login = catchAsync(async (req, res) => {
  const { phoneNumber, password } = req.body;

  if (!phoneNumber || !password)
    return res.status(400).json({
      message: "Invalid Credentials",
    });

  const user = await User.findOne({ phoneNumber });

  if (!user)
    return res.status(400).json({
      message: "Invalid Credentials",
    });

  const isMatch = await comparePassword(password, user.password);

  if (isMatch) {
    const token = sign({
      user: user._id,
    });

    return res.status(200).json({
      token,
      user,
    });
  }

  res.status(400).json({
    message: "Invalid Credentials",
  });
});

exports.loginClient = catchAsync(async (req, res) => {
  const { phoneNumber, password } = req.body;

  if (!phoneNumber || !password)
    return res.status(400).json({
      message: "Invalid Credentials",
    });

  const client = await Client.findOne({ phoneNumber });

  if (!client)
    return res.status(400).json({
      message: "Invalid Credentials",
    });

  const isMatch = await comparePassword(password, client.password);

  if (isMatch) {
    const token = sign({
      client: client._id,
    });

    return res.status(200).json({
      token,
      client,
    });
  }

  res.status(400).json({
    message: "Invalid Credentials",
  });
});
