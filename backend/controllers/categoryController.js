const Category = require('../models/Category');

const getCategories = async (req, res) => res.json(await Category.find().sort('name'));

const createCategory = async (req, res) => res.status(201).json(await Category.create(req.body));

const updateCategory = async (req, res) => {
  const cat = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!cat) return res.status(404).json({ message: 'Category not found' });
  res.json(cat);
};

const deleteCategory = async (req, res) => {
  const cat = await Category.findByIdAndDelete(req.params.id);
  if (!cat) return res.status(404).json({ message: 'Category not found' });
  res.json({ message: 'Category removed' });
};

module.exports = { getCategories, createCategory, updateCategory, deleteCategory };
