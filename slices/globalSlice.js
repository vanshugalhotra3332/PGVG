import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  windowWidth: 1500,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setWindowWidth: (state, action) => {
      state.windowWidth = action.payload;
    },
  },
});

export const { setWindowWidth } = globalSlice.actions;
export default globalSlice.reducer;
