import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { data } = await fetchProducts();
        setProducts(data.products);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border rounded-lg p-4 shadow-lg">
            <img 
              src={product.images[0] || 'https://via.placeholder.com/200'} 
              alt={product.name}
              className="w-full h-48 object-cover mb-4"
            />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>
            <p className="text-sm text-gray-500">Stock: {product.stock}</p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;