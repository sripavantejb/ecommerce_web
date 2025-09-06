const express = require('express');
const { body } = require('express-validator');
const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/itemController');

const router = express.Router();

// Validation rules for item creation/update
const itemValidation = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Name must be between 1 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Description must be between 1 and 500 characters'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('category')
    .isIn(['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Toys', 'Other'])
    .withMessage('Invalid category'),
  body('stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Stock must be a non-negative integer'),
  body('imageUrl')
    .optional()
    .isURL()
    .withMessage('Image URL must be a valid URL')
];

// @route   GET /api/items
// @desc    Get all items with optional filtering
// @access  Public
router.get('/', getItems);

// @route   GET /api/items/:id
// @desc    Get single item
// @access  Public
router.get('/:id', getItem);

// @route   POST /api/items
// @desc    Create new item
// @access  Public (for demo purposes)
router.post('/', itemValidation, createItem);

// @route   PUT /api/items/:id
// @desc    Update item
// @access  Public (for demo purposes)
router.put('/:id', itemValidation, updateItem);

// @route   DELETE /api/items/:id
// @desc    Delete item
// @access  Public (for demo purposes)
router.delete('/:id', deleteItem);

module.exports = router;
