import React, { useState, useEffect } from 'react';
import CartContext from '../context/CartContext';
import { fetchCart, addToCart, updateCartItem, removeFromCart, clearCart } from '../services/api';

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  // Load cart on mount
  useEffect(() => {
    loadCart();
  }, []);

  // Update cart count whenever cart changes
  useEffect(() => {
    const count = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(count);
  }, [cart]);

  const loadCart = async () => {
    try {
      setLoading(true);
      const { data } = await fetchCart();
      setCart(data);
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (productId, quantity = 1) => {
    try {
      const { data } = await addToCart(productId, quantity);
      setCart(data);
      return { success: true };
    } catch (error) {
      console.error('Error adding to cart:', error);
      return { success: false, error: error.response?.data?.message };
    }
  };

  const updateItem = async (itemId, quantity) => {
    try {
      const { data } = await updateCartItem(itemId, quantity);
      setCart(data);
      return { success: true };
    } catch (error) {
      console.error('Error updating cart:', error);
      return { success: false };
    }
  };

  const removeItem = async (itemId) => {
    try {
      const { data } = await removeFromCart(itemId);
      setCart(data);
      return { success: true };
    } catch (error) {
      console.error('Error removing from cart:', error);
      return { success: false };
    }
  };

  const emptyCart = async () => {
    try {
      const { data } = await clearCart();
      setCart(data);
      return { success: true };
    } catch (error) {
      console.error('Error clearing cart:', error);
      return { success: false };
    }
  };

  const value = {
    cart,
    loading,
    cartCount,
    addItem,
    updateItem,
    removeItem,
    emptyCart,
    refreshCart: loadCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};