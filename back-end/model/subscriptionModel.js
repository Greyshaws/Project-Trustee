const mongoose = require('mongoose');
const { subStatus } = require('../utils');


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
  new: {
    type: Boolean,
    default: true
  },
  status: {
    type: String,
    default: subStatus.subscription,
    enum: {
        values: [subStatus.subscription, subStatus.checked, subStatus.activated, subStatus.renewed],
        message: 'Invalid option'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
});

const Subscription = mongoose.model('Subscription', SubscriptionSchema);

module.exports = Subscription;
