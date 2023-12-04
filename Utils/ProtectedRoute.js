const { decode } = require("./jwt");
const User = require("../Models/User");

module.exports = ProtectedRoute = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ");
  if (!token || !token[0] === "Bearer")
    return res.status(401).json({
      message: "Unauthorized",
    });

  const { user: id } = decode(token[1]);
  const user = await User.findById(id);
  if (!user)
    return res.status(404).json({
      message: "User Not Found",
    });
  req.user = user;
  return next();
};
