'use client';
import { createContext, useContext, useReducer, useEffect, useState } from 'react';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try { setItems(JSON.parse(localStorage.getItem('alpha_wishlist') || '[]')); } catch {}
  }, []);

  useEffect(() => { localStorage.setItem('alpha_wishlist', JSON.stringify(items)); }, [items]);

  const toggle = product => {
    setItems(prev => prev.find(i => i.id === product.id) ? prev.filter(i => i.id !== product.id) : [...prev, product]);
  };
  const isWishlisted = id => items.some(i => i.id === id);

  return <WishlistContext.Provider value={{ items, toggle, isWishlisted, count: items.length }}>{children}</WishlistContext.Provider>;
}

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be inside WishlistProvider');
  return ctx;
};
