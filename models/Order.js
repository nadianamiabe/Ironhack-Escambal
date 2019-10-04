const mongoose = require("mongoose");

const { Schema } = mongoose;

const orderSchema = new Schema({
  myProducts: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  userProducts: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  userId: { type: Array },
  myUser: { type: Schema.Types.ObjectId, ref: "User" },
  orderDate: { type: Date, default: Date.now() },
  accept: { type: Boolean, default: false }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
