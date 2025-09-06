import React from 'react';
import './FilterBar.css';

const FilterBar = ({ filters, categories, onFilterChange }) => {
  const handleInputChange = (field, value) => {
    onFilterChange({ [field]: value });
  };

  const clearFilters = () => {
    onFilterChange({
      category: 'all',
      minPrice: '',
      maxPrice: '',
      search: ''
    });
  };

  return (
    <div className="filter-bar">
      <div className="filter-container">
        <div className="filter-group">
          <label htmlFor="search">Search:</label>
          <input
            type="text"
            id="search"
            placeholder="Search items..."
            value={filters.search}
            onChange={(e) => handleInputChange('search', e.target.value)}
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={filters.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className="filter-select"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="minPrice">Min Price:</label>
          <input
            type="number"
            id="minPrice"
            placeholder="0"
            value={filters.minPrice}
            onChange={(e) => handleInputChange('minPrice', e.target.value)}
            className="filter-input"
            min="0"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="maxPrice">Max Price:</label>
          <input
            type="number"
            id="maxPrice"
            placeholder="1000"
            value={filters.maxPrice}
            onChange={(e) => handleInputChange('maxPrice', e.target.value)}
            className="filter-input"
            min="0"
          />
        </div>

        <button onClick={clearFilters} className="clear-filters-btn">
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
