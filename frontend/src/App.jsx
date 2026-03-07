import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './providers/CartProvider';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import VendorDashboard from './pages/VendorDashboard';
import VendorProducts from './pages/VendorProducts';
import VendorCreateProduct from './pages/VendorCreateProduct';
import VendorEditProduct from './pages/VendorEditProduct';
import VendorOrders from './pages/VendorOrders';
import VendorAnalytics from './pages/VendorAnalytics';
import CategoryPage from './pages/CategoryPage';
import Payment from './pages/Payment';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />

          <Route path="/payment" element={<Payment />} />
<Route path="/category/:categoryName" element={<CategoryPage />} />
          
          {/* User Routes */}
          <Route path="/profile" element={<Profile />} />
          
          {/* Vendor Routes */}
          <Route path="/vendor/dashboard" element={<VendorDashboard />} />
          <Route path="/vendor/products" element={<VendorProducts />} />
          <Route path="/vendor/products/create" element={<VendorCreateProduct />} />
          <Route path="/vendor/products/edit/:id" element={<VendorEditProduct />} />
          <Route path="/vendor/orders" element={<VendorOrders />} />
          <Route path="/vendor/analytics" element={<VendorAnalytics />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;