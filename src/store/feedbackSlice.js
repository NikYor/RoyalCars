import { createSlice } from '@reduxjs/toolkit';

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: {
    error: '',
    message: '',
  },
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
      state.message = '';
    },
    setMessage: (state, action) => {
      state.message = action.payload;
      state.error = '';
    },
    clearFeedback: (state) => {
      state.error = '';
      state.message = '';
    },
  },
});

export const { setError, setMessage, clearFeedback } = feedbackSlice.actions;
export default feedbackSlice.reducer;
