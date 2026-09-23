const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

const login = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (admin && (await admin.comparePassword(password))) {
    admin.lastLogin = new Date();
    await admin.save();
    return res.json({ _id: admin._id, name: admin.name, email: admin.email, token: generateToken(admin._id) });
  }
  res.status(401).json({ message: 'Invalid email or password' });
};

const logout = (req, res) => res.json({ message: 'Logged out' });

module.exports = { login, logout };
