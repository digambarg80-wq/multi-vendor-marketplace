import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useCart from '../hooks/useCart'; // Fixed import
import Navbar from '../components/Navbar';

const Cart = () => {
  const navigate = useNavigate();
  // Removed cartCount since it's not used in this file
  const { cart, loading, updateItem, removeItem } = useCart();
  const [updating, setUpdating] = useState(false);

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setUpdating(true);
    await updateItem(itemId, newQuantity);
    setUpdating(false);
  };

  const handleRemove = async (itemId) => {
    if (window.confirm('Remove this item from cart?')) {
      setUpdating(true);
      await removeItem(itemId);
      setUpdating(false);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

        {cart.items?.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <i className="fas fa-shopping-cart text-5xl text-gray-400 mb-4"></i>
            <h2 className="text-2xl font-medium text-gray-700 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added anything yet</p>
            <Link
              to="/"
              className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition inline-flex items-center"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items?.map((item) => (
                <div key={item._id} className="bg-white rounded-2xl shadow-sm p-4 flex items-center">
                  <img
                    src={item.product?.images?.[0] || 'https://via.placeholder.com/100'}
                    alt={item.product?.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1 ml-4">
                    <Link to={`/product/${item.product?._id}`} className="font-medium hover:text-yellow-600">
                      {item.product?.name}
                    </Link>
                    <p className="text-sm text-gray-500">₹{item.product?.price}</p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                        disabled={updating || item.quantity <= 1}
                        className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
                      >
                        <i className="fas fa-minus text-xs"></i>
                      </button>
                      <span className="px-3 py-1 border-x">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                        disabled={updating}
                        className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
                      >
                        <i className="fas fa-plus text-xs"></i>
                      </button>
                    </div>
                    
                    <button
                      onClick={() => handleRemove(item._id)}
                      disabled={updating}
                      className="text-red-500 hover:text-red-700 disabled:opacity-50"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-20">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{cart.total?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>₹{cart.total?.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={updating}
                  className="w-full bg-yellow-500 text-gray-900 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition disabled:opacity-50"
                >
                  Proceed to Checkout
                </button>

                <Link
                  to="/"
                  className="w-full text-center text-gray-600 hover:text-gray-800 mt-4 inline-block"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;