import { configureStore } from "@reduxjs/toolkit";
import navReducer from "../slices/navSlice";
import userReducer from "../slices/userSlice";
import pgReducer from "../slices/pgSlice";
import filterReducer from "../slices/filterSlice";
import globalReducer from "../slices/globalSlice";

export const store = configureStore({
  reducer: {
    nav: navReducer,
    user: userReducer,
    pgs: pgReducer,
    filter: filterReducer,
    global: globalReducer,
  },
});
