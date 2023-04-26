import React, { useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// component imports
import Sidebar_Nav from "@/components/Sidebars/Sidebar_Nav";
import Tab from "@/components/Tab/Tab";

// icons
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

// mongoose
import mongoose from "mongoose";
import User from "@/models/User";
import { postData } from "@/db/dbFuncs";

const Settings = ({ userData }) => {
  // props
  const {
    image,
    name,
    email,
    phone,
    gender,
    occupation,
    college,
    degree,
    semester,
    company,
    job,
    bloodGroup,
    emergencyContact,
    allergies,
  } = userData;

  // redux
  const isSideBarOpen = useSelector((state) => state.nav.isSideBarOpen);
  const sideBarOpenWidth = useSelector((state) => state.nav.sideBarOpenWidth);
  const sideBarCloseWidth = useSelector((state) => state.nav.sideBarCloseWidth);

  const windowWidth = useSelector((state) => state.global.windowWidth);
  const selectedTab = useSelector((state) => state.settings.selectedTab);

  // local states
  const [fullname, setFullname] = useState(name);
  const [genderOption, setGenderOption] = useState(gender);
  const [useremail, setUseremail] = useState(email);
  const [userphone, setUserphone] = useState(phone);

  const [userOccupation, setUserOccupation] = useState(occupation);
  const [showOccupationOptions, setShowOccupationOptions] = useState(false);
  const [userCollege, setUserCollege] = useState(college);
  const [userDegree, setUserDegree] = useState(degree);
  const [userSemester, setUserSemester] = useState(semester);
  const [userCompany, setUserCompany] = useState(company);
  const [jobTitle, setJobTitle] = useState(job);

  const [userBloodGroup, setUserBloodGroup] = useState(bloodGroup);
  const [userEmergencyContact, setUserEmergencyContact] =
    useState(emergencyContact);
  const [userAllergies, setUserAllergies] = useState(allergies);

  const [showBloodGroupOptions, setShowBloodGroupOptions] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // local Variables
  const occupationList = ["Student", "Working Professional"];
  const bloodGroups = [
    "A +",
    "A -",
    "B +",
    "B -",
    "O +",
    "O -",
    "AB +",
    "AB -",
  ];

  let marginLeft = isSideBarOpen ? sideBarOpenWidth : sideBarCloseWidth;

  // local functions
  const handleRadioChange = (event) => {
    setGenderOption(event.target.value);
  };

  const occupationClick = (event) => {
    setUserOccupation(event.target.value);
    setShowOccupationOptions(false);
  };

  const bloodGroupClick = (event) => {
    setUserBloodGroup(event.target.value);
    setShowBloodGroupOptions(false);
  };

  const saveProfile = async () => {
    const identifier = email.length ? email : phone;
    const updateData = {
      [email ? "email" : "phone"]: identifier,
      name: fullname,
      gender: genderOption,
      occupation: userOccupation,
      college: userCollege,
      degree: userDegree,
      semester: userSemester,
      company: userCompany,
      job: jobTitle,
      bloodGroup: userBloodGroup,
      emergencyContact: userEmergencyContact,
      allergies: userAllergies,
    };

    const api = "http://localhost:3000/api/user/updateuser";
    const data = await postData("PATCH", updateData, api);
    if (data.success) {
      toast.success("Profile Updated Successfully!!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: {
          top: "65px",
        },
      });
    }
  };

  return (
    <div className="flex">
      <Sidebar_Nav />
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div
        className={`settings overflow-y-auto overflow-x-hidden py-7`}
        style={{
          marginLeft: windowWidth >= 768 ? marginLeft : "0px",
        }}
      >
        <h2 className="heading text-3xl font-medium text-gray-800 px-4 py-4">
          Settings
        </h2>
        {/* Search Bar */}

        {/* Tabs */}
        <div className="tabs border border-gray-300 border-opacity-60 w-screen my-6 overflow-x-auto whitespace-nowrap flex scrollbar-none">
          <Tab />
        </div>

        {/* Tabs content */}

        <div className="tabs-content">
          {/* Profile */}
          {selectedTab === "profile" && (
            <div className="user-profile py-4 px-4">
              <div className="user-profile-cards">
                {/* Basic Info */}
                <div className="user-setting-card">
                  <div className="title">
                    <h2 className="text-2xl text-gray-900 font-medium">
                      Basic Info
                    </h2>
                    <span className="text-sm text-gray-600 py-1 inline-block">
                      Some Info may be visible to other people using PGVG
                      services
                    </span>
                  </div>
                  <div className="user-setting-items my-4">
                    {/* avatar */}
                    <div className="user-setting-item">
                      <div className="desc">
                        <span className="">Profile Photo</span>
                      </div>

                      <div className="details">
                        <div className="avatar relative w-14 h-14 min-w-max">
                          <Image
                            alt="User"
                            className="rounded-full"
                            fill
                            style={{ objectFit: "cover" }}
                            src={image}
                          />
                        </div>

                        <div className="remove-btn text-gray-600 text-base font-semibold px-4 cursor-pointer hover:text-gray-800 ml-4">
                          Remove
                        </div>
                        <div className="update-btn text-blue-600 text-base font-semibold  cursor-pointer hover:text-blue-800">
                          Update
                        </div>
                      </div>
                    </div>
                    {/* full name */}
                    <div className="user-setting-item">
                      <div className="desc">
                        <span className="">Name</span>
                      </div>

                      <div className="details">
                        <input
                          type="text"
                          id="name"
                          className="user-input"
                          placeholder="Full Name"
                          value={fullname}
                          onChange={(e) => {
                            setFullname(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    {/* gender */}
                    <div className="user-setting-item">
                      <div className="desc">
                        <span className="">Gender</span>
                      </div>

                      <div className="details md:space-x-6 xs:space-x-2 space-x-0">
                        <label htmlFor="gender-radio" className="radio-item">
                          <input
                            id="gender-radio"
                            type="radio"
                            value="male"
                            name="gender-radio"
                            className="user-radio"
                            onChange={handleRadioChange}
                            checked={genderOption === "male"}
                          />
                          Male
                        </label>

                        <label htmlFor="gender-radio" className="radio-item">
                          {" "}
                          <input
                            id="gender-radio"
                            type="radio"
                            name="gender-radio"
                            className="user-radio"
                            value="female"
                            onChange={handleRadioChange}
                            checked={genderOption === "female"}
                          />
                          Female
                        </label>

                        <label htmlFor="gender-radio" className="radio-item">
                          <input
                            id="gender-radio"
                            type="radio"
                            value="rather not say"
                            name="gender-radio"
                            className="user-radio"
                            onChange={handleRadioChange}
                            checked={genderOption === "rather not say"}
                          />
                          Rather not say
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="user-setting-card">
                  <div className="title">
                    <h2 className="text-2xl text-gray-900 font-medium">
                      Contact Info
                    </h2>
                    <span className="text-sm text-gray-600 py-1 inline-block">
                      Your contact details will be kept confidential and will
                      not be shared with third parties without your consent.
                    </span>
                  </div>
                  <div className="user-setting-items my-4">
                    {/* email */}
                    <div className="user-setting-item">
                      <div className="desc">
                        <span className="">Email</span>
                      </div>

                      <div className="details">
                        <input
                          type="text"
                          id="email"
                          className="user-input"
                          placeholder="name@example.com"
                          value={useremail}
                          onChange={(e) => {
                            setUseremail(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    {/* phone */}
                    <div className="user-setting-item">
                      <div className="desc">
                        <span className="">Phone Number</span>
                      </div>

                      <div className="details">
                        <div className="phone-input relative">
                          <input
                            type="text"
                            className="text-gray-700 text-sm tracking-tight border border-gray-200 py-3 w-full px-14 placeholder:text-sm focus:border-gray-800 appearance-none rounded-md"
                            placeholder="Mobile Number"
                            value={userphone}
                            onChange={(e) => {
                              setUserphone(e.target.value);
                            }}
                          />
                          <div className="absolute inset-y-0 left-1 flex items-center">
                            <span className="text-gray-500 mx-2 text-sm">
                              +91{" "}
                              <span className="text-gray-500 text-sm mx-1 font-thin mb-1">
                                |
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Occupation Info */}
                <div className="user-setting-card">
                  <div className="title">
                    <h2 className="text-2xl text-gray-900 font-medium">
                      Occupation Info
                    </h2>
                    <span className="text-sm text-gray-600 py-1 inline-block">
                      Your occupation info is used to personalize your
                      experiences across PGVG, and for more relevant content.
                      Only you can see this information.
                    </span>
                  </div>
                  <div className="user-setting-items my-4">
                    {/* occupation */}
                    <div className="user-setting-item">
                      <div className="desc">
                        <span className="">Occupation</span>
                      </div>

                      <div className="details">
                        {/* dropdown */}
                        <div className="relative inline-block text-left bg-gray-100 w-full filter-element">
                          <div>
                            <button
                              type="button"
                              className="flex justify-between w-full gap-x-1.5 rounded-md py-3 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 outline-none capitalize"
                              id="menu-button-sort"
                              aria-expanded="true"
                              aria-haspopup="true"
                              onClick={() => {
                                setShowOccupationOptions(
                                  !showOccupationOptions
                                );
                              }}
                            >
                              <span className="ml-4">{occupation}</span>
                              <svg
                                className="mr-4 h-5 w-5 text-gray-400"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>

                          <div
                            className={`${
                              showOccupationOptions ? "block" : "hidden"
                            } transition-all duration-150 ease-out absolute right-0 z-10 w-full origin-top-right rounded-md bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="menu-button"
                            tabIndex="-1"
                          >
                            <div className="py-1 cursor-pointer" role="none">
                              {occupationList.map((item, index) => {
                                return (
                                  <div key={index} onClick={occupationClick}>
                                    <input
                                      className="text-gray-700 block px-4 py-2 text-sm transition-all duration-150 ease-out hover:bg-gray-200 outline-none bg-inherit cursor-pointer w-full"
                                      role="menuitem"
                                      tabIndex="-1"
                                      id="menu-item-0"
                                      value={item}
                                      disabled
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {userOccupation === "Student" && (
                      <div className="student-details">
                        {/* college */}
                        <div className="user-setting-item">
                          <div className="desc">
                            <span className="">University/College</span>
                          </div>

                          <div className="details">
                            <input
                              type="text"
                              id="college"
                              className="user-input"
                              placeholder="University/College"
                              value={userCollege}
                              onChange={(e) => {
                                setUserCollege(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        {/* Degree */}
                        <div className="user-setting-item">
                          <div className="desc">
                            <span className="">Degree</span>
                          </div>

                          <div className="details">
                            <input
                              type="text"
                              id="degree"
                              className="user-input"
                              placeholder="Like Bachelor of Arts (B.A.)"
                              value={userDegree}
                              onChange={(e) => {
                                setUserDegree(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        {/* Year*/}
                        <div className="user-setting-item">
                          <div className="desc">
                            <span className="">Semester</span>
                          </div>

                          <div className="details">
                            <input
                              type="number"
                              id="degree-semester"
                              className="user-input"
                              placeholder="Current Semester"
                              value={userSemester}
                              onChange={(e) => {
                                setUserSemester(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    {userOccupation === "Working Professional" && (
                      <div className="work-details">
                        {/* Company */}
                        <div className="user-setting-item">
                          <div className="desc">
                            <span className="">Company/Business</span>
                          </div>

                          <div className="details">
                            <input
                              type="text"
                              id="company"
                              className="user-input"
                              placeholder="Company/Business"
                              value={userCompany}
                              onChange={(e) => {
                                setUserCompany(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        {/* Job Title */}
                        <div className="user-setting-item">
                          <div className="desc">
                            <span className="">Job Title</span>
                          </div>

                          <div className="details">
                            <input
                              type="text"
                              id="jobTitle"
                              className="user-input"
                              placeholder="Job Title - like (Finance Manager)"
                              value={jobTitle}
                              onChange={(e) => {
                                setJobTitle(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Emergency Info */}
                <div className="user-setting-card">
                  <div className="title">
                    <h2 className="text-2xl text-gray-900 font-medium">
                      Emergency Info
                    </h2>
                    <span className="text-sm text-gray-600 py-1 inline-block">
                      Your safety is our top priority. Providing us with
                      emergency information will help us ensure that we can
                      respond effectively in case of any emergency situation.
                    </span>
                  </div>
                  <div className="user-setting-items my-4">
                    {/* Blood Group */}
                    <div className="user-setting-item">
                      <div className="desc">
                        <span className="">Blood Group</span>
                      </div>

                      <div className="details">
                        {/* dropdown */}
                        <div className="relative inline-block text-left bg-gray-100 w-full filter-element">
                          <div>
                            <button
                              type="button"
                              className="flex justify-between w-full gap-x-1.5 rounded-md py-3 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 outline-none capitalize"
                              id="menu-button-sort"
                              aria-expanded="true"
                              aria-haspopup="true"
                              onClick={() => {
                                setShowBloodGroupOptions(
                                  !showBloodGroupOptions
                                );
                              }}
                            >
                              <span className="ml-4">{userBloodGroup}</span>
                              <svg
                                className="mr-4 h-5 w-5 text-gray-400"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>

                          <div
                            className={`${
                              showBloodGroupOptions ? "block" : "hidden"
                            } transition-all duration-150 ease-out absolute right-0 z-10 w-full origin-top-right rounded-md bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="menu-button"
                            tabIndex="-1"
                          >
                            <div
                              className="py-1 cursor-pointer overflow-y-scroll max-h-[130px]"
                              role="none"
                            >
                              {bloodGroups.map((item, index) => {
                                return (
                                  <div key={index} onClick={bloodGroupClick}>
                                    <input
                                      className="text-gray-700 block px-4 py-2 text-sm transition-all duration-150 ease-out hover:bg-gray-200 outline-none bg-inherit cursor-pointer w-full"
                                      role="menuitem"
                                      tabIndex="-1"
                                      id="menu-item-0"
                                      value={item}
                                      disabled
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* emergency contact */}
                    <div className="user-setting-item">
                      <div className="desc">
                        <span className="">Emergency Contact</span>
                      </div>

                      <div className="details">
                        <div className="phone-input relative">
                          <input
                            type="text"
                            className="text-gray-700 text-sm tracking-tight border border-gray-200 py-3 w-full px-14 placeholder:text-sm focus:border-gray-800 appearance-none rounded-md"
                            placeholder="Emergency Contact"
                            value={userEmergencyContact}
                            onChange={(e) => {
                              setUserEmergencyContact(e.target.value);
                            }}
                          />
                          <div className="absolute inset-y-0 left-1 flex items-center">
                            <span className="text-gray-500 mx-2 text-sm">
                              +91{" "}
                              <span className="text-gray-500 text-sm mx-1 font-thin mb-1">
                                |
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* alergies */}
                    <div className="user-setting-item">
                      <div className="desc">
                        <span className="">Allergies (If Any)</span>
                      </div>

                      <div className="details">
                        <input
                          type="text"
                          id="allergies"
                          className="user-input"
                          placeholder="Write down your allergies or medical conditions (if any)"
                          value={userAllergies}
                          onChange={(e) => {
                            setUserAllergies(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="save-btn inline-block mx-4 my-6"
                onClick={saveProfile}
              >
                <button className="btn-primary bg-blue-500 text-white hover:bg-blue-600">
                  Save Profile
                </button>
              </div>
            </div>
          )}

          {selectedTab === "security" && (
            <div className="security py-4 px-4">
              {/* Basic Info */}
              <div className="security-cards">
                <div className="user-setting-card">
                  <div className="title">
                    <h2 className="text-2xl text-gray-900 font-medium">
                      Change Password
                    </h2>
                    <span className="text-sm text-gray-600 py-1 inline-block"></span>
                  </div>
                  <div className="user-setting-items my-4">
                    {/* current password */}
                    <div className="user-setting-item">
                      <div className="desc">
                        <span className="">Current Password</span>
                      </div>

                      <div className="details relative">
                        <input
                          type={`${showPassword ? "text" : "password"}`}
                          className="user-input"
                          placeholder="Current Password"
                          value={password}
                          onChange={(event) => {
                            setPassword(event.target.value);
                          }}
                        />
                        <div className="absolute inset-y-0 right-3 flex items-center">
                          <span
                            className="text-gray-700 mx-2 mt-1 cursor-pointer"
                            onClick={() => {
                              setShowPassword(!showPassword);
                            }}
                          >
                            {!showPassword && (
                              <RemoveRedEyeOutlinedIcon className="h-6 w-6 font-semibold" />
                            )}
                            {showPassword && (
                              <VisibilityOffOutlinedIcon className="h-6 w-6 font-semibold" />
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* new password */}
                    <div className="user-setting-item">
                      <div className="desc">
                        <span className="">New Password</span>
                      </div>

                      <div className="details relative">
                        <input
                          type={`${showPassword ? "text" : "password"}`}
                          className="user-input"
                          placeholder="New Password"
                          value={newPassword}
                          onChange={(event) => {
                            setNewPassword(event.target.value);
                          }}
                        />
                        <div className="absolute inset-y-0 right-3 flex items-center">
                          <span
                            className="text-gray-700 mx-2 mt-1 cursor-pointer"
                            onClick={() => {
                              setShowPassword(!showPassword);
                            }}
                          >
                            {!showPassword && (
                              <RemoveRedEyeOutlinedIcon className="h-6 w-6 font-semibold" />
                            )}
                            {showPassword && (
                              <VisibilityOffOutlinedIcon className="h-6 w-6 font-semibold" />
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* confirm password */}
                    <div className="user-setting-item">
                      <div className="desc">
                        <span className="">Confirm Password</span>
                      </div>

                      <div className="details relative">
                        <input
                          type={`${showPassword ? "text" : "password"}`}
                          className="user-input"
                          placeholder="Confirm Password"
                          value={confirmPassword}
                          onChange={(event) => {
                            setConfirmPassword(event.target.value);
                          }}
                        />
                        <div className="absolute inset-y-0 right-3 flex items-center">
                          <span
                            className="text-gray-700 mx-2 mt-1 cursor-pointer"
                            onClick={() => {
                              setShowPassword(!showPassword);
                            }}
                          >
                            {!showPassword && (
                              <RemoveRedEyeOutlinedIcon className="h-6 w-6 font-semibold" />
                            )}
                            {showPassword && (
                              <VisibilityOffOutlinedIcon className="h-6 w-6 font-semibold" />
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="update-btn inline-block my-4 mx-auto">
                      <div className="cursor-pointer btn-primary text-sm px-4">
                        Update Password
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// server side rendering
export async function getServerSideProps(query) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  const identifier = query.query.phone ? query.query.phone : query.query.email;
  let user = await User.findOne({
    $or: [{ email: identifier }, { phone: identifier }],
  });

  let userData = user ? JSON.parse(JSON.stringify(user)) : null;

  return {
    props: {
      userData: userData,
    },
  };
}

export default Settings;
