import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TestTailwind from './TestTailwind';

function App() {
  return (
    
    <BrowserRouter>
    
     <TestTailwind />;

      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-lg p-4">
          <div className="container mx-auto flex justify-between">
            <h1 className="text-xl font-bold">Marketplace</h1>
            <div className="space-x-4">
              <a href="/" className="hover:text-blue-600">Home</a>
              <a href="/login" className="hover:text-blue-600">Login</a>
              <a href="/register" className="hover:text-blue-600">Register</a>
            </div>
          </div>
        </nav>

        <Routes>
          
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;