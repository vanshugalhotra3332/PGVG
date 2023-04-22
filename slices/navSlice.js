import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSideBarOpen: false,
  sideBarOpenWidth: "20vw",
  sideBarCloseWidth: "4vw",
  showFilterSubMenu: false,
  selectedLink: "home",
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
    setShowFilterSubMenu: (state, action) => {
      state.showFilterSubMenu = action.payload;
    },
    toggleFilterSubMenu: (state) => {
      state.showFilterSubMenu = !state.showFilterSubMenu;
    },
    setSelectedLink: (state, action) => {
      state.selectedLink = action.payload;
    },
  },
});

export const {
  openSideBar,
  closeSideBar,
  toggleSideBar,
  setSideBarCloseWidth,
  setSideBarOpenWidth,
  setShowFilterSubMenu,
  toggleFilterSubMenu,
  setSelectedLink,
} = navSlice.actions;
export default navSlice.reducer;
