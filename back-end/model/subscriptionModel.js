const mongoose = require('mongoose');


const SubscriptionSchema = new mongoose.Schema({
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
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
});

const Subscription = mongoose.model('Subscription', SubscriptionSchema);

module.exports = Subscription;
