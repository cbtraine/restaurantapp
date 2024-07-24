import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  details: {},
};

export const userSlice = createSlice({
  name: "userdetails",
  initialState,
  reducers: {
    storeUserDetails: (state, action) => {
      state.details = action.payload;
    },
  },
});

export const { storeUserDetails } = userSlice.actions;

export default userSlice.reducer;
