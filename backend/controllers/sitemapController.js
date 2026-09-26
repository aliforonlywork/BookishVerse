const asyncHandler = require('express-async-handler');
const Book = require('../models/Book');
const Article = require('../models/Article');

const getSitemap = asyncHandler(async (req, res) => {
  const siteUrl = process.env.SITE_URL || 'https://yourdomain.com';
  const books = await Book.find({ status: 'published' }).select('_id updatedAt');
  const articles = await Article.find({ status: 'published' }).select('_id updatedAt');

  const urls = [
    `<url><loc>${siteUrl}/</loc></url>`,
    `<url><loc>${siteUrl}/books</loc></url>`,
    `<url><loc>${siteUrl}/articles</loc></url>`,
    ...books.map((b) => `<url><loc>${siteUrl}/books/${b._id}</loc><lastmod>${b.updatedAt.toISOString()}</lastmod></url>`),
    ...articles.map((a) => `<url><loc>${siteUrl}/articles/${a._id}</loc><lastmod>${a.updatedAt.toISOString()}</lastmod></url>`)
  ];

  res.set('Content-Type', 'application/xml');
  res.send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}</urlset>`);
});

module.exports = { getSitemap };