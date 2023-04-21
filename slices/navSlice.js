import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSideBarOpen: false,
  sideBarOpenWidth: "20vw",
  sideBarCloseWidth: "4vw",
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    openSideBar: (state) => {
      state.isSideBarOpen = true;
    },

    closeSideBar: (state) => {
      state.isSideBarOpen = false;
    },

    toggleSideBar: (state) => {
      state.isSideBarOpen = !state.isSideBarOpen;
    },

    setSideBarOpenWidth: (state, action) => {
      state.sideBarOpenWidth = action.payload;
    },
    setSideBarCloseWidth: (state, action) => {
      state.sideBarCloseWidth = action.payload;
    },
  },
});

export const {
  openSideBar,
  closeSideBar,
  toggleSideBar,
  setSideBarCloseWidth,
  setSideBarOpenWidth,
} = navSlice.actions;
export default navSlice.reducer;
