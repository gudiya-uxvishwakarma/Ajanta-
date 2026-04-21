import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, qty = 1 } = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.qty += qty;
      } else {
        state.items.push({ ...product, qty });
      }
      
      state.totalQuantity = state.items.reduce((sum, item) => sum + item.qty, 0);
    },
    
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
      state.totalQuantity = state.items.reduce((sum, item) => sum + item.qty, 0);
    },
    
    updateQuantity: (state, action) => {
      const { id, qty } = action.payload;
      
      if (qty < 1) {
        state.items = state.items.filter(item => item.id !== id);
      } else {
        const item = state.items.find(item => item.id === id);
        if (item) {
          item.qty = qty;
        }
      }
      
      state.totalQuantity = state.items.reduce((sum, item) => sum + item.qty, 0);
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
