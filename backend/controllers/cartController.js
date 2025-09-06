const User = require('../models/User');
const Item = require('../models/Item');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('cart.item', 'name price imageUrl category')
      .select('cart');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Calculate total price
    const cartItems = user.cart.map(cartItem => ({
      _id: cartItem._id,
      item: cartItem.item,
      quantity: cartItem.quantity,
      totalPrice: cartItem.item.price * cartItem.quantity
    }));

    const totalPrice = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

    res.json({
      success: true,
      data: {
        items: cartItems,
        totalPrice,
        itemCount: cartItems.length
      }
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ message: 'Server error while fetching cart' });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Private
const addToCart = async (req, res) => {
  try {
    const { itemId, quantity = 1 } = req.body;

    if (!itemId) {
      return res.status(400).json({ message: 'Item ID is required' });
    }

    // Check if item exists
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Check if item is in stock
    if (item.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    const user = await User.findById(req.user._id);
    
    // Check if item already exists in cart
    const existingCartItem = user.cart.find(
      cartItem => cartItem.item.toString() === itemId
    );

    if (existingCartItem) {
      // Update quantity
      existingCartItem.quantity += quantity;
    } else {
      // Add new item to cart
      user.cart.push({ item: itemId, quantity });
    }

    await user.save();

    res.json({
      success: true,
      message: 'Item added to cart successfully'
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ message: 'Server error while adding to cart' });
  }
};

// @desc    Remove item from cart
// @route   POST /api/cart/remove
// @access  Private
const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.body;

    if (!itemId) {
      return res.status(400).json({ message: 'Item ID is required' });
    }

    const user = await User.findById(req.user._id);
    
    // Find and remove item from cart
    const cartItemIndex = user.cart.findIndex(
      cartItem => cartItem.item.toString() === itemId
    );

    if (cartItemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    user.cart.splice(cartItemIndex, 1);
    await user.save();

    res.json({
      success: true,
      message: 'Item removed from cart successfully'
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ message: 'Server error while removing from cart' });
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/update
// @access  Private
const updateCartItem = async (req, res) => {
  try {
    const { itemId, quantity } = req.body;

    if (!itemId || quantity === undefined) {
      return res.status(400).json({ message: 'Item ID and quantity are required' });
    }

    if (quantity < 1) {
      return res.status(400).json({ message: 'Quantity must be at least 1' });
    }

    // Check if item exists and has enough stock
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (item.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    const user = await User.findById(req.user._id);
    
    // Find cart item
    const cartItem = user.cart.find(
      cartItem => cartItem.item.toString() === itemId
    );

    if (!cartItem) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Update quantity
    cartItem.quantity = quantity;
    await user.save();

    res.json({
      success: true,
      message: 'Cart item updated successfully'
    });
  } catch (error) {
    console.error('Update cart item error:', error);
    res.status(500).json({ message: 'Server error while updating cart item' });
  }
};

// @desc    Clear entire cart
// @route   DELETE /api/cart/clear
// @access  Private
const clearCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.cart = [];
    await user.save();

    res.json({
      success: true,
      message: 'Cart cleared successfully'
    });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ message: 'Server error while clearing cart' });
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart
};
