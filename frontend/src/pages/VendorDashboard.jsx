import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const VendorDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Vendor Dashboard</h1>
        <p className="text-gray-600 mb-4">Welcome to your seller dashboard!</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Products</h2>
            <p className="text-3xl font-bold">0</p>
            <Link to="/vendor/products" className="text-yellow-600 mt-2 inline-block">
              Manage Products →
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Orders</h2>
            <p className="text-3xl font-bold">0</p>
            <Link to="/vendor/orders" className="text-yellow-600 mt-2 inline-block">
              View Orders →
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Sales</h2>
            <p className="text-3xl font-bold">₹0</p>
            <Link to="/vendor/analytics" className="text-yellow-600 mt-2 inline-block">
              View Analytics →
            </Link>
          </div>
        </div>
        
        <div className="mt-8">
          <Link to="/profile" className="text-gray-600 hover:underline">
            ← Back to Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;















// import React from 'react';
// import Navbar from '../components/Navbar';
// import { Link } from 'react-router-dom';

// const VendorDashboard = () => {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold mb-6">Vendor Dashboard</h1>
//         <p className="text-gray-600 mb-4">Welcome to your seller dashboard!</p>
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="bg-white p-6 rounded-lg shadow-sm">
//             <h2 className="text-xl font-semibold mb-2">Products</h2>
//             <p className="text-3xl font-bold">0</p>
//             <Link to="/vendor/products" className="text-yellow-600 mt-2 inline-block">
//               Manage Products →
//             </Link>
//           </div>
          
//           <div className="bg-white p-6 rounded-lg shadow-sm">
//             <h2 className="text-xl font-semibold mb-2">Orders</h2>
//             <p className="text-3xl font-bold">0</p>
//             <Link to="/vendor/orders" className="text-yellow-600 mt-2 inline-block">
//               View Orders →
//             </Link>
//           </div>
          
//           <div className="bg-white p-6 rounded-lg shadow-sm">
//             <h2 className="text-xl font-semibold mb-2">Sales</h2>
//             <p className="text-3xl font-bold">₹0</p>
//             <Link to="/vendor/analytics" className="text-yellow-600 mt-2 inline-block">
//               View Analytics →
//             </Link>
//           </div>
//         </div>
        
//         <div className="mt-8">
//           <Link to="/profile" className="text-gray-600 hover:underline">
//             ← Back to Profile
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VendorDashboard;