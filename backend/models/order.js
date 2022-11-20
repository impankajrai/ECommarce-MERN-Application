const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
        quantity: { type: Number, default: 1 },
      },
    ],
    status: String,
    shippingDetails: {
      name: String,
      mobile: Number,
      addressLine1: String,
      addressLine2: String,
      landmark: String,
      city: String,
      state: String,
      pincode: String,
      country: String,
    },
    paymentDetails: {
      refrenceNumber: String,
      mode: String,
      ammount: Number,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
});

module.exports = mongoose.model("order", orderSchema);
