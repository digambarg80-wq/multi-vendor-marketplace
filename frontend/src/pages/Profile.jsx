import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState('buying');
  const [showSellerForm, setShowSellerForm] = useState(false);
  const [storeData, setStoreData] = useState({
    storeName: '',
    description: '',
    address: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Move all logic inside useEffect
    const loadUser = () => {
      try {
        const userData = localStorage.getItem('user');
        if (!userData) {
          navigate('/login');
          return;
        }
        
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error loading user:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [navigate]); // Only depend on navigate

  const handleBecomeSeller = async (e) => {
    e.preventDefault();
    try {
      // Demo mode - no API call
      alert('Seller registration successful! (Demo mode)');
      
      // Update user in localStorage
      const updatedUser = { ...user, isSeller: true };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setShowSellerForm(false);
      setMode('selling');
    } catch (error) {
      console.error('Failed to become seller:', error);
      alert('Failed to become seller. Please try again.');
    }
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

  if (!user) {
    return null; // This will never render because navigate happens first
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center">
                <i className="fas fa-user-circle text-4xl text-yellow-600"></i>
              </div>
              <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Mode Toggle Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Account Mode</h2>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${mode === 'buying' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}>
                  <i className="fas fa-shopping-bag text-xl"></i>
                </div>
                <div>
                  <p className="font-medium">Current Mode: <span className="capitalize">{mode}</span></p>
                  <p className="text-sm text-gray-500">
                    {mode === 'buying' ? 'You are browsing as a buyer' : 'You are managing your store'}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setMode('buying')}
                  className={`px-4 py-2 rounded-lg transition ${
                    mode === 'buying' 
                      ? 'bg-yellow-500 text-white' 
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  <i className="fas fa-shopping-bag mr-2"></i>
                  Buy Mode
                </button>
                {user.isSeller && (
                  <button
                    onClick={() => setMode('selling')}
                    className={`px-4 py-2 rounded-lg transition ${
                      mode === 'selling' 
                        ? 'bg-yellow-500 text-white' 
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    <i className="fas fa-store mr-2"></i>
                    Sell Mode
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Buyer Section */}
          {(mode === 'buying' || !user.isSeller) && (
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <i className="fas fa-shopping-bag text-yellow-500 mr-2"></i>
                Buyer Dashboard
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-gray-600">Orders</p>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-gray-600">Items in Cart</p>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-gray-600">Wishlist</p>
                </div>
              </div>
              <div className="mt-4 text-center">
                <Link to="/" className="text-yellow-600 hover:underline">
                  Continue Shopping →
                </Link>
              </div>
            </div>
          )}

          {/* Seller Section */}
          {user.isSeller && mode === 'selling' && (
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <i className="fas fa-store text-yellow-500 mr-2"></i>
                Seller Dashboard
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-gray-600">Products</p>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold">₹0</p>
                  <p className="text-gray-600">Total Sales</p>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-gray-600">Orders</p>
                </div>
              </div>
              <div className="mt-4 text-center">
                <Link to="/vendor/dashboard" className="text-yellow-600 hover:underline">
                  Manage Store →
                </Link>
              </div>
            </div>
          )}

          {/* Become Seller Section */}
          {!user.isSeller && !showSellerForm && (
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-2xl p-6 text-center">
              <h2 className="text-xl font-bold mb-2">Want to start selling?</h2>
              <p className="text-gray-600 mb-4">Join thousands of sellers on our platform</p>
              <button
                onClick={() => setShowSellerForm(true)}
                className="bg-yellow-500 text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition"
              >
                <i className="fas fa-store mr-2"></i>
                Become a Seller
              </button>
            </div>
          )}

          {/* Seller Registration Form */}
          {showSellerForm && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Register Your Store</h2>
              <form onSubmit={handleBecomeSeller}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Store Name
                  </label>
                  <input
                    type="text"
                    value={storeData.storeName}
                    onChange={(e) => setStoreData({...storeData, storeName: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Store Description
                  </label>
                  <textarea
                    value={storeData.description}
                    onChange={(e) => setStoreData({...storeData, description: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    rows="3"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Business Address
                  </label>
                  <input
                    type="text"
                    value={storeData.address}
                    onChange={(e) => setStoreData({...storeData, address: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="bg-yellow-500 text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition"
                  >
                    Start Selling
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSellerForm(false)}
                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;