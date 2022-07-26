import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 1,
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
      state.sort = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilter: (state, action) => {
      state.category = action.payload.category;
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
    },
  },
});

export const { setCategory, setSort, setCurrentPage, setFilter } = filterSlice.actions;

export default filterSlice.reducer;
