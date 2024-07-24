// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Fetch reviews
// export const fetchReviews = createAsyncThunk(
//   "reviews/fetchReviews",
//   async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/reviews"); // Adjust URL as needed
//       return response.data;
//     } catch (error) {
//       return Promise.reject(error.response.data); // Handle errors
//     }
//   }
// );

// // Add review
// export const addReview = createAsyncThunk(
//   "reviews/addReview",
//   async (newReview, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/reviews",
//         newReview
//       ); // Adjust URL as needed
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data); // Handle errors
//     }
//   }
// );

// const reviewsSlice = createSlice({
//   name: "reviews",
//   initialState: {
//     reviews: [],
//     status: "idle",
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchReviews.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchReviews.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.reviews = action.payload;
//       })
//       .addCase(fetchReviews.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload || action.error.message;
//       })
//       .addCase(addReview.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(addReview.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.reviews.push(action.payload);
//       })
//       .addCase(addReview.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload || action.error.message;
//       });
//   },
// });

// export default reviewsSlice.reducer;
