import React, { useState } from "react";
import Image from "next/image";
import { UilSearch, UilBars, UilTimes } from "@iconscout/react-unicons";

const Navbar = () => {
  const [searchText, setSearchText] = useState("");

  const [toggleNav, setToggleNav] = useState(false);
//   const [toggleUserMenu, setToggleUserMenu] = useState(false)

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <nav className="sticky top-0 z-[1000]">
      <div className="flex-no-wrap  flex w-full items-center justify-between bg-neutral-100 py-4 shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start shadow-lg z-50">
        {/* overall div */}
        <div className="flex w-full flex-wrap items-center justify-between px-6">
          {/* burger icon to collapse nav */}
          {!toggleNav && (
            <button
              className="md:hidden"
              onClick={() => {
                setToggleNav(!toggleNav);
              }}
            >
              <UilBars className="h-8 w-8 cursor-pointer" />
            </button>
          )}
          {toggleNav && (
            <button
              className="md:hidden"
              onClick={() => {
                setToggleNav(!toggleNav);
              }}
            >
              <UilTimes className="h-8 w-8 cursor-pointer text-sm" />
            </button>
          )}

          {/* logo div */}
          <div
            className="items-center lg:!flex lg:basis-auto ml-6 md:ml-3"
            id="logoDiv"
          >
            <a
              className="mt-2 mr-2 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mt-0"
              href="#"
            >
              <span className="text-2xl font-bold">PGVG</span>
            </a>
          </div>

          {/* search and nav elements */}
          <div className="hidden md:flex justify-between items-center space-x-10">
            <div className="flex items-center md:border-2 rounded-full py-2  md:shadow-sm">
              <input
                value={searchText}
                onChange={handleChange}
                type="text"
                placeholder="Start Your Search"
                className="pl-5 pr-16 bg-transparent outline-none flex-grow text-sm text-gray-600 placeholder-gray-400"
              />

              <UilSearch className="hidden md:inline-flex h-8 w-8 bg-blue-400 text-white rounded-full p-2 cursor-pointer mx-2" />
            </div>
            <ul
              className="list-style-none mr-auto flex pl-0 lg:flex-row ml-20 md:ml-5 md:space-x-4"
              data-te-navbar-nav-ref
            >
              <li className="lg:pr-2" data-te-nav-item-ref>
                <a
                  className="text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400"
                  href="#"
                  data-te-nav-link-ref
                >
                  Explore
                </a>
              </li>
              <li className="lg:pr-2" data-te-nav-item-ref>
                <a
                  className="text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                  href="#"
                  data-te-nav-link-ref
                >
                  About Us
                </a>
              </li>
              <li className="lg:pr-2" data-te-nav-item-ref>
                <a
                  className="text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                  href="#"
                  data-te-nav-link-ref
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* user and notification icons */}
          <div className="relative flex items-center">
            <div className="relative" data-te-dropdown-ref>
              <div className="md:mr-10 cursor-pointer mr-4">
                <Image
                  src={"/assets/img/others/user.jpg"}
                  alt={""}
                  height={40}
                  width={40}
                  className="rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`relative top-1 w-full h-auto transform ${
          toggleNav ? "translate-x-0 block" : "-translate-x-full hidden"
        } transition-all ease-out duration-200`}
      >
        <ul className="p-4 bg-gray-50">
          <li className="pt-4 text-lg text-neutral-700 active:text-blue-500 transition-all ease-out duration-100">
            Explore
          </li>
          <li className="pt-4 text-lg text-neutral-700 active:text-blue-500 transition-all ease-out duration-100">
            About Us
          </li>
          <li className="pt-4 text-lg text-neutral-700 active:text-blue-500 transition-all ease-out duration-100">
            Contact Us
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
