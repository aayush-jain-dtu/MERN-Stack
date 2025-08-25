const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  client: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed', 'Rejected'],
    default: 'Pending'
  },
  date: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  productTitle: {
    type: String
  },
  is_custom: {
    type: Boolean,
    default: false
  },
  description: {
    type: String
  },
  image: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);