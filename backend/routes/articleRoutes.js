const express = require('express');
const router = express.Router();
const { param, body } = require('express-validator');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { getArticles, getArticleById, createArticle, updateArticle, deleteArticle } = require('../controllers/articleController');

router.get('/', getArticles);
router.get('/:id', param('id').isMongoId().withMessage('Invalid article id'), validate, getArticleById);

router.post(
  '/',
  protect,
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('content').trim().notEmpty().withMessage('Content is required'),
    body('category').isMongoId().withMessage('Valid category is required'),
    body('author').isMongoId().withMessage('Valid author is required')
  ],
  validate,
  createArticle
);

router.put('/:id', protect, param('id').isMongoId().withMessage('Invalid article id'), validate, updateArticle);
router.delete('/:id', protect, param('id').isMongoId().withMessage('Invalid article id'), validate, deleteArticle);

module.exports = router;