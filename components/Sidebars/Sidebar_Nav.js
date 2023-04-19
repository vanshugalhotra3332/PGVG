import React, { useState } from "react";
import { motion } from "framer-motion";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { closeSideBar } from "@/slices/navSlice";
import Image from "next/image";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import DesignServicesOutlinedIcon from "@mui/icons-material/DesignServicesOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AddIcCallOutlinedIcon from "@mui/icons-material/AddIcCallOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";

const Sidebar_Nav = () => {
  const Router = useRouter();
  const dispatch = useDispatch();
  const isSideBarOpen = useSelector((state) => state.nav.isSideBarOpen);
  const { image, name, email } = useSelector((state) => state.user.userData);
  const loggedIn = useSelector((state) => state.user.loggedIn);

  const [selected, setSelected] = useState("dashboard");

  const Sidebar_animation = {
    // system view
    open: {
      width: "100vw",
      transition: {
        damping: 40,
      },
    },
    closed: {
      width: "0rem",
      transition: {
        damping: 40,
      },
    },
  };

  const linkClick = (event) => {
    dispatch(closeSideBar());
    Router.push(event.href);
  };

  return (
    <div className="sidebar md:hidden">
      <motion.div
        variants={Sidebar_animation}
        animate={isSideBarOpen ? "open" : "closed"}
        className="bg-white text-gray shadow-xl z-[10000] w-screen max-w-[100vw] h-[91vh] overflow-hidden md:relative fixed"
      >
        {/* Menus */}
        <div className="flex flex-col h-full">
          {/* user details */}

          <div className="user-details inline-flex justify-center flex-col items-center mt-4 border-b-2 border-gray-200 border-opacity-60">
            <div className="user-icon relative w-16 h-16">
              <Image
                alt="User"
                className="rounded-full"
                fill
                style={{ objectFit: "cover" }}
                src={image}
              />
            </div>
            {loggedIn && (
              <div className="user-details py-4 flex items-center justify-center flex-col">
                <span className="inline-block text-center text-xl text-gray-700 ">
                  Hi,{" "}
                  <span className="font-semibold text-gray-800"> {name}</span>
                </span>
                <p className="text-blue-600">{email}</p>
              </div>
            )}
            {!loggedIn && (
              <div
                className={`login-signup flex flex-col items-center justify-center py-2`}
              >
                <h1 className="block text-base  text-gray-500 truncate tracking-tight font-normal dark:text-gray-400">
                  To access account and dashboard
                </h1>
                <div className="btns">
                  <button
                    className="uppercase tracking-tight text-blue-600 text-sm font-medium my-2 py-2 px-5 border-2 border-gray-200 hover:border-blue-500 transition-all duration-100 ease-out"
                    onClick={() => {
                      Router.push("/login");
                      dispatch(closeSideBar());
                    }}
                  >
                    Login
                  </button>
                  <button
                    className="uppercase tracking-tight text-blue-600 text-sm font-medium my-2 py-2 px-5 border-2 border-gray-200 hover:border-blue-500 transition-all duration-100 ease-out"
                    onClick={() => {
                      Router.push("/signup");
                      dispatch(closeSideBar());
                    }}
                  >
                    Signup
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="list-content py-2">
            <ul className="whitespace-pre px-2.5 text-[0.9rem] pt-5 pb-2 flex flex-col gap-1 font-medium overflow-x-hidden">
              <li>
                <Link
                  href={"/"}
                  className="sidebar-nav-link sidebar-nav-link-active"
                  onClick={linkClick}
                >
                  <HomeOutlinedIcon className="h-6 w-6 min-w-max" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href={"/explore"}
                  className="sidebar-nav-link"
                  onClick={linkClick}
                >
                  <ExploreOutlinedIcon className="h-6 w-6 min-w-max" />
                  Explore
                </Link>
              </li>
              <li>
                <Link
                  href={"/explore"}
                  className="sidebar-nav-link"
                  onClick={linkClick}
                >
                  <DesignServicesOutlinedIcon className="h-6 w-6 min-w-max" />
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href={"/explore"}
                  className="sidebar-nav-link"
                  onClick={linkClick}
                >
                  <InfoOutlinedIcon className="h-6 w-6 min-w-max" />
                  About
                </Link>
              </li>
              <li>
                <Link
                  href={"/explore"}
                  className="sidebar-nav-link"
                  onClick={linkClick}
                >
                  <AddIcCallOutlinedIcon className="h-6 w-6 min-w-max" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {loggedIn && (
            <div className="list-content border-t-2 border-gray-200 border-opacity-60">
              <ul className="whitespace-pre px-2.5 text-[0.9rem] pt-5 pb-2 flex flex-col gap-1 font-medium overflow-x-hidden">
                <li>
                  <Link
                    href={"#"}
                    className="sidebar-nav-link"
                    onClick={linkClick}
                  >
                    <DashboardOutlinedIcon className="h-6 w-6 min-w-max" />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href={"#"}
                    className="sidebar-nav-link"
                    onClick={linkClick}
                  >
                    <SettingsOutlinedIcon className="h-6 w-6 min-w-max" />
                    Settings
                  </Link>
                </li>
                <li>
                  <Link
                    href={"#"}
                    className="sidebar-nav-link"
                    onClick={() => {
                      signOut("google");
                    }}
                  >
                    <LogoutOutlinedIcon className="h-6 w-6 min-w-max" />
                    Sign Out
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* back button */}
        <motion.div
          onClick={() => {
            dispatch(closeSideBar());
          }}
          className="back-icon absolute w-fit h-fit z-[10000] right-2 bottom-5 cursor-pointer"
        >
          <ArrowBackIosOutlinedIcon className="h-6 w-6 mr-2" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Sidebar_Nav;
