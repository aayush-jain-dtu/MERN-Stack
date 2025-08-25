const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
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
  productTitle: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  productImage: {
    type: String,
    default: ''
  },
  dateAdded: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Cart', cartSchema);