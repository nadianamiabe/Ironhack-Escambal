const mongoose = require("mongoose");

const { Schema } = mongoose;

const productUserSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: [
      "Eletrônicos e materiais de escritório",
      "Esporte e Lazer",
      "Vestuário e Acessórios",
      "Casa, Cozinha e Jardim",
      "Beleza e Cuidados pessoais",
      "Outros"
    ]
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  imageUrl: { type: String },
  quantity: { type: Number, min: 1, required: true },
  status: {
    type: String,
    enum: ["Disponível", "Pendente", "Extra", "Indisponível"]
  },
  productUser: [
    {
      _id: { type: String },
      name: { type: String },
      email: { type: String },
      password: { type: String },
      cpf: { type: Number },
      phoneNumber: { type: Number },
      address: {
        state: { type: String },
        city: { type: String },
        road: { type: String },
        number: { type: Number },
        cep: { type: Number },
        complement: { type: String }
      }
    }
  ]
});

const ProductUser = mongoose.model("ProductUser", productUserSchema);

module.exports = ProductUser;
