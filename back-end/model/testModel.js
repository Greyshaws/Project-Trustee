const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  address: {
    type: String,
    required: [true, 'Please provide your wallet address']
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
});

const Test = mongoose.model('Test', testSchema);

module.exports = Test;
