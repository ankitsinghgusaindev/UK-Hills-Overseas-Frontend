import { configureStore } from "@reduxjs/toolkit";

import productReducer from "../Redux/ProductSlice";
import cartReducer from "../Redux/CartSlice";
import orderReducer from "../Redux/OrderSlice";
import authReducer from "../Redux/AuthSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    orders: orderReducer,
     auth: authReducer,
  },
});