const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  password: String,
  cart: [
    {
      product: { type: mongoose.SchemaTypes.ObjectId, ref: "product" },
      quantity: { type: Number, default: 1 },
    },
  ],
});

module.exports = Client = mongoose.model("client", clientSchema);
