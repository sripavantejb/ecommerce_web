import React from 'react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import './Cart.css';

const Cart = () => {
  const { items, totalPrice, itemCount, loading, error, clearCart } = useCart();

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      await clearCart();
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading cart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="container">
        <div className="cart-header">
          <h1 className="page-title">Shopping Cart</h1>
          {itemCount > 0 && (
            <button onClick={handleClearCart} className="clear-cart-btn">
              Clear Cart
            </button>
          )}
        </div>

        {itemCount === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Add some items to get started!</p>
            <a href="/" className="continue-shopping-btn">
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {items.map((cartItem) => (
                <CartItem key={cartItem._id} cartItem={cartItem} />
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-card">
                <h3>Order Summary</h3>
                <div className="summary-row">
                  <span>Items ({itemCount}):</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <button className="checkout-btn">
                  Proceed to Checkout
                </button>
                <p className="checkout-note">
                  * This is a demo. Checkout functionality is not implemented.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
