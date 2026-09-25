const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days — keep in sync with JWT_EXPIRES_IN
};

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });

  if (admin && (await admin.comparePassword(password))) {
    admin.lastLogin = new Date();
    await admin.save();

    res.cookie('token', generateToken(admin._id), cookieOptions);
    return res.json({ _id: admin._id, name: admin.name, email: admin.email });
  }

  res.status(401).json({ message: 'Invalid email or password' });
});

const logout = (req, res) => {
  res.clearCookie('token', { ...cookieOptions, maxAge: 0 });
  res.json({ message: 'Logged out' });
};

// New — lets the frontend check "am I still logged in?" on page load,
// since JS can no longer read the token itself to check.
const getMe = asyncHandler(async (req, res) => {
  res.json({ _id: req.admin._id, name: req.admin.name, email: req.admin.email });
});

module.exports = { login, logout, getMe };