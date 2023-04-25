import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedTab: "profile",
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSelectedTab: (state, action) => {
      state.selectedTab = action.payload;
    },
  },
});

export const { setSelectedTab } = settingsSlice.actions;
export default settingsSlice.reducer;
