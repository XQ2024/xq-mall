// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    itemCount: 0,
  },
  reducers: {
    updateItemCount: (state, action) => {
      state.itemCount += action.payload;
    },
  },
});

export const { updateItemCount } = cartSlice.actions;

export default cartSlice.reducer;
