import { configureStore } from "@reduxjs/toolkit";
import statusReducer from "../features/status/statusSlice";
import tokenReducer from "../features/token/tokenSlice";

export const store = configureStore({
  reducer: {
    status: statusReducer,
    token: tokenReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
