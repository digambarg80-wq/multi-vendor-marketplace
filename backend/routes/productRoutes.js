const express = require('express');
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getFilteredProducts
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');

// IMPORTANT: Put more specific routes FIRST
router.get('/filter', getFilteredProducts);           // This must come BEFORE /:id
router.get('/category/:categoryName', getProductsByCategory);  // This too

// Then general routes
router.get('/', getProducts);
router.get('/:id', getProduct);

// Protected routes
router.post('/', protect, authorize('vendor'), createProduct);
router.put('/:id', protect, authorize('vendor'), updateProduct);
router.delete('/:id', protect, authorize('vendor'), deleteProduct);

module.exports = router;