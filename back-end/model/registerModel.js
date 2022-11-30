const mongoose = require('mongoose');

const RegisterSchema = new mongoose.Schema({
  address: {
    type: String,
    required: [true, 'Please provide your wallet address']
  },
  index: {
    type: Number,
    required: [true, 'Please provide an index']
  },
  period: {
    type: Number,
    required: [true, 'Please provide a period']
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  }
});

const Register = mongoose.model('Register', RegisterSchema);

module.exports = Register;
