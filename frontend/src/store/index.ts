import { configureStore } from "@reduxjs/toolkit";
import rfpReducer from "./slices/rfpSlice";
import vendorReducer from "./slices/vendorSlice";
import proposalReducer from "./slices/proposalSlice";

export const store = configureStore({
  reducer: {
    rfp: rfpReducer,
    vendor: vendorReducer,
    proposal: proposalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
