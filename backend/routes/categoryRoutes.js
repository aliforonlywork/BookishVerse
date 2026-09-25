const express = require('express');
const router = express.Router();
const { param, body } = require('express-validator');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { getCategories, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');

router.get('/', getCategories);
router.post('/', protect, body('name').trim().notEmpty().withMessage('Name is required'), validate, createCategory);
router.put('/:id', protect, param('id').isMongoId().withMessage('Invalid category id'), validate, updateCategory);
router.delete('/:id', protect, param('id').isMongoId().withMessage('Invalid category id'), validate, deleteCategory);

module.exports = router;