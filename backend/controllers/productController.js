const Product = require('../models/Product');
const Vendor = require('../models/Vendor');

// @desc    Create new product (Vendor only)
// @route   POST /api/products
exports.createProduct = async (req, res) => {
  try {
    // Get vendor ID from logged in user
    const vendor = await Vendor.findOne({ user: req.user.id });
    
    if (!vendor) {
      return res.status(403).json({ 
        message: 'Only vendors can create products' 
      });
    }

    // Add vendor to product data
    req.body.vendor = vendor._id;

    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// @desc    Get all products
// @route   GET /api/products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('vendor', 'storeName');

    res.json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('vendor', 'storeName');

    if (!product) {
      return res.status(404).json({ 
        message: 'Product not found' 
      });
    }

    res.json({
      success: true,
      product
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// @desc    Update product (Vendor only)
// @route   PUT /api/products/:id
exports.updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ 
        message: 'Product not found' 
      });
    }

    // Check if product belongs to vendor
    const vendor = await Vendor.findOne({ user: req.user.id });
    
    if (!vendor || product.vendor.toString() !== vendor._id.toString()) {
      return res.status(403).json({ 
        message: 'Not authorized to update this product' 
      });
    }

    product = await Product.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      product
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// @desc    Delete product (Vendor only)
// @route   DELETE /api/products/:id
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ 
        message: 'Product not found' 
      });
    }

    // Check if product belongs to vendor
    const vendor = await Vendor.findOne({ user: req.user.id });
    
    if (!vendor || product.vendor.toString() !== vendor._id.toString()) {
      return res.status(403).json({ 
        message: 'Not authorized to delete this product' 
      });
    }

    await product.deleteOne();

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};