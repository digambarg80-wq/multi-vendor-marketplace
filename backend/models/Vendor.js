const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  storeName: {
    type: String,
    required: [true, 'Please provide a store name'],
    unique: true
  },
  storeLogo: {
    type: String,
    default: ''
  },
  description: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  commission: {
    type: Number,
    default: 10 // 10% default commission
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Vendor', vendorSchema);