import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  UilAngleLeft,
  UilEstate,
  UilCompass,
  UilAt,
  UilGraphBar,
  UilUsersAlt
} from "@iconscout/react-unicons";
import Image from "next/image";
import Link from "next/link";

const SideBar = ({ toggleNav, setToggleNav }) => {
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

  return (
    <div className="sidebar md:hidden">
      <motion.div
        variants={Sidebar_animation}
        animate={toggleNav ? "open" : "closed"}
        className="bg-white text-gray shadow-xl z-[999] w-screen max-w-[100vw] h-[91vh] overflow-hidden md:relative fixed"
      >
        {/* sidebar img */}
        {/* <div className="sidebar-img flex items-center gap-2.5 font-medium border-b border-slate-300 py-3 mx-3">
          <div className="relative h-24 w-32">
            <Image
              src={"/assets/img/others/appre.svg"}
              alt={"PGVG"}
              layout="fill"
              className="inline-block"
              style={{
                objectFit: "cover",
              }}
            />
          </div>
        </div> */}

        {/* Menus */}
        <div className="flex flex-col h-full">
          {/* first */}
          <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1 font-medium overflow-x-hidden">
            <li>
              <Link
                href={"/"}
                className="p-2.5 flex rounded-md gap-6 items-center md:cursor-pointer cursor-default duration-300 font-medium bg-blue-100 text-blue-600"
              >
                <UilEstate className="h-6 w-6 min-w-max" />
                Home
              </Link>
            </li>
            <li>
              <Link
                href={"/explore"}
                className="p-2.5 flex rounded-md gap-6 items-center md:cursor-pointer cursor-default duration-300 font-medium"
              >
                <UilCompass className="h-6 w-6 min-w-max" />
                Explore
              </Link>
            </li>
            <li>
              <Link
                href={"/explore"}
                className="p-2.5 flex rounded-md gap-6 items-center md:cursor-pointer cursor-default duration-300 font-medium"
              >
                <UilGraphBar className="h-6 w-6 min-w-max" />
                Services
              </Link>
            </li>
            <li>
              <Link
                href={"/explore"}
                className="p-2.5 flex rounded-md gap-6 items-center md:cursor-pointer cursor-default duration-300 font-medium"
              >
                <UilUsersAlt className="h-6 w-6 min-w-max" />
                About
              </Link>
            </li>
            <li>
              <Link
                href={"/explore"}
                className="p-2.5 flex rounded-md gap-6 items-center md:cursor-pointer cursor-default duration-300 font-medium"
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

export default SideBar;
