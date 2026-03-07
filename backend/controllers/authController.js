const User = require('../models/User');
const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// @desc    Register user
// @route   POST /api/auth/register
exports.register = async (req, res) => {
  console.log('📝 Registration attempt at:', new Date().toLocaleTimeString());
  console.log('📦 Received data:', req.body);
  
  try {
    const { name, email, password, role } = req.body;

    // Validate input
    if (!name || !email || !password) {
      console.log('❌ Missing fields');
      return res.status(400).json({ 
        message: 'Please provide all required fields' 
      });
    }

    // Check if user exists
    console.log('🔍 Checking if user exists...');
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('❌ User already exists');
      return res.status(400).json({ 
        message: 'User already exists' 
      });
    }

    // Create user
    console.log('👤 Creating new user...');
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'customer'
    });
    console.log('✅ User created with ID:', user._id);

    // If role is vendor, create vendor profile
    if (role === 'vendor') {
      console.log('🏪 Creating vendor profile...');
      await Vendor.create({
        user: user._id,
        storeName: `${name}'s Store`
      });
      console.log('✅ Vendor profile created');
    }

    // Generate token
    const token = generateToken(user._id);

    console.log('✅ Registration successful');
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
    
  } catch (error) {
    console.error('❌ Registration error:', error.message);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
exports.login = async (req, res) => {
  console.log('🔑 Login attempt at:', new Date().toLocaleTimeString());
  
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Please provide email and password' 
      });
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ 
        message: 'Invalid credentials' 
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ 
        message: 'Invalid credentials' 
      });
    }

    // Generate token
    const token = generateToken(user._id);

    console.log('✅ Login successful for:', email);
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
    
  } catch (error) {
    console.error('❌ Login error:', error.message);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};