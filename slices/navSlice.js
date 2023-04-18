import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSideBarOpen: false,
  isUserMenuOpen: false,
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

    openUserMenu: (state) => {
      state.isUserMenuOpen = true;
    },

    closeUserMenu: (state) => {
      state.isUserMenuOpen = false;
    },

    toggleUserMenu: (state) => {
      state.isUserMenuOpen = !state.isUserMenuOpen;
    },
  },
});

export const {
  openSideBar,
  closeSideBar,
  toggleSideBar,
  openUserMenu,
  closeUserMenu,
  toggleUserMenu,
} = navSlice.actions;
export default navSlice.reducer;
