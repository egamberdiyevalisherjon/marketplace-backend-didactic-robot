const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  password: String,
  role: {
    type: String,
    enum: ["monitor", "admin"],
    default: "monitor",
  },
});

module.exports = User = mongoose.model("user", userSchema);
