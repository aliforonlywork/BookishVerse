const asyncHandler = require('express-async-handler');
const Author = require('../models/Author');

const getAuthors = asyncHandler(async (req, res) => res.json(await Author.find().sort('name')));

const getAuthorById = asyncHandler(async (req, res) => {
  const author = await Author.findById(req.params.id);
  if (!author) return res.status(404).json({ message: 'Author not found' });
  res.json(author);
});

const ALLOWED_FIELDS = ['name', 'biography', 'image', 'website'];
const pickAllowed = (body) => {
  const data = {};
  for (const field of ALLOWED_FIELDS) {
    if (body[field] !== undefined) data[field] = body[field];
  }
  return data;
};

const createAuthor = asyncHandler(async (req, res) => res.status(201).json(await Author.create(pickAllowed(req.body))));

const updateAuthor = asyncHandler(async (req, res) => {
  const author = await Author.findByIdAndUpdate(req.params.id, pickAllowed(req.body), { new: true, runValidators: true });
  if (!author) return res.status(404).json({ message: 'Author not found' });
  res.json(author);
});

const deleteAuthor = asyncHandler(async (req, res) => {
  const author = await Author.findByIdAndDelete(req.params.id);
  if (!author) return res.status(404).json({ message: 'Author not found' });
  res.json({ message: 'Author removed' });
});

module.exports = { getAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor };