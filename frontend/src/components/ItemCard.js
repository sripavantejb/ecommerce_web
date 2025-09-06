import React from 'react';
import './ItemCard.css';

const ItemCard = ({ item, onAddToCart, isAuthenticated }) => {
  const handleAddToCart = () => {
    onAddToCart(item._id);
  };

  return (
    <div className="item-card">
      <div className="item-image">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.name} />
        ) : (
          <div className="no-image">
            <span>📦</span>
          </div>
        )}
      </div>
      
      <div className="item-content">
        <h3 className="item-name">{item.name}</h3>
        <p className="item-description">{item.description}</p>
        <div className="item-category">{item.category}</div>
        <div className="item-price">${item.price}</div>
        <div className="item-stock">
          {item.stock > 0 ? (
            <span className="in-stock">In Stock ({item.stock})</span>
          ) : (
            <span className="out-of-stock">Out of Stock</span>
          )}
        </div>
        
        <button
          className={`add-to-cart-btn ${!isAuthenticated ? 'disabled' : ''}`}
          onClick={handleAddToCart}
          disabled={!isAuthenticated || item.stock === 0}
        >
          {!isAuthenticated
            ? 'Login to Add'
            : item.stock === 0
            ? 'Out of Stock'
            : 'Add to Cart'
          }
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
