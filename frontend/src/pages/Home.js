import React, { useState, useEffect } from 'react';
import { itemsAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ItemCard from '../components/ItemCard';
import FilterBar from '../components/FilterBar';
import './Home.css';

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: '',
    maxPrice: '',
    search: ''
  });

  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const categories = [
    'all',
    'Electronics',
    'Clothing',
    'Books',
    'Home & Garden',
    'Sports',
    'Toys',
    'Other'
  ];

  useEffect(() => {
    fetchItems();
  }, [filters]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {};
      if (filters.category !== 'all') params.category = filters.category;
      if (filters.minPrice) params.minPrice = filters.minPrice;
      if (filters.maxPrice) params.maxPrice = filters.maxPrice;
      if (filters.search) params.search = filters.search;

      const response = await itemsAPI.getItems(params);
      setItems(response.data.data);
    } catch (error) {
      setError('Failed to fetch items');
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleAddToCart = async (itemId) => {
    if (!isAuthenticated) {
      alert('Please login to add items to cart');
      return;
    }

    const result = await addToCart(itemId);
    if (result.success) {
      alert('Item added to cart successfully!');
    } else {
      alert(result.message || 'Failed to add item to cart');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading items...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={fetchItems} className="retry-btn">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="home">
      <div className="container">
        <h1 className="page-title">Our Products</h1>
        
        <FilterBar
          filters={filters}
          categories={categories}
          onFilterChange={handleFilterChange}
        />

        <div className="items-grid">
          {items.length === 0 ? (
            <div className="no-items">
              <h3>No items found</h3>
              <p>Try adjusting your filters or search terms</p>
            </div>
          ) : (
            items.map(item => (
              <ItemCard
                key={item._id}
                item={item}
                onAddToCart={handleAddToCart}
                isAuthenticated={isAuthenticated}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
