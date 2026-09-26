const asyncHandler = require('express-async-handler');
const Book = require('../models/Book');
const Article = require('../models/Article');

const getAnalytics = asyncHandler(async (req, res) => {
  const [bookStats] = await Book.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        views: { $sum: '$views' },
        published: { $sum: { $cond: [{ $eq: ['$status', 'published'] }, 1, 0] } },
        draft: { $sum: { $cond: [{ $eq: ['$status', 'draft'] }, 1, 0] } }
      }
    }
  ]);

  const [articleStats] = await Article.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        views: { $sum: '$views' },
        published: { $sum: { $cond: [{ $eq: ['$status', 'published'] }, 1, 0] } },
        draft: { $sum: { $cond: [{ $eq: ['$status', 'draft'] }, 1, 0] } }
      }
    }
  ]);

  const topBooks = await Book.find().sort('-views').limit(5).select('title views');
  const topArticles = await Article.find().sort('-views').limit(5).select('title views');

  res.json({
    books: bookStats || { total: 0, views: 0, published: 0, draft: 0 },
    articles: articleStats || { total: 0, views: 0, published: 0, draft: 0 },
    totalViews: (bookStats?.views || 0) + (articleStats?.views || 0),
    topBooks,
    topArticles
  });
});

module.exports = { getAnalytics };