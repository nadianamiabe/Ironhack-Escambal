const mongoose = require("mongoose");

const { Schema } = mongoose;

const orderSchema = new Schema({
  myProducts: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  userProducts: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  myUserId: { type: Schema.Types.ObjectId, ref: "User" },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  orderDate: { type: Date, default: Date.now() }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
