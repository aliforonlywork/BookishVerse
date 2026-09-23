const Book = require('../models/Book');

const getBooks = async (req, res) => {
  const { category, search, sort, featured, page = 1, limit = 20 } = req.query;
  const query = { status: 'published' };
  if (category) query.category = category;
  if (featured) query.featured = featured === 'true';
  if (search) {
    query.$or = [
      { title: new RegExp(search, 'i') },
      { summary: new RegExp(search, 'i') }
    ];
  }

  let sortOption = { createdAt: -1 };
  if (sort === 'popular') sortOption = { views: -1 };
  if (sort === 'az') sortOption = { title: 1 };
  if (sort === 'featured') sortOption = { featured: -1, views: -1 };

  const books = await Book.find(query)
    .populate('author', 'name')
    .populate('category', 'name slug')
    .sort(sortOption)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const total = await Book.countDocuments(query);
  res.json({ books, total, page: Number(page), pages: Math.ceil(total / limit) });
};

const getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id)
    .populate('author')
    .populate('category')
    .populate('relatedBooks', 'title slug coverImage');
  if (!book) return res.status(404).json({ message: 'Book not found' });
  book.views += 1;
  await book.save();
  res.json(book);
};

const createBook = async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).json(book);
};

const updateBook = async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
};

const deleteBook = async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json({ message: 'Book removed' });
};

module.exports = { getBooks, getBookById, createBook, updateBook, deleteBook };
