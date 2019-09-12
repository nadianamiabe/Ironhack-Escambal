const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: [
      'Eletrônicos e materiais de escritório',
      'Esporte e Lazer',
      'Vestuário e Acessórios',
      'Casa, Cozinha e Jardim',
      'Beleza e Cuidados pessoais',
      'Outros',
    ],
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  imageUrl: String,
  quantity: { type: Number, min: 1, required: true },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
