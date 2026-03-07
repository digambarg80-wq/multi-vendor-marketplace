import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useCart from '../hooks/useCart'; // Fixed import - default import, no curly braces

const Navbar = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [hoverTimer, setHoverTimer] = useState(null); // Timer for dropdown delay
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { cartCount } = useCart();

  // Load user from localStorage on component mount
  useEffect(() => {
    const initializeUser = () => {
      try {
        const userData = localStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Error loading user:', error);
      }
    };

    initializeUser();
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (hoverTimer) clearTimeout(hoverTimer);
    };
  }, [hoverTimer]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  // Categories data for dropdown
  const categories = [
   { name: 'Electronics', icon: 'fa-mobile-screen', link: '/category/electronics' },
{ name: 'Fashion', icon: 'fa-shirt', link: '/category/fashion' },
{ name: 'Home & Furniture', icon: 'fa-couch', link: '/category/home' },
{ name: 'Books', icon: 'fa-book', link: '/category/books' },
{ name: 'Sports', icon: 'fa-futbol', link: '/category/sports' },
{ name: 'Toys', icon: 'fa-puzzle-piece', link: '/category/toys' },
{ name: 'Beauty', icon: 'fa-spray-can-sparkles', link: '/category/beauty' },
{ name: 'Grocery', icon: 'fa-basket-shopping', link: '/category/grocery' },
  ];

  return (
    <nav className="bg-gradient-to-r from-[#1a2639] to-[#2a3b4f] text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Clickable to home */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition">
            <i className="fas fa-store text-2xl text-yellow-400"></i>
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="text-yellow-400">DRG</span>Commerce
            </h1>
          </Link>

          {/* ========== CATEGORIES DROPDOWN - FIXED VERSION ========== */}
          {/* 
            PROBLEM: Dropdown disappears when moving mouse from button to menu
            FIX: Added delay on leave + separate hover handlers for menu
          */}
          <div 
            className="relative hidden md:block"
            onMouseEnter={() => {
              // Clear any existing timer when mouse enters button
              if (hoverTimer) clearTimeout(hoverTimer);
              setIsCategoryOpen(true);
            }}
            onMouseLeave={() => {
              // Add small delay before closing to allow mouse to reach menu
              const timer = setTimeout(() => {
                setIsCategoryOpen(false);
              }, 200); // 200ms delay gives time to move to dropdown
              setHoverTimer(timer);
            }}
          >
            <button className="flex items-center space-x-1 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition">
              <i className="fas fa-bars"></i>
              <span className="text-sm font-medium">Categories</span>
              {/* Rotate chevron icon when open */}
              <i className={`fas fa-chevron-down text-xs ml-1 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`}></i>
            </button>

            {/* Dropdown Menu - appears when isCategoryOpen is true */}
            {isCategoryOpen && (
              <div 
                className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-xl py-2 z-50"
                onMouseEnter={() => {
                  // Clear timer when mouse enters dropdown
                  if (hoverTimer) clearTimeout(hoverTimer);
                  setIsCategoryOpen(true);
                }}
                onMouseLeave={() => {
                  // Close immediately when mouse leaves dropdown
                  setIsCategoryOpen(false);
                }}
              >
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    to={category.link}
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                    onClick={() => setIsCategoryOpen(false)} // Close dropdown after click
                  >
                    <i className={`fas ${category.icon} w-6 text-yellow-500`}></i>
                    <span className="ml-2">{category.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search for products, brands and more..."
                className="w-full px-5 py-2.5 pl-12 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <i className="fas fa-search absolute left-4 top-3.5 text-gray-400 group-hover:text-yellow-500 transition"></i>
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-6">
            {user ? (
              <>
                {/* Wishlist */}
                <Link to="/wishlist" className="hover:text-yellow-400 transition relative group">
                  <i className="fas fa-heart text-xl"></i>
                  <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
                </Link>

                {/* Cart - Shows real count from cart context */}
                <Link to="/cart" className="hover:text-yellow-400 transition relative group">
                  <div className="relative">
                    <i className="fas fa-shopping-cart text-xl"></i>
                    {cartCount > 0 && (
                      <span className="absolute -top-3 -right-3 bg-yellow-500 text-gray-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </div>
                </Link>

                {/* Sell button - Only visible to vendors */}
                {user?.isSeller && (
                  <Link 
                    to="/vendor/dashboard" 
                    className="hidden lg:flex items-center space-x-2 bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-400 transition font-medium text-sm shadow-md"
                  >
                    <i className="fas fa-store-alt"></i>
                    <span>Sell</span>
                  </Link>
                )}

                {/* User Menu Dropdown */}
                <div className="relative group">
                  <button className="flex items-center space-x-2 hover:text-yellow-400 transition">
                    <div className="relative">
                      <i className="fas fa-user-circle text-2xl"></i>
                      <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-400 rounded-full"></span>
                    </div>
                    <span className="hidden lg:inline text-sm font-medium">{user.name?.split(' ')[0] || 'User'}</span>
                  </button>
                  
                  {/* User dropdown menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                      <i className="fas fa-user mr-2"></i>Profile
                    </Link>
                    <Link to="/orders" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                      <i className="fas fa-shopping-bag mr-2"></i>Orders
                    </Link>
                    <Link to="/wishlist" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                      <i className="fas fa-heart mr-2"></i>Wishlist
                    </Link>
                    {user?.isSeller && (
                      <>
                        <div className="border-t my-2"></div>
                        <Link to="/vendor/dashboard" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                          <i className="fas fa-store mr-2"></i>Seller Dashboard
                        </Link>
                        <Link to="/vendor/products" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                          <i className="fas fa-box mr-2"></i>My Products
                        </Link>
                      </>
                    )}
                    <div className="border-t my-2"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      <i className="fas fa-sign-out-alt mr-2"></i>Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              // Non-logged in user view
              <>
                <Link to="/login" className="hover:text-yellow-400 transition">
                  <i className="fas fa-user-circle text-2xl"></i>
                </Link>
                <Link to="/cart" className="hover:text-yellow-400 transition relative">
                  <i className="fas fa-shopping-cart text-xl"></i>
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-2xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <i className={`fas fa-${isMenuOpen ? 'times' : 'bars'}`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu - visible when hamburger menu is clicked */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10 mt-2">
            <div className="flex flex-col space-y-3">
              <div className="px-2 py-1 font-medium text-gray-300">Categories</div>
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.link}
                  className="hover:text-yellow-400 transition px-2 py-1 ml-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <i className={`fas ${category.icon} mr-2 w-5`}></i>
                  {category.name}
                </Link>
              ))}
              <div className="border-t border-white/10 my-2"></div>
              <Link to="/orders" className="hover:text-yellow-400 transition px-2 py-1">Orders</Link>
              <Link to="/wishlist" className="hover:text-yellow-400 transition px-2 py-1">Wishlist</Link>
              <Link to="/cart" className="hover:text-yellow-400 transition px-2 py-1">Cart ({cartCount})</Link>
              {user?.isSeller && (
                <>
                  <Link to="/vendor/dashboard" className="hover:text-yellow-400 transition px-2 py-1">
                    Seller Dashboard
                  </Link>
                  <Link to="/vendor/products" className="hover:text-yellow-400 transition px-2 py-1">
                    My Products
                  </Link>
                </>
              )}
              <button
                onClick={handleLogout}
                className="text-left text-red-400 hover:text-red-300 transition px-2 py-1"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;