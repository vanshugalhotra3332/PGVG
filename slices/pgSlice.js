import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pgs: [],
  nearbyBusStops: [],
  nearbyBanks: [],
  nearbyCinemas: [],
  nearbyRestraunts: [],
  nearbyHospitals: [],
  nearbyParks: [],
  nearbyShopping: [],
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
    setNearbyCinemas: (state, action) => {
      state.nearbyCinemas = action.payload;
    },
    setNearbyRestraunts: (state, action) => {
      state.nearbyRestraunts = action.payload;
    },
    setNearbyHospitals: (state, action) => {
      state.nearbyHospitals = action.payload;
    },
    setNearbyParks: (state, action) => {
      state.nearbyParks = action.payload;
    },
    setNearbyShopping: (state, action) => {
      state.nearbyShopping = action.payload;
    },
  },
});

export const {
  setPGs,
  setNearbyBusStops,
  setNearbyBanks,
  setNearbyCinemas,
  setNearbyRestraunts,
  setNearbyHospitals,
  setNearbyParks,
  setNearbyShopping,
} = pgSlice.actions;
export default pgSlice.reducer;
