const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide product name'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Please provide price'],
    min: 0
  },
  description: {
    type: String,
    required: [true, 'Please provide description']
  },
  category: {
    type: String,
    required: [true, 'Please provide category'],
    enum: ['electronics', 'clothing', 'books', 'home', 'other']
  },
  stock: {
    type: Number,
    required: [true, 'Please provide stock quantity'],
    min: 0,
    default: 0
  },
  images: [{
    type: String,
    default: []
  }],
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);