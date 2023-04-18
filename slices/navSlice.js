import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    open: (state) => {
      state.isOpen = true;
    },

    close: (state) => {
      state.isOpen = false;
    },

    toggle: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { open, close, toggle } = navSlice.actions;
export default navSlice.reducer;
