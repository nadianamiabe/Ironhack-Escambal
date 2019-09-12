const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, minlength: 6 },
  cpf: { type: Number, required: true },
  phoneNumber: { type: Number, required: true },
  adress: {
    road: { type: String, required: true },
    number: { type: Number, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    complement: { type: String, required: true },
    cep: { type: Number, required: true },
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
