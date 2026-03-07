import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchFilteredProducts } from '../services/api';
import Navbar from '../components/Navbar';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Filter states
  const [filters, setFilters] = useState({
    sortBy: 'createdAt',
    order: 'desc',
    minPrice: '',
    maxPrice: '',
    page: 1,
    limit: 12
  });

  // Memoize the load function to prevent unnecessary re-renders
  const loadCategoryProducts = useCallback(async () => {
    try {
      setLoading(true);
      
      // Build filter object
      const filterParams = {
        category: categoryName,
        sortBy: filters.sortBy,
        order: filters.order,
        page: filters.page,
        limit: filters.limit
      };
      
      // Add price filters if they exist
      if (filters.minPrice) filterParams.minPrice = filters.minPrice;
      if (filters.maxPrice) filterParams.maxPrice = filters.maxPrice;
      
      const { data } = await fetchFilteredProducts(filterParams);
      
      setProducts(data.products);
      setTotalProducts(data.total);
      setTotalPages(data.pages);
      setCurrentPage(data.page);
    } catch (error) {
      console.error('Error loading category products:', error);
    } finally {
      setLoading(false);
    }
  }, [categoryName, filters.sortBy, filters.order, filters.minPrice, filters.maxPrice, filters.page, filters.limit]);

  useEffect(() => {
    loadCategoryProducts();
  }, [loadCategoryProducts]); // Now depends on the memoized function

  const handleSortChange = (e) => {
    const [sortBy, order] = e.target.value.split('-');
    setFilters({ ...filters, sortBy, order, page: 1 });
  };

  const handlePriceFilter = () => {
    setFilters({ ...filters, page: 1 });
  };

  const handlePageChange = (newPage) => {
    setFilters({ ...filters, page: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setFilters({
      sortBy: 'createdAt',
      order: 'desc',
      minPrice: '',
      maxPrice: '',
      page: 1,
      limit: 12
    });
  };

  const categoryDisplay = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

  if (loading && products.length === 0) {
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
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{categoryDisplay}</h1>
          <p className="text-gray-600 mt-1">{totalProducts} products found</p>
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Sort by:</span>
              <select
                value={`${filters.sortBy}-${filters.order}`}
                onChange={handleSortChange}
                className="border rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="createdAt-desc">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="flex items-center space-x-2 ml-auto">
              <input
                type="number"
                placeholder="Min Price"
                value={filters.minPrice}
                onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                className="w-24 px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max Price"
                value={filters.maxPrice}
                onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                className="w-24 px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button
                onClick={handlePriceFilter}
                className="bg-yellow-500 text-gray-900 px-4 py-1.5 rounded-lg hover:bg-yellow-400 transition"
              >
                Apply
              </button>
              {(filters.minPrice || filters.maxPrice) && (
                <button
                  onClick={clearFilters}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <i className="fas fa-box-open text-5xl text-gray-400 mb-4"></i>
            <h2 className="text-2xl font-medium text-gray-700 mb-2">No products found</h2>
            <p className="text-gray-500 mb-6">Try adjusting your filters</p>
            <button
              onClick={clearFilters}
              className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {products.map((product) => (
                <Link
                  key={product._id}
                  to={`/product/${product._id}`}
                  className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="aspect-square bg-gray-100 p-4">
                    <img
                      src={product.images?.[0] || 'https://via.placeholder.com/200'}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium line-clamp-2 mb-1">{product.name}</h3>
                    <p className="text-lg font-bold text-gray-900">₹{product.price}</p>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center bg-green-600 text-white px-1.5 py-0.5 rounded text-xs">
                        <span>4.5</span>
                        <i className="fas fa-star text-xs ml-0.5"></i>
                      </div>
                      <span className="ml-2 text-xs text-gray-500">(1.2k)</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-4 py-2 border rounded-lg ${
                      currentPage === i + 1
                        ? 'bg-yellow-500 text-gray-900'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;