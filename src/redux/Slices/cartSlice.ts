import { createSlice } from "@reduxjs/toolkit";
import { CartItem } from "../../interfaces/CartItem";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface CartState {
  items: CartItem[];
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const findItem = state.items.find(obj => obj.game.id === action.payload.game.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = state.items.reduce((sum, obj) => sum + obj.game.price * obj.count, 0);
    },
    minusItem: (state, action: PayloadAction<string>) => {
      const findItem = state.items.find(obj => obj.game.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
      state.totalPrice = state.items.reduce((sum, obj) => sum + obj.game.price * obj.count, 0);
    },

    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(obj => obj.game.id !== action.payload);
      state.totalPrice = state.items.reduce((sum, obj) => sum + obj.game.price * obj.count, 0);
    },
    clearItem: state => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cartSlice;

export const { addItem, removeItem, clearItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
