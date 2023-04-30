import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pgs: [],
  nearbyBusStops: [],
  nearbyBanks: [],
};

export const pgSlice = createSlice({
  name: "pgs",
  initialState,
  reducers: {
    setPGs: (state, action) => {
      state.pgs = action.payload;
    },
    setNearbyBusStops: (state, action) => {
      state.nearbyBusStops = action.payload;
    },
    setNearbyBanks: (state, action) => {
      state.nearbyBanks = action.payload;
    },
  },
});

export const { setPGs, setNearbyBusStops, setNearbyBanks } = pgSlice.actions;
export default pgSlice.reducer;
