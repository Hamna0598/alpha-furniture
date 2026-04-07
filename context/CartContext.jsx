'use client';
import { createContext, useContext, useReducer, useEffect, useState } from 'react';

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.cartKey === action.payload.cartKey);
      if (existing) return { ...state, items: state.items.map(i => i.cartKey === action.payload.cartKey ? { ...i, quantity: i.quantity + action.payload.quantity } : i) };
      return { ...state, items: [...state.items, action.payload] };
    }
    case 'REMOVE_ITEM': return { ...state, items: state.items.filter(i => i.cartKey !== action.payload) };
    case 'UPDATE_QTY':  return { ...state, items: state.items.map(i => i.cartKey === action.payload.cartKey ? { ...i, quantity: Math.max(1, action.payload.quantity) } : i) };
    case 'CLEAR_CART':  return { ...state, items: [] };
    default: return state;
  }
}

export function CartProvider({ children }) {
  const [mounted, setMounted] = useState(false);
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    setMounted(true);
    try {
      const saved = JSON.parse(localStorage.getItem('alpha_cart') || '[]');
      if (saved.length) dispatch({ type: 'LOAD', payload: saved });
    } catch {}
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem('alpha_cart', JSON.stringify(state.items));
  }, [state.items, mounted]);

  const addItem = (product, quantity = 1, selectedColor = null, selectedSize = null) => {
    const colorKey = selectedColor || product.colors?.[0]?.name || 'default';
    const sizeKey  = selectedSize  || 'default';
    const cartKey  = `${product.id}-${colorKey}-${sizeKey}`;
    const colorObj = product.colors?.find(c => c.name === colorKey);
    dispatch({ type: 'ADD_ITEM', payload: { cartKey, id: product.id, slug: product.slug, name: product.name, price: product.price, image: product.images?.[0] || null, category: product.category, selectedColor: colorKey !== 'default' ? colorKey : null, selectedColorHex: colorObj?.hex || null, selectedSize: sizeKey !== 'default' ? sizeKey : null, quantity } });
  };

  const removeItem = cartKey => dispatch({ type: 'REMOVE_ITEM', payload: cartKey });
  const updateQty  = (cartKey, qty) => dispatch({ type: 'UPDATE_QTY', payload: { cartKey, quantity: qty } });
  const clearCart  = () => dispatch({ type: 'CLEAR_CART' });

  const totalItems  = state.items.reduce((s, i) => s + i.quantity, 0);
  const subtotal    = state.items.reduce((s, i) => s + i.price * i.quantity, 0);
  const deliveryFee = subtotal >= 10000 ? 0 : 500;
  const total       = subtotal + deliveryFee;

  return (
    <CartContext.Provider value={{ items: state.items, addItem, removeItem, updateQty, clearCart, totalItems, subtotal, deliveryFee, total, mounted }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
