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

  // local states
  const [fullname, setFullname] = useState(name);
  const [selectedOption, setSelectedOption] = useState("rather not say");

  let marginLeft = isSideBarOpen ? sideBarOpenWidth : sideBarCloseWidth;

  // local functions
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="flex">
      <Sidebar_Nav />
      <div
        className={`settings overflow-y-auto overflow-x-hidden py-7`}
        style={{
          marginLeft: marginLeft,
        }}
      >
        <h2 className="heading text-3xl font-medium text-gray-800 px-4 py-4">
          Settings
        </h2>
        {/* Search Bar */}

        {/* Tabs */}
        <div className="tabs border border-gray-300 border-opacity-60 w-screen my-6">
          <Tab />
        </div>

        {/* Tabs content */}

        <div className="tabs-content">
          {/* Profile */}
          <div className="user-profile py-4 px-4">
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

                  <div className="details space-x-6">
                    <label for="gender-radio" className="radio-item">
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

                    <label for="gender-radio" className="radio-item">
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

                    <label for="gender-radio" className="radio-item">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
