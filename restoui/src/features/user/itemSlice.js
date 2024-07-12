import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async (filters) => {
    const { category, search, available, page = 1, limit = 10 } = filters;
    const response = await axios.get("http://localhost:5000/api/items", {
      params: {
        category,
        search,
        available,
        page,
        limit,
      },
    });
    return { items: response.data.items, count: response.data.count };
  }
);
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ item_id, quantity }) => {
    const response = await axios.post("http://localhost:5000/api/cart/add", {
      item_id,
      quantity,
    });
    return response.data;
  }
);

const itemSlice = createSlice({
  name: "items",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    count: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items;
        state.count = action.payload.count;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default itemSlice.reducer;
