import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSideBar: true,
  openFilterSideBarWidth: "25vw",
  closeFilterSideBarWidth: "0vw",
  minPrice: 0,
  maxPrice: 20000,
  propertyType: "All",
  sortBy: "Popularity",
  showPropertyType: false,
  showSortType: false,
  sharings: ["Single", "Double", "Triple", "Four"],
  amenities: [
    "wi-fi",
    "balcony",
    "with-food",
    "ac",
    "laundry",
    "24/7",
    "attached washrooms",
  ],
  amenitiesSearch: "",
  selectedAmenities: [],
  selectedSharings: ["any"],
  nearbyCoordinates: [], // lat, long
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    toggleFilterSideBar: (state) => {
      state.showSideBar = !state.showSideBar;
    },
    openFilterSideBar: (state) => {
      state.showSideBar = true;
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
    setAmenitiesSearch: (state, action) => {
      state.amenitiesSearch = action.payload;
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
    addSelectedAmenity: (state, action) => {
      state.selectedAmenities.push(action.payload);
    },
    removeSelectedAmenity: (state, action) => {
      let index = state.selectedAmenities.indexOf(action.payload);
      state.selectedAmenities.splice(index, 1);
    },
    setNearbyCoordinates: (state, action) => {
      state.nearbyCoordinates = action.payload;
    },
  },
});

export const {
  setMinPrice,
  setMaxPrice,
  setPropertyType,
  setAmenitiesSearch,
  setSortBy,
  toggleShowPropertyType,
  toggleShowSortType,
  addSelectedSharing,
  removeSelectedSharing,
  toggleFilterSideBar,
  addSelectedAmenity,
  removeSelectedAmenity,
  openFilterSideBar,
  setNearbyCoordinates,
} = filterSlice.actions;
export default filterSlice.reducer;
