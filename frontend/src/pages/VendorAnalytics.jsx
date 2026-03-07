import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { fetchVendorAnalytics } from '../services/api';

const VendorAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const { data } = await fetchVendorAnalytics();
      setAnalytics(data);
    } catch (err) {
      console.error('Error loading analytics:', err);
      setError('Failed to load analytics');
    } finally {
      setLoading(false);
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

  // Mock data if API not ready
  const mockData = {
    totalSales: 45230,
    totalOrders: 145,
    totalProducts: 23,
    averageOrderValue: 312,
    monthlyData: [
      { month: 'Jan', sales: 5200 },
      { month: 'Feb', sales: 6800 },
      { month: 'Mar', sales: 8900 },
      { month: 'Apr', sales: 7500 },
      { month: 'May', sales: 9100 },
      { month: 'Jun', sales: 7730 }
    ],
    topProducts: [
      { name: 'Gaming Laptop', sales: 45, revenue: 58455 },
      { name: 'Wireless Mouse', sales: 120, revenue: 5880 },
      { name: 'Gaming Chair', sales: 32, revenue: 9568 }
    ]
  };

  const data = analytics || mockData;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Track your store performance</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-gray-600 text-sm">Total Sales</p>
            <p className="text-3xl font-bold">₹{data.totalSales?.toLocaleString()}</p>
            <p className="text-green-600 text-sm mt-2">↑ 12% from last month</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-gray-600 text-sm">Total Orders</p>
            <p className="text-3xl font-bold">{data.totalOrders}</p>
            <p className="text-green-600 text-sm mt-2">↑ 8% from last month</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-gray-600 text-sm">Products</p>
            <p className="text-3xl font-bold">{data.totalProducts}</p>
            <p className="text-gray-600 text-sm mt-2">Active in store</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-gray-600 text-sm">Avg. Order Value</p>
            <p className="text-3xl font-bold">₹{data.averageOrderValue}</p>
            <p className="text-green-600 text-sm mt-2">↑ 5% from last month</p>
          </div>
        </div>

        {/* Monthly Sales Chart */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Monthly Sales</h2>
          <div className="h-64 flex items-end justify-around">
            {data.monthlyData?.map((item) => (
              <div key={item.month} className="flex flex-col items-center w-16">
                <div 
                  className="w-12 bg-yellow-500 rounded-t-lg"
                  style={{ height: `${(item.sales / 10000) * 200}px` }}
                ></div>
                <p className="text-sm mt-2">{item.month}</p>
                <p className="text-xs text-gray-600">₹{item.sales}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Top Selling Products</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Product</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Units Sold</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {data.topProducts?.map((product, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 font-medium">{product.name}</td>
                    <td className="px-6 py-4">{product.sales}</td>
                    <td className="px-6 py-4">₹{product.revenue.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-6">
          <Link to="/vendor/dashboard" className="text-gray-600 hover:underline">
            <i className="fas fa-arrow-left mr-1"></i>
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VendorAnalytics;