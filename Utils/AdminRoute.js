const User = require("../Models/User");
const { decode } = require("./jwt");

module.exports = AdminRoute = async (req, res, next) => {
  const token = req.headers.authorization.split(" ");
  if (!token[0] === "Bearer")
    return res.status(401).json({
      message: "Unauthorized",
    });

  const { user: id } = decode(token[1]);
  const user = await User.findById(id);
  if (!user)
    return res.status(404).json({
      message: "User Not Found",
    });

  if (!user.role === "admin")
    return res.status(403).json({
      message: "Access Denied",
    });

  req.user = user;
  return next();
};
