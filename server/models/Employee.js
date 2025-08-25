const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  contact: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  dept: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true,
    min: 0
  },
  leaves: {
    type: Number,
    default: 0,
    min: 0
  },
  password: {
    type: String,
    required: true,
    default: 'listiphy@1234'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Employee', employeeSchema);