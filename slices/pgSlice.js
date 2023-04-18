import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pgs: [],
};

export const pgSlice = createSlice({
  name: "pgs",
  initialState,
  reducers: {
    setPGs: (state, action) => {
      state.pgs = action.payload;
    },
  },
});

export const { setPGs } = pgSlice.actions;
export default pgSlice.reducer;
