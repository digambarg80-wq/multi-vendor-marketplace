const express = require('express');
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,      // New import
  getFilteredProducts         // New import
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getProducts);
router.get('/filter', getFilteredProducts);           // Advanced filtering
router.get('/category/:categoryName', getProductsByCategory);  // Category specific
router.get('/:id', getProduct);

// Protected routes (Vendors only)
router.post('/', protect, authorize('vendor'), createProduct);
router.put('/:id', protect, authorize('vendor'), updateProduct);
router.delete('/:id', protect, authorize('vendor'), deleteProduct);

module.exports = router;