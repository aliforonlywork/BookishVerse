const Author = require('../models/Author');

const getAuthors = async (req, res) => res.json(await Author.find().sort('name'));

const getAuthorById = async (req, res) => {
  const author = await Author.findById(req.params.id);
  if (!author) return res.status(404).json({ message: 'Author not found' });
  res.json(author);
};

const createAuthor = async (req, res) => res.status(201).json(await Author.create(req.body));

const updateAuthor = async (req, res) => {
  const author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!author) return res.status(404).json({ message: 'Author not found' });
  res.json(author);
};

const deleteAuthor = async (req, res) => {
  const author = await Author.findByIdAndDelete(req.params.id);
  if (!author) return res.status(404).json({ message: 'Author not found' });
  res.json({ message: 'Author removed' });
};

module.exports = { getAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor };
