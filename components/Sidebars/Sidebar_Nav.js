import React from "react";
import { motion } from "framer-motion";
import {
  UilAngleLeft,
  UilEstate,
  UilCompass,
  UilAt,
  UilGraphBar,
  UilUsersAlt,
} from "@iconscout/react-unicons";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar_Nav = ({ toggleNav, setToggleNav }) => {
  const Router = useRouter();
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
    setToggleNav(false);
    Router.push(event.href);
  };

  return (
    <div className="sidebar md:hidden">
      <motion.div
        variants={Sidebar_animation}
        animate={toggleNav ? "open" : "closed"}
        className="bg-white text-gray shadow-xl z-[10000] w-screen max-w-[100vw] h-[91vh] overflow-hidden md:relative fixed"
      >
        {/* Menus */}
        <div className="flex flex-col h-full">
          {/* first */}
          <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1 font-medium overflow-x-hidden">
            <li>
              <Link
                href={"/"}
                className="sidebar-nav-link sidebar-nav-link-active"
                onClick={linkClick}
              >
                <UilEstate className="h-6 w-6 min-w-max" />
                Home
              </Link>
            </li>
            <li>
              <Link
                href={"/explore"}
                className="sidebar-nav-link"
                onClick={linkClick}
              >
                <UilCompass className="h-6 w-6 min-w-max" />
                Explore
              </Link>
            </li>
            <li>
              <Link
                href={"/explore"}
                className="sidebar-nav-link"
                onClick={linkClick}
              >
                <UilGraphBar className="h-6 w-6 min-w-max" />
                Services
              </Link>
            </li>
            <li>
              <Link
                href={"/explore"}
                className="sidebar-nav-link"
                onClick={linkClick}
              >
                <UilUsersAlt className="h-6 w-6 min-w-max" />
                About
              </Link>
            </li>
            <li>
              <Link
                href={"/explore"}
                className="sidebar-nav-link"
                onClick={linkClick}
              >
                <UilAt className="h-6 w-6 min-w-max" />
                Contact
              </Link>
            </li>
          </ul>
          {/* second */}
        </div>

        {/* back button */}
        <motion.div
          onClick={() => {
            setToggleNav(false);
          }}
          className="back-icon absolute w-fit h-fit z-[10000] right-2 bottom-5 cursor-pointer"
        >
          <UilAngleLeft className="h-10 w-10" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Sidebar_Nav;
