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
      state.category = action.payload;
    },
    setSort: (state, action) => {
      console.log(action);
      state.sort = action.payload;
    },
  },
});

export const { setCategory, setSort } = filterSlice.actions;

export default filterSlice.reducer;
