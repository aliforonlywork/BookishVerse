const express = require('express');
const router = express.Router();
const { param, body } = require('express-validator');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { getAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor } = require('../controllers/authorController');

router.get('/', getAuthors);
router.get('/:id', param('id').isMongoId().withMessage('Invalid author id'), validate, getAuthorById);
router.post('/', protect, body('name').trim().notEmpty().withMessage('Name is required'), validate, createAuthor);
router.put('/:id', protect, param('id').isMongoId().withMessage('Invalid author id'), validate, updateAuthor);
router.delete('/:id', protect, param('id').isMongoId().withMessage('Invalid author id'), validate, deleteAuthor);

module.exports = router;