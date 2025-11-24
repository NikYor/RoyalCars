import { createSlice } from "@reduxjs/toolkit";

const mapsSlice = createSlice({
  name: "maps",
  initialState: {
    isLoaded: false
  },
  reducers: {
    setLoaded(state, action) {
      state.isLoaded = action.payload;
    }
  },
});

export const { setLoaded } = mapsSlice.actions;
export default mapsSlice.reducer;
