import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import categoryReducer from "../features/user/categorySlice";
import itemReducer from "../features/user/itemSlice";
import cartReducer from "../features/user/cartSlice";
// import reviewReducer from "../features/user/reviewSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    categories: categoryReducer,
    items: itemReducer,
    cart: cartReducer,
    // reviews: reviewReducer,
  },
});
