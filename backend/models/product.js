const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  services: [String],
  category: String,
  brand: String,
  stock: Number,
  ratting: {
    type: Number,
    default: 0,
  },
  photos: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("product", productSchema);
