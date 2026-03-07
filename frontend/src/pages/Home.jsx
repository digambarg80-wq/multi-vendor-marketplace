import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import Navbar from '../components/Navbar';
import CategoryGrid from '../components/CategoryGrid';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { data } = await fetchProducts();
        if (data && data.products) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error('Error loading products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-96">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
            <i className="fas fa-store absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-500 text-2xl"></i>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading amazing products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <CategoryGrid />
      
      <div className="container mx-auto px-4 py-6">
        <div className="relative rounded-2xl overflow-hidden shadow-xl">
          <img 
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Sale Banner"
            className="w-full h-64 md:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
            <div className="text-white ml-8 md:ml-16">
              <p className="text-sm md:text-base font-medium text-yellow-400">WEEKEND SALE</p>
              <h2 className="text-2xl md:text-4xl font-bold mt-2">Up to 70% Off</h2>
              <p className="text-sm md:text-base text-gray-200 mt-2">On electronics, fashion & more</p>
              <button className="mt-4 bg-yellow-500 text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition shadow-lg">
                Shop Now <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {products.length > 0 && (
        <div className="container mx-auto px-4 py-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-bolt text-red-500 text-xl"></i>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Deals of the Day</h2>
                  <p className="text-sm text-gray-500">Limited time offers</p>
                </div>
              </div>
              <button className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition text-sm font-medium">
                <span>View All</span>
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {products.slice(0, 5).map((product) => (
                <Link 
                  to={`/product/${product._id}`} 
                  key={product._id}
                  className="group bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="relative pt-[100%] bg-gray-100">
                    <img
                      src={product.images && product.images[0] ? product.images[0] : 'https://via.placeholder.com/200'}
                      alt={product.name || 'Product'}
                      className="absolute top-0 left-0 w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">-35%</span>
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-medium line-clamp-2 mb-2 group-hover:text-yellow-600 transition">
                      {product.name || 'Product Name'}
                    </h3>
                    <div className="flex items-baseline mb-2">
                      <span className="text-lg font-bold text-gray-900">₹{product.price || 0}</span>
                      <span className="ml-2 text-xs text-gray-400 line-through">₹{Math.round((product.price || 0) * 1.35)}</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center bg-green-600 text-white px-1.5 py-0.5 rounded text-xs">
                        <span>4.5</span>
                        <i className="fas fa-star text-xs ml-0.5"></i>
                      </div>
                      <span className="ml-2 text-xs text-gray-500">(1.2k)</span>
                    </div>
                    <button className="w-full bg-yellow-500 text-gray-900 py-2 rounded-lg text-sm font-medium hover:bg-yellow-400 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <i className="fas fa-shopping-cart mr-2 text-sm"></i>
                      Add to Cart
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <i className="fas fa-crown text-purple-500 text-xl"></i>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Featured Brands</h2>
              <p className="text-sm text-gray-500">Top brands you love</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[1,2,3,4,5,6].map((item) => (
              <div key={item} className="bg-gray-50 rounded-xl p-4 text-center hover:shadow-md transition cursor-pointer">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mb-2">
                  <i className="fas fa-tag text-gray-600 text-2xl"></i>
                </div>
                <p className="text-sm font-medium">Brand {item}</p>
                <p className="text-xs text-gray-500">Starting ₹299</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
              <i className="fas fa-heart text-pink-500 text-xl"></i>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Just For You</h2>
              <p className="text-sm text-gray-500">Recommended based on your browsing</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {products.map((product) => (
              <Link
                to={`/product/${product._id}`}
                key={product._id}
                className="group bg-white rounded-xl border border-gray-100 p-3 hover:shadow-lg transition cursor-pointer"
              >
                <div className="aspect-square bg-gray-50 rounded-lg mb-3 flex items-center justify-center">
                  <img
                    src={product.images && product.images[0] ? product.images[0] : 'https://via.placeholder.com/150'}
                    alt={product.name || 'Product'}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <h3 className="text-sm font-medium line-clamp-2 mb-1">{product.name || 'Product Name'}</h3>
                <p className="text-lg font-bold text-gray-900">₹{product.price || 0}</p>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <i className="fas fa-truck mr-1"></i>
                  <span>Free delivery</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;