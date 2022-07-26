import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: "Все жанры",
  sort: { name: "более популярным", sortProperty: "rating" },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      console.log(action);
      state.category = action.payload;
    },
  },
});

export const { setCategory } = filterSlice.actions;

export default filterSlice.reducer;
