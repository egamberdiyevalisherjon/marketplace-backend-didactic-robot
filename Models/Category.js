const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  uz: String,
  ru: String,
  image: String,
});

module.exports = Category = mongoose.model("category", CategorySchema);
