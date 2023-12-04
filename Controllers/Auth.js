const User = require("../Models/User");
const catchAsync = require("../Utils/catchAsync");
const { sign } = require("../Utils/jwt");
const { comparePassword } = require("../Utils/password");

exports.login = catchAsync(async (req, res) => {
  const { phoneNumber, password } = req.body;

  if (!phoneNumber || !password)
    return res.status(400).json({
      message: "Invalid Ceredentails",
    });

  const user = await User.findOne({ phoneNumber });

  if (!user)
    return res.status(400).json({
      message: "Invalid Ceredentails",
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
    message: "Invalid Ceredentails",
  });
});
