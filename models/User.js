const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  age: { type: Number, required: true },
  company: { type: String },
});

const User = mongoose.model('User', userSchema);

module.exports = User;