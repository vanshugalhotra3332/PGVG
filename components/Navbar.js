import React, { useState } from "react";
import Image from "next/image";
import { UilBars, UilTimes } from "@iconscout/react-unicons";
import Link from "next/link";
import Sidebar_Nav from "./Sidebars/Sidebar_Nav";

const Navbar = () => {
  const [toggleNav, setToggleNav] = useState(false);
  const [toggleUserMenu, setToggleUserMenu] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <nav
        className="bg-white border-2 shadow-sm
    border-gray-200 border-opacity-60 dark:bg-gray-900 sticky top-0 z-[10000]"
      >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 border-gray-200">
          {/* menu icon */}
          <div
            className="menu-icon md:hidden"
            onClick={() => {
              setToggleNav(!toggleNav);
            }}
          >
            <UilBars className="h-8 w-8" />
          </div>

          {/* logo section */}
          <Link
            href="/"
            className="flex items-center relative w-24 h-10 justify-center mt-1"
          >
            <Image
              src={"/logo.jpg"}
              layout="fill"
              alt="PGVG"
              style={{ objectFit: "cover" }}
            />
          </Link>

          {/* nav items */}
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  href="/"
                  className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/explore"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Explore
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* user icon */}
          <div
            className="flex items-center md:order-2"
            onClick={() => {
              setToggleUserMenu(!toggleUserMenu);
            }}
          >
            <div className="img relative w-10 h-10 cursor-pointer rounded-full">
              <Image
                className="rounded-full"
                src="/assets/img/others/user.jpg"
                layout="fill"
                alt="User Photo"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>

        {/* user menu */}
        <div
          className={`${
            toggleUserMenu ? "inline-block" : "hidden"
          } absolute right-16 z-50 text-base list-none bg-white divide-y divide-gray-100 rounded-sm shadow-sm dark:bg-gray-700 dark:divide-gray-600 w-[20vw] my-1`}
          id="user-dropdown"
          onMouseOver={() => {
            setToggleUserMenu(true);
          }}
          onMouseLeave={() => {
            setTimeout(() => {
              setToggleUserMenu(false);
            }, 300);
          }}
        >
          <div className="px-4 py-3 flex items-center border-b-[1px] border-gray-100 border-opacity-60">
            <div
              className={`user-details ${loggedIn ? "inline-block" : "hidden"}`}
            >
              <span className="block text-sm text-gray-900 font-semibold dark:text-white">
                Hey, Vanshu Galhotra!
              </span>
              <span className="block text-sm  text-blue-400 truncate dark:text-gray-400">
                vanshugalhotra3332@gmail.com
              </span>
            </div>
            <div
              className={`login-signup ${
                !loggedIn ? "inline-block" : "hidden"
              }`}
            >
              <span className="block text-sm text-gray-900 font-semibold tracking-tight leading-relaxed dark:text-white">
                Welcome
              </span>
              <span className="block text-sm  text-gray-500 truncate tracking-tight font-normal dark:text-gray-400">
                To access account and dashboard
              </span>
              <button className="uppercase tracking-tight text-blue-600 text-xs font-medium my-2 py-2 px-4 border-2 border-gray-200 hover:border-blue-500 transition-all duration-100 ease-out">
                Login / Signup
              </button>
            </div>
          </div>
          <ul className="py-2">
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Earnings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <Sidebar_Nav toggleNav={toggleNav} setToggleNav={setToggleNav} />
    </>
  );
};

export default Navbar;
