const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  userProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  offeredProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  offeredId: { type: Schema.Types.ObjectId, ref: 'User' },
  orderDate: { type: Date, default: Date.now() },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
