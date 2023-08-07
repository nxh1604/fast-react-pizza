import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import cartSlice from "./features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cartSlice,
  },
});

export type IRootState = ReturnType<typeof store.getState>;
