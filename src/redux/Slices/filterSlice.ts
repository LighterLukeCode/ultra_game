import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface FilterConfig {
  currentPage: number;
  category: string;
  sort: Sort;
}

interface Sort {
  name: string;
  sortProperty: string;
}

interface FilterState extends FilterConfig {
  searchValue: string;
}

export interface QueryString extends FilterConfig {
  sortProperty: string;
}

const initialState: FilterState = {
  currentPage: 1,
  searchValue: "",
  category: "Все жанры",
  sort: { name: "более популярным", sortProperty: "rating" },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setSort: (state, action: PayloadAction<Sort>) => {
      state.sort = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilter: (state, action: PayloadAction<FilterConfig>) => {
      state.category = action.payload.category;
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
});

export const { setCategory, setSort, setCurrentPage, setFilter, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
