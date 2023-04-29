import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  center: [30.7109, 76.7603],
  zoom: 12,
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setCenter: (state, action) => {
      state.center = action.payload;
    },
    setZoom: (state, action) => {
      state.zoom = action.payload;
    },
  },
});

export const { setCenter, setZoom } = mapSlice.actions;
export default mapSlice.reducer;
