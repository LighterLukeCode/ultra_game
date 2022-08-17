import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Game } from "../../interfaces/Game";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Params {
  categoryAPI: string;
  sortBy: string;
  order: string;
  search: string;
  currentPage: number;
}

export const fetchGame = createAsyncThunk("game/fetchGameStatus", async (params: Params) => {
  const { categoryAPI, sortBy, order, search, currentPage } = params;
  const { data } = await axios.get(
    `https://62aa2737371180affbd08847.mockapi.io/items${categoryAPI}&page=${currentPage}&limit=6&sortBy=${sortBy}&order=${order}&${search}`
  );
  return data;
});

enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface GameState {
  items: Game[];
  status: Status;
}

const initialState: GameState = {
  items: [],
  status: Status.LOADING,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setItem: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchGame.pending, state => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchGame.fulfilled, (state, action: PayloadAction<Game[]>) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchGame.rejected, state => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setItem } = gameSlice.actions;

export default gameSlice.reducer;
