// @desc    Register as seller
// @route   POST /api/vendors/register
exports.registerSeller = async (req, res) => {
  try {
    const { storeName, description, address } = req.body;
    
    // Check if already a vendor
    const existingVendor = await Vendor.findOne({ user: req.user.id });
    if (existingVendor) {
      return res.status(400).json({ message: 'Already a seller' });
    }

    // Create vendor profile
    const vendor = await Vendor.create({
      user: req.user.id,
      storeName,
      description,
      address,
      status: 'pending'
    });

    // Update user role in database (optional - you can add isSeller flag)
    await User.findByIdAndUpdate(req.user.id, { $set: { isSeller: true } });

    res.json({
      success: true,
      vendor
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};