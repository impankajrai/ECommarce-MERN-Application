const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  quantity: {type:Number,default:1},
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  product:{type: mongoose.Schema.Types.ObjectId, ref: "product"}
  
});

module.exports = mongoose.model("wishlist", wishlistSchema);
