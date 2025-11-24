import { configureStore } from '@reduxjs/toolkit';
import feedbackReducer from './feedbackSlice';
import mapsReducer from "./mapsSlice";
import completedReducer from "./completedSlice";

export const store = configureStore({
  reducer: {
    feedback: feedbackReducer,
    maps: mapsReducer,
    completed: completedReducer
  },
});
