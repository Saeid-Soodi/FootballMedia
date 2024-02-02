const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  familyName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  birthDate: {
    type: String,
    required: true,
  },
  pass: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'USER',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
});

module.exports = mongoose.model('User', userSchema);
