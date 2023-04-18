import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSideBar: false,
  minPrice: 0,
  maxPrice: 20000,
  propertyType: "All",
  location: "",
  sortBy: "Popularity",
  showPropertyType: false,
  showSortType: false,
  sharings: ["Single", "Double", "Triple", "Four"],
  amenities: [],
  selectedAmenities: [],
  selectedSharings: [],
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    toggleSideBar: (state) => {
      state.showSideBar = !state.showSideBar;
    },
    setMinPrice: (state, action) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
    },
    setPropertyType: (state, action) => {
      state.propertyType = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setAmenities: (state, action) => {
      state.amenities = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    toggleShowPropertyType: (state) => {
      state.showPropertyType = !state.showPropertyType;
    },
    toggleShowSortType: (state) => {
      state.showSortType = !state.showSortType;
    },
    addSelectedSharing: (state, action) => {
      state.selectedSharings.push(action.payload);
    },
    removeSelectedSharing: (state, action) => {
      let index = state.selectedSharings.indexOf(action.payload);
      state.selectedSharings.splice(index, 1);
    },
  },
});

export const {
  setMinPrice,
  setMaxPrice,
  setPropertyType,
  setLocation,
  setAmenities,
  setSortBy,
  toggleShowPropertyType,
  toggleShowSortType,
  addSelectedSharing,
  removeSelectedSharing,
  toggleSideBar,
} = filterSlice.actions;
export default filterSlice.reducer;
