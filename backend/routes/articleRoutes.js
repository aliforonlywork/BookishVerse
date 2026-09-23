const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getArticles, getArticleById, createArticle, updateArticle, deleteArticle } = require('../controllers/articleController');

router.get('/', getArticles);
router.get('/:id', getArticleById);
router.post('/', protect, createArticle);
router.put('/:id', protect, updateArticle);
router.delete('/:id', protect, deleteArticle);

module.exports = router;
