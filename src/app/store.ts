import { configureStore } from "@reduxjs/toolkit";
import todoReduder from "reducers/todoSlice";

export const store = configureStore({
  reducer: {
    todo: todoReduder,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
