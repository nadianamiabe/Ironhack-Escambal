const mongoose = require('mongoose');

const { Schema } = mongoose;

const rateSchema = new Schema({
  rate: {
    type: Number,
    default: 5,
    enum: [1, 2, 3, 4, 5],
    required: true,
  },
  coment: { type: String },
  orderId: { type: Schema.Types.ObjectId, ref: 'Order' },
});

const Rate = mongoose.model('Rate', rateSchema);

module.exports = Rate;
