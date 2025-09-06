import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { cartAPI } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

const initialState = {
  items: [],
  totalPrice: 0,
  itemCount: 0,
  loading: false,
  error: null,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_CART':
      return {
        ...state,
        items: action.payload.items,
        totalPrice: action.payload.totalPrice,
        itemCount: action.payload.itemCount,
        loading: false,
        error: null,
      };
    case 'ADD_TO_CART':
      return {
        ...state,
        loading: false,
        error: null,
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        loading: false,
        error: null,
      };
    case 'UPDATE_CART_ITEM':
      return {
        ...state,
        loading: false,
        error: null,
      };
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        totalPrice: 0,
        itemCount: 0,
        loading: false,
        error: null,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { isAuthenticated } = useAuth();

  // Fetch cart when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      dispatch({
        type: 'SET_CART',
        payload: { items: [], totalPrice: 0, itemCount: 0 },
      });
    }
  }, [isAuthenticated]);

  const fetchCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await cartAPI.getCart();
      dispatch({
        type: 'SET_CART',
        payload: response.data.data,
      });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error.response?.data?.message || 'Failed to fetch cart',
      });
    }
  };

  const addToCart = async (itemId, quantity = 1) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await cartAPI.addToCart({ itemId, quantity });
      dispatch({ type: 'ADD_TO_CART' });
      // Refresh cart to get updated data
      await fetchCart();
      return { success: true };
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error.response?.data?.message || 'Failed to add item to cart',
      });
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to add item to cart',
      };
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await cartAPI.removeFromCart({ itemId });
      dispatch({ type: 'REMOVE_FROM_CART' });
      // Refresh cart to get updated data
      await fetchCart();
      return { success: true };
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error.response?.data?.message || 'Failed to remove item from cart',
      });
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to remove item from cart',
      };
    }
  };

  const updateCartItem = async (itemId, quantity) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await cartAPI.updateCartItem({ itemId, quantity });
      dispatch({ type: 'UPDATE_CART_ITEM' });
      // Refresh cart to get updated data
      await fetchCart();
      return { success: true };
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error.response?.data?.message || 'Failed to update cart item',
      });
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update cart item',
      };
    }
  };

  const clearCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await cartAPI.clearCart();
      dispatch({ type: 'CLEAR_CART' });
      return { success: true };
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error.response?.data?.message || 'Failed to clear cart',
      });
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to clear cart',
      };
    }
  };

  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateCartItem,
    clearCart,
    fetchCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
