import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

const OrderConfirmation = () => {
  const location = useLocation();
  const { orderId, total } = location.state || {};

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-check-circle text-4xl text-green-600"></i>
          </div>
          <h1 className="text-2xl font-bold mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-4">Thank you for your purchase</p>
          
          {orderId && (
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-mono font-bold">{orderId}</p>
            </div>
          )}
          
          {total && (
            <p className="text-lg font-bold mb-6">Total Paid: ₹{total.toFixed(2)}</p>
          )}
          
          <div className="space-y-3">
            <Link
              to="/orders"
              className="block w-full bg-yellow-500 text-gray-900 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
            >
              Track Your Order
            </Link>
            <Link
              to="/"
              className="block w-full border py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;