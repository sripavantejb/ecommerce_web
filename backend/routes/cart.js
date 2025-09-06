const express = require('express');
const { body } = require('express-validator');
const { getCart, addToCart, removeFromCart, updateCartItem, clearCart } = require('../controllers/cartController');
const auth = require('../middleware/auth');

const router = express.Router();

// All cart routes require authentication
router.use(auth);

// Validation rules
const addToCartValidation = [
  body('itemId')
    .notEmpty()
    .withMessage('Item ID is required'),
  body('quantity')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Quantity must be a positive integer')
];

const removeFromCartValidation = [
  body('itemId')
    .notEmpty()
    .withMessage('Item ID is required')
];

const updateCartItemValidation = [
  body('itemId')
    .notEmpty()
    .withMessage('Item ID is required'),
  body('quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be a positive integer')
];

// @route   GET /api/cart
// @desc    Get user cart
// @access  Private
router.get('/', getCart);

// @route   POST /api/cart/add
// @desc    Add item to cart
// @access  Private
router.post('/add', addToCartValidation, addToCart);

// @route   POST /api/cart/remove
// @desc    Remove item from cart
// @access  Private
router.post('/remove', removeFromCartValidation, removeFromCart);

// @route   PUT /api/cart/update
// @desc    Update cart item quantity
// @access  Private
router.put('/update', updateCartItemValidation, updateCartItem);

// @route   DELETE /api/cart/clear
// @desc    Clear entire cart
// @access  Private
router.delete('/clear', clearCart);

module.exports = router;
