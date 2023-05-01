import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  userData: {
    name: "",
    email: "",
    phone: "",
    image: "../assets/img/icons/avatar.svg",
    gender: "rather not say",
    occupation: "Student",
    college: "",
    degree: "",
    semester: "",
    company: "",
    job: "",
    bloodGroup: "Select Blood Group",
    emergencyContact: "",
    allergies: "",
  },
  coordinates: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn: (state) => {
      state.loggedIn = true;
    },
    logOut: (state) => {
      state.loggedIn = false;
    },
    setUserData: (state, action) => {
      state.userData = { ...state.userData, ...action.payload };
    },
    setCoordinates: (state, action) => {
      state.coordinates = action.payload;
    },
  },
});

export const { logIn, logOut, setUserData, setCoordinates } = userSlice.actions;
export default userSlice.reducer;
