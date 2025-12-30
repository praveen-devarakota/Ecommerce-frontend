// context/CartContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { token } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart when user is logged in
  useEffect(() => {
    if (token) fetchCart();
    else setCartItems([]); // Reset cart on logout
  }, [token]);

  const fetchCart = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data.items || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      await axios.post(
        'http://localhost:5001/api/cart/add',
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.post(
        'http://localhost:5001/api/cart/remove',
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateQuantity = async (productId, change) => {
    try {
      await axios.patch(
        'http://localhost:5001/api/cart/changeQuantity',
        { productId, change },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const clearCart = async () => {
    try {
      await axios.post(
        'http://localhost:5001/api/cart/clear',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        fetchCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
