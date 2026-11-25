import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";

// ---- STORE: the single object that holds all app state ---------------------
export const store = configureStore({
  reducer: { auth: authReducer },
});

// ---- SUBSCRIBE: runs after every dispatched action -------------------------
// React components use useSelector (which subscribes for them), but here is the
// raw API so you can see it working in the browser console.
store.subscribe(() => {
  const { isAuthenticated, status, error } = store.getState().auth;
  console.log("[store.subscribe] state changed ->", { isAuthenticated, status, error });
});
