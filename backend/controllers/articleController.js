const Article = require('../models/Article');

const getArticles = async (req, res) => {
  const { search } = req.query;
  const query = { status: 'published' };
  if (search) query.title = new RegExp(search, 'i');
  res.json(await Article.find(query).sort('-publishedAt'));
};

const getArticleById = async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (!article) return res.status(404).json({ message: 'Article not found' });
  article.views += 1;
  await article.save();
  res.json(article);
};

const createArticle = async (req, res) => {
  if (!req.body.publishedAt) req.body.publishedAt = new Date();
  res.status(201).json(await Article.create(req.body));
};

const updateArticle = async (req, res) => {
  const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!article) return res.status(404).json({ message: 'Article not found' });
  res.json(article);
};

const deleteArticle = async (req, res) => {
  const article = await Article.findByIdAndDelete(req.params.id);
  if (!article) return res.status(404).json({ message: 'Article not found' });
  res.json({ message: 'Article removed' });
};

module.exports = { getArticles, getArticleById, createArticle, updateArticle, deleteArticle };
