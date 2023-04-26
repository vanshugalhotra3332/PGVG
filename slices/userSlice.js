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
  },
});

export const { logIn, logOut, setUserData } = userSlice.actions;
export default userSlice.reducer;
