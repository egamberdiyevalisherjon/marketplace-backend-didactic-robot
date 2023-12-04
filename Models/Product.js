const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    uz: String,
    ru: String,
  },
  meta: {
    title: String,
    desc: String,
    keywords: String,
  },
  exists: {
    type: Boolean,
    default: true,
  },
  price: String,
  color: {
    uz: String,
    ru: String,
  },
  description: {
    uz: String,
    ru: String,
  },
  image: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  sale: {
    type: Boolean,
    default: false,
  },
});

module.exports = Product = mongoose.model("product", productSchema);
