// @desc    Get products by category
// @route   GET /api/products/category/:categoryName
exports.getProductsByCategory = async (req, res) => {
  try {
    const { categoryName } = req.params;
    
    // Build filter object
    let filter = {};
    
    // Case-insensitive category search
    if (categoryName) {
      filter.category = { $regex: new RegExp(`^${categoryName}$`, 'i') };
    }

    // Get products with filter
    const products = await Product.find(filter)
      .populate('vendor', 'storeName')
      .sort('-createdAt');

    res.json({
      success: true,
      count: products.length,
      category: categoryName,
      products
    });
  } catch (error) {
    console.error('Error in getProductsByCategory:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// @desc    Get products with advanced filters (price, sort, pagination)
// @route   GET /api/products/filter
exports.getFilteredProducts = async (req, res) => {
  try {
    const { 
      category, 
      minPrice, 
      maxPrice, 
      sortBy = 'createdAt', 
      order = 'desc',
      page = 1,
      limit = 12
    } = req.query;

    // Build filter object
    let filter = {};
    
    // Category filter
    if (category) {
      filter.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }
    
    // Price range filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Sorting
    let sort = {};
    sort[sortBy] = order === 'desc' ? -1 : 1;

    // Pagination
    const skip = (page - 1) * limit;
    const total = await Product.countDocuments(filter);

    // Execute query
    const products = await Product.find(filter)
      .populate('vendor', 'storeName')
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    res.json({
      success: true,
      count: products.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      filters: { category, minPrice, maxPrice, sortBy, order },
      products
    });
  } catch (error) {
    console.error('Error in getFilteredProducts:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};