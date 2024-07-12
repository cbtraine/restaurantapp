import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async () => {
    const response = await axios.get("http://localhost:5000/api/cart");
    return response.data;
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (id) => {
    await axios.delete(`http://localhost:5000/api/cart/remove/${id}`);
    return id;
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ id, quantity }) => {
    await axios.put(`http://localhost:5000/api/cart/update/${id}`, {
      quantity,
    });
    return { id, quantity };
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

const initialState = {
  cartItems: [],
  status: null,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const index = state.cartItems.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.cartItems[index].quantity = action.payload.quantity;
        }
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartItems.push(action.payload);
      });
  },
});

export default cartSlice.reducer;
