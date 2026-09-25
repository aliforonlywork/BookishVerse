const asyncHandler = require('express-async-handler');
const Book = require('../models/Book');

// Escapes regex special characters so a search string can't be used to break/abuse the query
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getBooks = asyncHandler(async (req, res) => {
  const { category, search, sort, featured } = req.query;

  // Clamp page/limit — prevents junk or huge values from breaking the query
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 20));

  const query = { status: 'published' };
  if (category) query.category = category;
  if (featured) query.featured = featured === 'true';
  if (search) {
    const safeSearch = escapeRegex(search);
    query.$or = [
      { title: new RegExp(safeSearch, 'i') },
      { summary: new RegExp(safeSearch, 'i') }
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
    .limit(limit);

  const total = await Book.countDocuments(query);
  res.json({ books, total, page, pages: Math.ceil(total / limit) });
});

const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id)
    .populate('author')
    .populate('category')
    .populate('relatedBooks', 'title slug coverImage');
  if (!book) return res.status(404).json({ message: 'Book not found' });
  book.views += 1;
  await book.save();
  res.json(book);
});

// Whitelist of fields an admin can actually set. Adjust the names to match
// your real Book.js schema exactly — send me that file and I'll fine-tune this.
const ALLOWED_FIELDS = [
  'title', 'slug', 'summary', 'coverImage', 'author', 'category',
  'keyIdeas', 'lessons', 'chapterSummaries', 'relatedBooks',
  'status', 'featured', 'tags'
];

const pickAllowed = (body) => {
  const data = {};
  for (const field of ALLOWED_FIELDS) {
    if (body[field] !== undefined) data[field] = body[field];
  }
  return data;
};

const createBook = asyncHandler(async (req, res) => {
  const book = await Book.create(pickAllowed(req.body));
  res.status(201).json(book);
});

const updateBook = asyncHandler(async (req, res) => {
  const book = await Book.findByIdAndUpdate(
    req.params.id,
    pickAllowed(req.body),
    { new: true, runValidators: true }
  );
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
});

const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json({ message: 'Book removed' });
});

module.exports = { getBooks, getBookById, createBook, updateBook, deleteBook };