import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGame = createAsyncThunk("game/fetchGameStatus", async params => {
  const { categoryAPI, sortBy, order, search, currentPage } = params;
  const { data } = await axios.get(
    `https://62aa2737371180affbd08847.mockapi.io/items${categoryAPI}&page=${currentPage}&limit=6&sortBy=${sortBy}&order=${order}&${search}`
  );
  return data;
});

const initialState = {
  items: [],
  status: "loading",
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setItem: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchGame.pending]: state => {
      state.status = "loading";
      state.items = [];
    },
    [fetchGame.fulfilled]: (state, action) => {
      state.status = "success";
      state.items = action.payload;
    },
    [fetchGame.rejected]: state => {
      state.status = "error";
      state.items = [];
    },
  },
});

export const { setItem } = gameSlice.actions;

export default gameSlice.reducer;
