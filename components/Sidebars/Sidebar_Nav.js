import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { closeSideBar, toggleSideBar } from "@/slices/navSlice";
import { toggleFilterSideBar } from "@/slices/filterSlice";
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
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

const Sidebar_Nav = () => {
  const Router = useRouter();
  const dispatch = useDispatch();
  const isSideBarOpen = useSelector((state) => state.nav.isSideBarOpen);
  const sideBarOpenWidth = useSelector((state) => state.nav.sideBarOpenWidth);
  const sideBarCloseWidth = useSelector((state) => state.nav.sideBarCloseWidth);

  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const { image, name, email } = useSelector((state) => state.user.userData);
  const loggedIn = useSelector((state) => state.user.loggedIn);

  const [selected, setSelected] = useState("home");

  const [windowWidth, setWindowWidth] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const Sidebar_animation = {
    // system view
    open: {
      width: windowWidth >= "768" ? sideBarOpenWidth : "100vw",
      transition: {
        damping: 40,
      },
    },
    closed: {
      width: windowWidth >= "768" ? sideBarCloseWidth : "0vw",
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
    <div
      className={`sidebar 
      } inline-block overflow-y-auto fixed flex-1 left-0 top-0 shadow-lg z-[10000]`}
    >
      <motion.div
        variants={Sidebar_animation}
        animate={isSideBarOpen ? "open" : "closed"}
        className="bg-white text-gray shadow-xl z-[10000] h-screen w-full"
      >
        {/* Menus */}
        <div className="flex flex-col h-full">
          {/* user details */}

          <div className="user-details inline-flex justify-center flex-col items-center mt-4 border-b-2 border-gray-200 border-opacity-60">
            <div className="user-icon relative w-16 h-16 md:w-12 md:h-12 lg:w-16 lg:h-16 min-w-max">
              <Image
                alt="User"
                className="rounded-full"
                fill
                style={{ objectFit: "cover" }}
                src={image}
              />
            </div>

            {isSideBarOpen && loggedIn && (
              <div className="user-details py-4 flex items-center justify-center flex-col">
                <span className="inline-block text-center text-xl text-gray-700 ">
                  Hi,{" "}
                  <span className="font-semibold text-gray-800"> {name}</span>
                </span>
                <p className="text-blue-600">{email}</p>
              </div>
            )}
            {isSideBarOpen && !loggedIn && (
              <div
                className={`login-signup flex flex-col items-center justify-center py-2`}
              >
                <h1 className="block text-base md:text-xs lg:text-base text-gray-500 truncate tracking-tight font-normal dark:text-gray-400">
                  To access account and dashboard
                </h1>
                <div className="btns flex items-center justify-center">
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
            <ul className="whitespace-pre xl:px-2.5 text-[0.9rem] pt-5 pb-2 flex flex-col gap-1 font-medium overflow-x-hidden">
              <li>
                <Link
                  href={"/"}
                  className="sidebar-nav-link sidebar-nav-link-active"
                  onClick={linkClick}
                >
                  <HomeOutlinedIcon className="h-6 w-6 min-w-max" />
                  <p className="sidebar-nav-link-p">Home</p>
                </Link>
              </li>
              {/* explore */}
              <li>
                <Link
                  className={`sidebar-nav-link`}
                  onClick={() => setSubMenuOpen(!subMenuOpen)}
                  href={"/explore"}
                >
                  <ExploreOutlinedIcon className="h-6 w-6 min-w-max" />
                  <p className="sidebar-nav-link-p">Explore</p>
                  <KeyboardArrowDownOutlinedIcon
                    className={` ${
                      subMenuOpen && "rotate-180"
                    } duration-200 ml-auto`}
                  />
                </Link>
              </li>
              <motion.ul
                animate={
                  subMenuOpen
                    ? {
                        height: "fit-content",
                      }
                    : {
                        height: 0,
                      }
                }
                className="flex h-0 flex-col pl-14 text-[0.8rem] font-normal overflow-hidden"
              >
                <li>
                  <Link
                    href={"/explore"}
                    className="sidebar-nav-link !bg-transparent capitalize"
                    onClick={() => {
                      dispatch(toggleFilterSideBar());
                      dispatch(closeSideBar());
                    }}
                  >
                    Filters
                  </Link>
                </li>
              </motion.ul>

              {/* services */}
              <li>
                <Link
                  href={"/explore"}
                  className="sidebar-nav-link"
                  onClick={linkClick}
                >
                  <DesignServicesOutlinedIcon className="h-6 w-6 min-w-max" />
                  <p className="sidebar-nav-link-p">Services</p>
                </Link>
              </li>
              <li>
                <Link
                  href={"/explore"}
                  className="sidebar-nav-link"
                  onClick={linkClick}
                >
                  <InfoOutlinedIcon className="h-6 w-6 min-w-max" />
                  <p className="sidebar-nav-link-p">About</p>
                </Link>
              </li>
              <li>
                <Link
                  href={"/explore"}
                  className="sidebar-nav-link"
                  onClick={linkClick}
                >
                  <AddIcCallOutlinedIcon className="h-6 w-6 min-w-max" />
                  <p className="sidebar-nav-link-p">Contact</p>
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
            dispatch(toggleSideBar());
          }}
          animate={
            isSideBarOpen
              ? {
                  x: 0,
                  y: 0,
                  rotate: 0,
                }
              : {
                  x: -10,
                  rotate: 180,
                }
          }
          transition={{ duration: 0 }}
          className="absolute w-fit h-fit  z-50 right-2 bottom-3 cursor-pointer"
        >
          <ArrowBackIosOutlinedIcon className="h-6 w-6 mr-2" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Sidebar_Nav;
