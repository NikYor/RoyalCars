import { configureStore } from '@reduxjs/toolkit';
import feedbackReducer from './feedbackSlice';
import mapsReducer from "./mapsSlice";

export const store = configureStore({
  reducer: {
    feedback: feedbackReducer,
    maps: mapsReducer,
  },
});
