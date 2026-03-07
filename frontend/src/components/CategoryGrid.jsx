import React from 'react';

const categories = [
  { name: 'Electronics', icon: 'fa-mobile-screen', color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50', count: '2.5k+ items' },
  { name: 'Fashion', icon: 'fa-shirt', color: 'from-pink-500 to-pink-600', bg: 'bg-pink-50', count: '5k+ items' },
  { name: 'Home', icon: 'fa-couch', color: 'from-green-500 to-green-600', bg: 'bg-green-50', count: '1.8k+ items' },
  { name: 'Grocery', icon: 'fa-basket-shopping', color: 'from-yellow-500 to-yellow-600', bg: 'bg-yellow-50', count: '3k+ items' },
  { name: 'Books', icon: 'fa-book', color: 'from-purple-500 to-purple-600', bg: 'bg-purple-50', count: '1.2k+ items' },
  { name: 'Sports', icon: 'fa-futbol', color: 'from-orange-500 to-orange-600', bg: 'bg-orange-50', count: '800+ items' },
  { name: 'Toys', icon: 'fa-puzzle-piece', color: 'from-red-500 to-red-600', bg: 'bg-red-50', count: '900+ items' },
  { name: 'Beauty', icon: 'fa-spray-can-sparkles', color: 'from-indigo-500 to-indigo-600', bg: 'bg-indigo-50', count: '1.5k+ items' },
];

const CategoryGrid = () => {
  return (
    <div className="bg-white shadow-sm py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <i className="fas fa-th-large text-yellow-500 mr-2"></i>
            Shop by Category
          </h2>
          <a href="#" className="text-sm text-yellow-600 hover:text-yellow-700 flex items-center">
            View All <i className="fas fa-arrow-right ml-1 text-xs"></i>
          </a>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
          {categories.map((cat) => (
            <div key={cat.name} className="group cursor-pointer">
              <div className={`${cat.bg} rounded-2xl p-4 transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1`}>
                <div className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white text-2xl shadow-lg mb-3 group-hover:scale-110 transition-transform`}>
                  <i className={`fas ${cat.icon}`}></i>
                </div>
                <h3 className="text-sm font-semibold text-center text-gray-800">{cat.name}</h3>
                <p className="text-xs text-center text-gray-500 mt-1">{cat.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryGrid;