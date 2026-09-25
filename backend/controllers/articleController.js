const asyncHandler = require('express-async-handler');
const Article = require('../models/Article');

const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getArticles = asyncHandler(async (req, res) => {
  const { search } = req.query;
  const query = { status: 'published' };
  if (search) query.title = new RegExp(escapeRegex(search), 'i');
  res.json(
    await Article.find(query)
      .populate('category', 'name slug')
      .populate('author', 'name')
      .sort('-publishedAt')
  );
});

const getArticleById = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id)
    .populate('category', 'name slug')
    .populate('author', 'name');
  if (!article) return res.status(404).json({ message: 'Article not found' });
  article.views += 1;
  await article.save();
  res.json(article);
});

// 'slug' and 'views' are deliberately left out — both are server-controlled only
const ALLOWED_FIELDS = ['title', 'featuredImage', 'content', 'category', 'tags', 'author', 'status', 'publishedAt'];
const pickAllowed = (body) => {
  const data = {};
  for (const field of ALLOWED_FIELDS) {
    if (body[field] !== undefined) data[field] = body[field];
  }
  return data;
};

const createArticle = asyncHandler(async (req, res) => {
  const data = pickAllowed(req.body);
  if (!data.publishedAt) data.publishedAt = new Date();
  res.status(201).json(await Article.create(data));
});

const updateArticle = asyncHandler(async (req, res) => {
  const article = await Article.findByIdAndUpdate(req.params.id, pickAllowed(req.body), { new: true, runValidators: true });
  if (!article) return res.status(404).json({ message: 'Article not found' });
  res.json(article);
});

const deleteArticle = asyncHandler(async (req, res) => {
  const article = await Article.findByIdAndDelete(req.params.id);
  if (!article) return res.status(404).json({ message: 'Article not found' });
  res.json({ message: 'Article removed' });
});

module.exports = { getArticles, getArticleById, createArticle, updateArticle, deleteArticle };