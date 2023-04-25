import React, { useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";

// component imports
import Sidebar_Nav from "@/components/Sidebars/Sidebar_Nav";
import Tab from "@/components/Tab/Tab";

const Settings = () => {
  // redux
  const isSideBarOpen = useSelector((state) => state.nav.isSideBarOpen);
  const sideBarOpenWidth = useSelector((state) => state.nav.sideBarOpenWidth);
  const sideBarCloseWidth = useSelector((state) => state.nav.sideBarCloseWidth);
  const { image, name, email } = useSelector((state) => state.user.userData);
  const windowWidth = useSelector((state) => state.global.windowWidth);

  // local states
  const [fullname, setFullname] = useState(name);
  const [selectedOption, setSelectedOption] = useState("rather not say");
  const [useremail, setUseremail] = useState(email);
  const [userphone, setUserphone] = useState("");

  const [occupation, setOccupation] = useState("Student");
  const [showOccupationOptions, setShowOccupationOptions] = useState(false);
  const [college, setCollege] = useState("");
  const [degree, setDegree] = useState("");
  const [semester, setSemester] = useState("");
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  const [bloodGroup, setBloodGroup] = useState("Select Blood Group");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [alergies, setAlergies] = useState("");

  const [showBloodGroupOptions, setShowBloodGroupOptions] = useState(false);

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
    setSelectedOption(event.target.value);
  };

  const occupationClick = (event) => {
    setOccupation(event.target.value);
    setShowOccupationOptions(false);
  };

  const bloodGroupClick = (event) => {
    setBloodGroup(event.target.value);
    setShowBloodGroupOptions(false);
  };

  return (
    <div className="flex">
      <Sidebar_Nav />
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
          <div className="user-profile py-4 px-4">
            <div className="user-profile-cards">
              {/* Basic Info */}
              <div className="user-profile-card">
                <div className="title">
                  <h2 className="text-2xl text-gray-900 font-medium">
                    Basic Info
                  </h2>
                  <span className="text-sm text-gray-600 py-1 inline-block">
                    Some Info may be visible to other people using PGVG services
                  </span>
                </div>
                <div className="user-profile-items my-4">
                  {/* avatar */}
                  <div className="user-profile-item">
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
                  <div className="user-profile-item">
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
                  <div className="user-profile-item">
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
                          checked={selectedOption === "male"}
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
                          checked={selectedOption === "female"}
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
                          checked={selectedOption === "rather not say"}
                        />
                        Rather not say
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="user-profile-card">
                <div className="title">
                  <h2 className="text-2xl text-gray-900 font-medium">
                    Contact Info
                  </h2>
                  <span className="text-sm text-gray-600 py-1 inline-block">
                    Your contact details will be kept confidential and will not
                    be shared with third parties without your consent.
                  </span>
                </div>
                <div className="user-profile-items my-4">
                  {/* email */}
                  <div className="user-profile-item">
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
                  <div className="user-profile-item">
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
              <div className="user-profile-card">
                <div className="title">
                  <h2 className="text-2xl text-gray-900 font-medium">
                    Occupation Info
                  </h2>
                  <span className="text-sm text-gray-600 py-1 inline-block">
                    Your occupation info is used to personalize your experiences
                    across PGVG, and for more relevant content. Only you can see
                    this information.
                  </span>
                </div>
                <div className="user-profile-items my-4">
                  {/* occupation */}
                  <div className="user-profile-item">
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
                              setShowOccupationOptions(!showOccupationOptions);
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

                  {occupation === "Student" && (
                    <div className="student-details">
                      {/* college */}
                      <div className="user-profile-item">
                        <div className="desc">
                          <span className="">University/College</span>
                        </div>

                        <div className="details">
                          <input
                            type="text"
                            id="college"
                            className="user-input"
                            placeholder="University/College"
                            value={college}
                            onChange={(e) => {
                              setCollege(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      {/* Degree */}
                      <div className="user-profile-item">
                        <div className="desc">
                          <span className="">Degree</span>
                        </div>

                        <div className="details">
                          <input
                            type="text"
                            id="degree"
                            className="user-input"
                            placeholder="Like Bachelor of Arts (B.A.)"
                            value={degree}
                            onChange={(e) => {
                              setDegree(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      {/* Year*/}
                      <div className="user-profile-item">
                        <div className="desc">
                          <span className="">Semester</span>
                        </div>

                        <div className="details">
                          <input
                            type="number"
                            id="degree-semester"
                            className="user-input"
                            placeholder="Current Semester"
                            value={semester}
                            onChange={(e) => {
                              setSemester(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {occupation === "Working Professional" && (
                    <div className="work-details">
                      {/* Company */}
                      <div className="user-profile-item">
                        <div className="desc">
                          <span className="">Company/Business</span>
                        </div>

                        <div className="details">
                          <input
                            type="text"
                            id="company"
                            className="user-input"
                            placeholder="Company/Business"
                            value={company}
                            onChange={(e) => {
                              setCompany(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      {/* Job Title */}
                      <div className="user-profile-item">
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
              <div className="user-profile-card">
                <div className="title">
                  <h2 className="text-2xl text-gray-900 font-medium">
                    Emergency Info
                  </h2>
                  <span className="text-sm text-gray-600 py-1 inline-block">
                    Your safety is our top priority. Providing us with emergency
                    information will help us ensure that we can respond
                    effectively in case of any emergency situation.
                  </span>
                </div>
                <div className="user-profile-items my-4">
                  {/* Blood Group */}
                  <div className="user-profile-item">
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
                              setShowBloodGroupOptions(!showBloodGroupOptions);
                            }}
                          >
                            <span className="ml-4">{bloodGroup}</span>
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
                  <div className="user-profile-item">
                    <div className="desc">
                      <span className="">Emergency Contact</span>
                    </div>

                    <div className="details">
                      <div className="phone-input relative">
                        <input
                          type="text"
                          className="text-gray-700 text-sm tracking-tight border border-gray-200 py-3 w-full px-14 placeholder:text-sm focus:border-gray-800 appearance-none rounded-md"
                          placeholder="Emergency Contact"
                          value={emergencyContact}
                          onChange={(e) => {
                            setEmergencyContact(e.target.value);
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
                  <div className="user-profile-item">
                    <div className="desc">
                      <span className="">Allergies (If Any)</span>
                    </div>

                    <div className="details">
                      <input
                        type="text"
                        id="alergies"
                        className="user-input"
                        placeholder="Write down your allergies or medical conditions (if any)"
                        value={alergies}
                        onChange={(e) => {
                          setAlergies(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="save-btn inline-block mx-4 my-6">
              <button className="btn-primary bg-blue-500 text-white hover:bg-blue-600">
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
