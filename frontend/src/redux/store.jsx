// store.js
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productSlice";
import userReducer from "./userslice";
import cartReducer from "./cartSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    user: userReducer,
    cart: cartReducer,
  },
});

export default store;
