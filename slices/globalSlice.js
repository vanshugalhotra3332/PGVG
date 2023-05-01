import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  windowWidth: 1500,
  progress: 0,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setWindowWidth: (state, action) => {
      state.windowWidth = action.payload;
    },
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
  },
});

export const { setWindowWidth, setProgress } = globalSlice.actions;
export default globalSlice.reducer;
