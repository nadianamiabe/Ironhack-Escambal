const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, minlength: 6 },
  cpf: { type: Number, required: true },
  phoneNumber: { type: Number, required: false },
  adress: [
    {
      road: { type: String, required: false },
      number: { type: Number, required: false },
      city: { type: String, required: false },
      state: { type: String, required: false },
      complement: { type: String, required: false },
      cep: { type: Number, required: false },
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
