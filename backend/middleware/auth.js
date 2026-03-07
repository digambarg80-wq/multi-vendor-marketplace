const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  try {
    let token;

    console.log('🔍 ===== DEBUG AUTH =====');
    console.log('Headers received:', req.headers);
    console.log('Authorization header:', req.headers.authorization);

    // Check Authorization header
    if (req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      console.log('✅ Token extracted:', token.substring(0, 20) + '...');
    } else {
      console.log('❌ No Bearer token in headers');
    }

    if (!token) {
      console.log('❌ No token found');
      return res.status(401).json({ 
        message: 'Not authorized, no token' 
      });
    }

    // Verify token
    console.log('🔑 Verifying token...');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Token decoded:', decoded);

    // Get user from token
    console.log('👤 Finding user with ID:', decoded.id);
    req.user = await User.findById(decoded.id);
    console.log('✅ User found:', req.user ? req.user.email : 'No user');
    console.log('👤 User role:', req.user ? req.user.role : 'N/A');

    if (!req.user) {
      console.log('❌ User not found in database');
      return res.status(401).json({ 
        message: 'User not found' 
      });
    }

    console.log('✅ Authentication successful');
    console.log('🔍 ===== END DEBUG =====\n');
    
    next();
  } catch (error) {
    console.error('❌ Auth error:', error.message);
    console.error('❌ Error stack:', error.stack);
    res.status(401).json({ 
      message: 'Not authorized', 
      error: error.message 
    });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    console.log('🔑 Checking role authorization...');
    console.log('User role:', req.user.role);
    console.log('Required roles:', roles);
    
    if (!roles.includes(req.user.role)) {
      console.log('❌ Role not authorized');
      return res.status(403).json({ 
        message: 'Not authorized to access this route' 
      });
    }
    
    console.log('✅ Role authorized');
    next();
  };
};