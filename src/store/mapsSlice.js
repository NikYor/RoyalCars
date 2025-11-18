import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoaded: false,
};

const mapsSlice = createSlice({
  name: "maps",
  initialState,
  reducers: {
    setLoaded(state, action) {
      state.isLoaded = action.payload;
    },
  },
});

export const { setLoaded } = mapsSlice.actions;
export default mapsSlice.reducer;
