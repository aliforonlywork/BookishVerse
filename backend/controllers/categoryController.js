const asyncHandler = require('express-async-handler');
const Category = require('../models/Category');
const Book = require('../models/Book'); // NEW

const getCategories = asyncHandler(async (req, res) => res.json(await Category.find().sort('name')));

const ALLOWED_FIELDS = ['name', 'description', 'image'];
const pickAllowed = (body) => {
  const data = {};
  for (const field of ALLOWED_FIELDS) {
    if (body[field] !== undefined) data[field] = body[field];
  }
  return data;
};

const createCategory = asyncHandler(async (req, res) => res.status(201).json(await Category.create(pickAllowed(req.body))));

const updateCategory = asyncHandler(async (req, res) => {
  const cat = await Category.findByIdAndUpdate(req.params.id, pickAllowed(req.body), { new: true, runValidators: true });
  if (!cat) return res.status(404).json({ message: 'Category not found' });
  res.json(cat);
});

const deleteCategory = asyncHandler(async (req, res) => {
  const inUse = await Book.countDocuments({ category: req.params.id });
  if (inUse > 0) {
    return res.status(400).json({ message: `Cannot delete — used by ${inUse} book(s). Reassign them first.` });
  }
  const cat = await Category.findByIdAndDelete(req.params.id);
  if (!cat) return res.status(404).json({ message: 'Category not found' });
  res.json({ message: 'Category removed' });
});

module.exports = { getCategories, createCategory, updateCategory, deleteCategory };