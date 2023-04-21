import React, { useEffect } from "react";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import Sidebar_Nav from "./Sidebars/Sidebar_Nav";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "next-auth/react";
import {
  closeUserMenu,
  openUserMenu,
  toggleSideBar,
  toggleUserMenu,
} from "@/slices/navSlice";
import { logOut } from "@/slices/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const isUserMenuOpen = useSelector((state) => state.nav.isUserMenuOpen);
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const userData = useSelector((state) => state.user.userData);

  const Router = useRouter();

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
