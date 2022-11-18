import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { authSlice } from "../pages/auth/authSlice";
import { alertSlice } from "./alertSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    alert: alertSlice.reducer,
  },
});

export type StoreState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;
export const useStoreSelector: TypedUseSelectorHook<StoreState> = useSelector;
export const useStoreDispatch = () => useDispatch<StoreDispatch>();
