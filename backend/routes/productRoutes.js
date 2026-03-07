const express = require('express');
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getProducts);
router.get('/:id', getProduct);

// Protected routes (Vendors only)
router.post(
  '/', 
  protect, 
  authorize('vendor'), 
  createProduct
);

router.put(
  '/:id', 
  protect, 
  authorize('vendor'), 
  updateProduct
);

router.delete(
  '/:id', 
  protect, 
  authorize('vendor'), 
  deleteProduct
);

module.exports = router;