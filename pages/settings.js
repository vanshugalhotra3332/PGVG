import React from "react";
import { useSelector } from "react-redux";

// component imports
import Sidebar_Nav from "@/components/Sidebars/Sidebar_Nav";
import Tab from "@/components/Tab/Tab";

const Settings = () => {
  // redux
  const isSideBarOpen = useSelector((state) => state.nav.isSideBarOpen);
  const sideBarOpenWidth = useSelector((state) => state.nav.sideBarOpenWidth);
  const sideBarCloseWidth = useSelector((state) => state.nav.sideBarCloseWidth);

  let marginLeft = isSideBarOpen ? sideBarOpenWidth : sideBarCloseWidth;
  return (
    <div className="flex">
      <Sidebar_Nav />
      <div
        className={`settings overflow-y-auto overflow-x-hidden py-7`}
        style={{
          marginLeft: marginLeft,
        }}
      >
        <h2 className="heading text-2xl font-medium text-gray-800 px-4 py-4">
          Settings
        </h2>
        {/* Search Bar */}

        {/* Tabs */}

        <Tab />
      </div>
    </div>
  );
};

export default Settings;
