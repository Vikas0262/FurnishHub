// iske andar mongoose ke help se schema banayenge  aur yahi schema mongoodb ke collection se connect rahega aur operation perform karenge

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model('users',UserSchema)// Users ke name se collection banega  aur UserSchema se attach kar deng
module.exports = UserModel;