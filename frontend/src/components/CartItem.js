import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import './CartItem.css';

const CartItem = ({ cartItem }) => {
  const { removeFromCart, updateCartItem } = useCart();
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const [loading, setLoading] = useState(false);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;
    
    setLoading(true);
    setQuantity(newQuantity);
    
    const result = await updateCartItem(cartItem.item._id, newQuantity);
    if (!result.success) {
      setQuantity(cartItem.quantity); // Revert on error
      alert(result.message || 'Failed to update quantity');
    }
    
    setLoading(false);
  };

  const handleRemove = async () => {
    if (window.confirm('Are you sure you want to remove this item from your cart?')) {
      setLoading(true);
      const result = await removeFromCart(cartItem.item._id);
      if (!result.success) {
        alert(result.message || 'Failed to remove item');
      }
      setLoading(false);
    }
  };

  const handleIncrement = () => {
    handleQuantityChange(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      handleQuantityChange(quantity - 1);
    }
  };

  return (
    <div className={`cart-item ${loading ? 'loading' : ''}`}>
      <div className="item-image">
        {cartItem.item.imageUrl ? (
          <img src={cartItem.item.imageUrl} alt={cartItem.item.name} />
        ) : (
          <div className="no-image">
            <span>📦</span>
          </div>
        )}
      </div>

      <div className="item-details">
        <h3 className="item-name">{cartItem.item.name}</h3>
        <p className="item-category">{cartItem.item.category}</p>
        <p className="item-price">${cartItem.item.price}</p>
      </div>

      <div className="quantity-controls">
        <button
          onClick={handleDecrement}
          disabled={loading || quantity <= 1}
          className="quantity-btn"
        >
          -
        </button>
        <span className="quantity">{quantity}</span>
        <button
          onClick={handleIncrement}
          disabled={loading}
          className="quantity-btn"
        >
          +
        </button>
      </div>

      <div className="item-total">
        <span className="total-price">${cartItem.totalPrice.toFixed(2)}</span>
      </div>

      <button
        onClick={handleRemove}
        disabled={loading}
        className="remove-btn"
        title="Remove item"
      >
        🗑️
      </button>
    </div>
  );
};

export default CartItem;
