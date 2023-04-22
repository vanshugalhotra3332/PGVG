import React from "react";
import { useDispatch } from "react-redux";

// slices import
import { toggleSideBar } from "@/slices/navSlice";

// icons import
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const dispatch = useDispatch();

  return (
    <>
      {/* menu icon */}
      <div
        className="menu-icon md:hidden inline-block relative top-3 left-3"
        onClick={() => {
          dispatch(toggleSideBar());
        }}
      >
        <MenuIcon className="h-8 w-8" />
      </div>
    </>
  );
};

export default Navbar;
