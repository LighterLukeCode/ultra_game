import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setItem: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setItem } = gameSlice.actions;

export default gameSlice.reducer;
