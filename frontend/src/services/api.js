import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// ========== PRODUCT APIs ==========
export const fetchProducts = () => API.get('/products');
export const fetchProductById = (id) => API.get(`/products/${id}`);
export const fetchVendorProducts = () => API.get('/products/vendor');
export const createProduct = (productData) => API.post('/products', productData);
export const updateProduct = (id, productData) => API.put(`/products/${id}`, productData);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

// ========== CART APIs ==========
export const fetchCart = () => API.get('/cart');
export const addToCart = (productId, quantity = 1) => API.post('/cart', { productId, quantity });
export const updateCartItem = (itemId, quantity) => API.put(`/cart/${itemId}`, { quantity });
export const removeFromCart = (itemId) => API.delete(`/cart/${itemId}`);
export const clearCart = () => API.delete('/cart');

// ========== ORDER APIs ==========
export const createOrder = (orderData) => API.post('/orders', orderData);
export const fetchMyOrders = () => API.get('/orders/my-orders');
export const fetchOrderById = (id) => API.get(`/orders/${id}`);
export const fetchVendorOrders = () => API.get('/orders/vendor');
export const updateOrderStatus = (id, status) => API.put(`/orders/${id}/status`, { status });

// ========== ADDRESS APIs ==========
export const fetchAddresses = () => API.get('/addresses');
export const addAddress = (addressData) => API.post('/addresses', addressData);
export const updateAddress = (id, addressData) => API.put(`/addresses/${id}`, addressData);
export const deleteAddress = (id) => API.delete(`/addresses/${id}`);

// ========== ANALYTICS APIs ==========
export const fetchVendorAnalytics = () => API.get('/vendors/analytics');

// ========== AUTH APIs ==========
export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);

// ========== VENDOR APIs ==========
export const becomeSeller = (storeData) => API.post('/vendors/register', storeData);

// ========== FILTERED PRODUCT APIs ==========
export const fetchProductsByCategory = (categoryName) => 
  API.get(`/products/category/${categoryName}`);

export const fetchFilteredProducts = (filters) => {
  // Build query string from filters
  const params = new URLSearchParams();
  if (filters.category) params.append('category', filters.category);
  if (filters.minPrice) params.append('minPrice', filters.minPrice);
  if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
  if (filters.sortBy) params.append('sortBy', filters.sortBy);
  if (filters.order) params.append('order', filters.order);
  if (filters.page) params.append('page', filters.page);
  if (filters.limit) params.append('limit', filters.limit);
  
  return API.get(`/products/filter?${params.toString()}`);
};


export default API;