import { createSlice } from "@reduxjs/toolkit";

const completedSlice = createSlice({
  name: "completed",
  initialState: {
    cars: [],
  },
  reducers: {
    addCompletedCar: (state, action) => {
      const carId = action.payload;
      if (!state.cars.includes(carId)) {
        state.cars.push(carId);
      }
    },
    clearCompletedCars: (state, action) => {
      const carId = action.payload;
      state.cars = state.cars.filter((car) => {
        const existingId = Object.keys(car)[0];
        return existingId !== carId;
      });
    },
  },
});

export const { addCompletedCar, clearCompletedCars } = completedSlice.actions;
export default completedSlice.reducer;