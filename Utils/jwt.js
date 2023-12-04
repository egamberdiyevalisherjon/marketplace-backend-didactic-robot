const jwt = require("jsonwebtoken");

exports.sign = (object) => jwt.sign(object, process.env.JWT_SECRET);

exports.decode = (token) => jwt.verify(token, process.env.JWT_SECRET);;
