import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./Slices/filterSlice";
import cartSlice from "./Slices/cartSlice";
import gameSlice from "./Slices/gameSlice";

export const store = configureStore({
  reducer: {
    filterSlice,
    cartSlice,
    gameSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
