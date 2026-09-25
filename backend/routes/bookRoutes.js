const express = require('express');
const router = express.Router();
const { param, body } = require('express-validator');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { getBooks, getBookById, createBook, updateBook, deleteBook } = require('../controllers/bookController');

router.get('/', getBooks);

router.get('/:id', param('id').isMongoId().withMessage('Invalid book id'), validate, getBookById);

router.post(
  '/',
  protect,
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('summary').trim().notEmpty().withMessage('Summary is required'),
    body('category').isMongoId().withMessage('Valid category is required'),
    body('author').isMongoId().withMessage('Valid author is required')
  ],
  validate,
  createBook
);

router.put(
  '/:id',
  protect,
  param('id').isMongoId().withMessage('Invalid book id'),
  validate,
  updateBook
);

router.delete(
  '/:id',
  protect,
  param('id').isMongoId().withMessage('Invalid book id'),
  validate,
  deleteBook
);

module.exports = router;