import { createSlice } from '@reduxjs/toolkit';

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: {
    error: '',
    message: '',
    actionCount: 0,
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
    setActionCount: (state, action) => {
      state.actionCount = action.payload;
    },
  },
});

export const { setError, setMessage, clearFeedback, setActionCount } = feedbackSlice.actions;
export default feedbackSlice.reducer;
