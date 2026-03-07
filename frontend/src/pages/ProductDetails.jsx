import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const { data } = await fetchProductById(id);
        setProduct(data.product);
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="text-center py-20">
          <i className="fas fa-exclamation-circle text-4xl text-red-500 mb-4"></i>
          <h2 className="text-2xl font-bold">Product Not Found</h2>
          <Link to="/" className="text-yellow-600 mt-4 inline-block">Go back home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-yellow-600">Home</Link>
          <i className="fas fa-chevron-right mx-2 text-xs"></i>
          <Link to={`/category/${product.category}`} className="hover:text-yellow-600">{product.category}</Link>
          <i className="fas fa-chevron-right mx-2 text-xs"></i>
          <span className="text-gray-800 font-medium">{product.name}</span>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="bg-gray-100 rounded-xl p-8 mb-4 flex items-center justify-center h-96">
                <img
                  src={product.images && product.images[selectedImage] ? product.images[selectedImage] : 'https://via.placeholder.com/400'}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`border-2 rounded-lg p-1 ${
                        selectedImage === index ? 'border-yellow-500' : 'border-gray-200'
                      }`}
                    >
                      <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-20 object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center bg-green-600 text-white px-2 py-1 rounded text-sm">
                  <span>4.5</span>
                  <i className="fas fa-star ml-1 text-xs"></i>
                </div>
                <span className="mx-2 text-gray-400">|</span>
                <span className="text-gray-500">1,234 ratings</span>
                <span className="mx-2 text-gray-400">|</span>
                <span className="text-gray-500">567 reviews</span>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-1">Special price</p>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                  <span className="ml-2 text-lg text-gray-400 line-through">₹{Math.round(product.price * 1.35)}</span>
                  <span className="ml-2 text-green-600 font-medium">35% off</span>
                </div>
                <p className="text-sm text-green-600 mt-1">inclusive of all taxes</p>
              </div>

              <div className="mb-6 bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center">
                  <i className="fas fa-tag text-blue-500 mr-2"></i>
                  Available offers
                </h3>
                <ul className="space-y-1 text-sm">
                  <li><span className="font-medium">Bank Offer:</span> 10% off on HDFC Bank Cards</li>
                  <li><span className="font-medium">Special Price:</span> Get extra ₹50 off</li>
                  <li><span className="font-medium">Partner Offer:</span> Sign up for ShopHub Pay and get ₹100 cashback</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Quantity:</h3>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-8 h-8 border rounded-lg hover:bg-gray-100"
                  >
                    <i className="fas fa-minus text-xs"></i>
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                    className="w-8 h-8 border rounded-lg hover:bg-gray-100"
                  >
                    <i className="fas fa-plus text-xs"></i>
                  </button>
                  <span className="ml-4 text-sm text-gray-500">{product.stock} items available</span>
                </div>
              </div>

              <div className="flex space-x-4 mb-6">
                <button className="flex-1 bg-yellow-500 text-gray-900 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition flex items-center justify-center">
                  <i className="fas fa-shopping-cart mr-2"></i>
                  Add to Cart
                </button>
                <button className="flex-1 bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition flex items-center justify-center">
                  <i className="fas fa-bolt mr-2"></i>
                  Buy Now
                </button>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <i className="fas fa-truck mr-2"></i>
                  <span>Free delivery by Tomorrow, 8 PM</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <i className="fas fa-shield-alt mr-2"></i>
                  <span>7 days replacement policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 mt-6">
          <h2 className="text-xl font-bold mb-4">Product Description</h2>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;