import React, { useState } from "react";
import RangeSlider from "@/components/RangeSlider";
import { useSelector, useDispatch } from "react-redux";
import { setPGs } from "@/slices/pgSlice";
import {
  setPropertyType,
  setLocation,
  setAmenitiesSearch,
  setSortBy,
  toggleShowPropertyType,
  toggleShowSortType,
  addSelectedSharing,
  removeSelectedSharing,
  toggleFilterSideBar,
  addSelectedAmenity,
  removeSelectedAmenity,
} from "@/slices/filterSlice";

import RoomIcon from "@mui/icons-material/Room";
import HotelOutlinedIcon from "@mui/icons-material/HotelOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";

import {
  AcBadge,
  AttachedWashroomBadge,
  BalconyBadge,
  BedBadge,
  LaundryBadge,
  TwentyFourSevenBadge,
  WifiBadge,
  WithFoodBadge,
} from "../Badges";

import { motion } from "framer-motion";

const Sidebar_Filters = () => {
  const dispatch = useDispatch();
  const propertyType = useSelector((state) => state.filter.propertyType);
  const location = useSelector((state) => state.filter.location);
  const amenities = useSelector((state) => state.filter.amenities);
  const amenitiesSearch = useSelector((state) => state.filter.amenitiesSearch);
  const sortBy = useSelector((state) => state.filter.sortBy);
  const sharings = useSelector((state) => state.filter.sharings);
  const showSideBar = useSelector((state) => state.filter.showSideBar);
  const selectedSharings = useSelector(
    (state) => state.filter.selectedSharings
  );
  const selectedAmenities = useSelector(
    (state) => state.filter.selectedAmenities
  );
  const showPropertyType = useSelector(
    (state) => state.filter.showPropertyType
  );
  const showSortType = useSelector((state) => state.filter.showSortType);

  const minRentPerMonth = parseInt(
    useSelector((state) => state.filter.minPrice)
  );
  const maxRentPerMonth = parseInt(
    useSelector((state) => state.filter.maxPrice)
  );

  const windowWidth = useSelector((state) => state.global.windowWidth);

  const isSideBarOpen = useSelector((state) => state.nav.isSideBarOpen);
  const sideBarOpenWidth = useSelector((state) => state.nav.sideBarOpenWidth);
  const sideBarCloseWidth = useSelector((state) => state.nav.sideBarCloseWidth);

  const properties = ["All", "PG", "Flat"];
  const sortByOptions = [
    "Popularity",
    "What's new",
    "Price - high to low",
    "Price - low to high",
    "Rating",
  ];

  const propertyClick = (event) => {
    dispatch(setPropertyType(event.target.value));
    dispatch(toggleShowPropertyType());
  };

  const sortByClick = (event) => {
    dispatch(setSortBy(event.target.value));
    dispatch(toggleShowSortType());
  };

  const amenitiesBadgeClick = (event) => {
    event.target.classList.toggle("badge-select");
    let badgeText = event.target.id.toLowerCase();

    if (selectedAmenities.includes(badgeText)) {
      dispatch(removeSelectedAmenity(badgeText));
    } else {
      dispatch(addSelectedAmenity(badgeText));
    }
  };

  const sharingBadgeClick = (event) => {
    event.target.classList.toggle("badge-select");

    let badgeText = event.target.childNodes[1].innerText.toLowerCase();

    if (selectedSharings.includes(badgeText)) {
      dispatch(removeSelectedSharing(badgeText));
    } else {
      dispatch(addSelectedSharing(badgeText));
    }
  };

  const applyFilters = () => {
    var query = "?";
    if (propertyType != "All") {
      query += `&type=${propertyType}`;
    }
    query += `&minRentPerMonth=${minRentPerMonth}&maxRentPerMonth=${maxRentPerMonth}`;

    if (selectedSharings.length && !selectedSharings.includes("any")) {
      query += `&sharings=${selectedSharings.join(",")}`;
    }

    if (selectedAmenities.length) {
      query += `&amenities=${selectedAmenities.join(",")}`;
    }

    async function getPGs() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/getpgs${query}`
        );
        const pgs = await response.json();
        dispatch(setPGs(pgs.pgs));
      } catch (error) {
        console.log(error);
      }
    }
    getPGs();
    if (windowWidth <= 1024) {
      dispatch(toggleFilterSideBar());
    }
  };
  const sidebarAnimation = {
    // animation variants
    open: {
      y: 0, // animate to position 0 (top of viewport)
      transition: {
        duration: 0.2, // animation duration
      },
    },
    closed: {
      y: "-105%", // animate exit to position outside of viewport (top)
      transition: {
        duration: 0.2, // animation duration
      },
    },
  };
  let marginLeft = isSideBarOpen ? sideBarOpenWidth : sideBarCloseWidth;

  return (
    <motion.div
      variants={sidebarAnimation}
      animate={showSideBar ? "open" : "closed"}
      className={`lg:!inline-block h-screen overflow-y-auto scrollbar-none sidebar w-full lg:w-1/4 border-2 border-gray-200 border-opacity-60 rounded-lg border-t-0 transition-all transform duration-300 ease-in-out z-[10000] flex-none fixed left-0 bg-white`}
      style={{
        marginLeft: windowWidth >= 768 ? marginLeft : "0px",
      }}
    >
      <div className="sidebar-elements px-10 pt-10 pb-20 ">
        {/* filter & reset */}
        <div className="heading flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold inline-flex">Filter</h1>
            <FilterAltOutlinedIcon className="mb-[0.7rem] hidden md:inline-flex text-gray-800 mx-2 transition-all duration-200 ease-out hover:-translate-y-[.5px] pointer-events-none w-7 h-7" />
          </div>
          <span className="text-lg text-blue-600 cursor-pointer mt-3 transition-all duration-150 ease-out hover:text-blue-500 ">
            Reset
          </span>
          <CloseOutlinedIcon
            className="h-6 w-6 cursor-pointer text-sm"
            onClick={() => {
              dispatch(toggleFilterSideBar());
            }}
          />
        </div>

        {/* sort  */}
        <div className="sort mt-4">
          <h2 className="filter-heading">Sort by</h2>
          {/* dropdown */}
          <div className="relative inline-block text-left bg-gray-100 w-full filter-element">
            <div>
              <button
                type="button"
                className="flex justify-between w-full gap-x-1.5 rounded-md py-3 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 outline-none"
                id="menu-button-sort"
                aria-expanded="true"
                aria-haspopup="true"
                onClick={() => {
                  dispatch(toggleShowSortType());
                }}
              >
                <span className="ml-4">{sortBy}</span>
                <svg
                  className="mr-4 h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <div
              className={`${
                showSortType ? "block" : "hidden"
              } transition-all duration-150 ease-out absolute right-0 z-10 w-full origin-top-right rounded-md bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex="-1"
            >
              <div className="py-1 cursor-pointer" role="none">
                {sortByOptions.map((item, index) => {
                  return (
                    <div key={index} onClick={sortByClick}>
                      <input
                        className="text-gray-700 block px-4 py-2 text-sm transition-all duration-150 ease-out hover:bg-gray-200 outline-none bg-inherit cursor-pointer w-full"
                        role="menuitem"
                        tabIndex="-1"
                        id="menu-item-0"
                        value={item}
                        disabled
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* filter elements */}
        <div className="filter-elements space-y-5">
          {/* price filter */}
          <div className="mt-4 price-filter">
            <h2 className="filter-heading">Rent Per Month (₹) </h2>
            <RangeSlider
              className="filter-element"
              step={100}
              priceCap={1000}
            />
          </div>

          {/* property type */}
          <div className="property-type">
            <h2 className="filter-heading">Property Type </h2>
            {/* dropdown */}
            <div className="relative inline-block text-left bg-gray-100 w-full filter-element">
              <div>
                <button
                  type="button"
                  className="flex justify-between w-full gap-x-1.5 rounded-md py-3 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 outline-none"
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                  onClick={() => {
                    dispatch(toggleShowPropertyType());
                  }}
                >
                  <span className="ml-4">{propertyType}</span>
                  <svg
                    className="mr-4 h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div
                className={`${
                  showPropertyType ? "block" : "hidden"
                } transition-all duration-150 ease-out absolute right-0 z-10 w-full origin-top-right rounded-md bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex="-1"
              >
                <div className="py-1 cursor-pointer" role="none">
                  {properties.map((item, index) => {
                    return (
                      <div key={index} onClick={propertyClick}>
                        <input
                          className="text-gray-700 block px-4 py-2 text-sm transition-all duration-150 ease-out hover:bg-gray-200 outline-none bg-inherit cursor-pointer w-full"
                          role="menuitem"
                          tabIndex="-1"
                          id="menu-item-0"
                          value={item}
                          disabled
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* location */}
          <div className="location-filter mt-4">
            <h2 className="filter-heading">Nearby Location</h2>
            <div className="flex items-center md:border-2 rounded-full py-2  md:shadow-sm filter-element">
              <RoomIcon className="inline-flex text-blue-700 rounded-full cursor-pointer mx-2 transition-all duration-200 ease-out hover:-translate-y-[.5px]" />
              <input
                value={location}
                onChange={(e) => {
                  dispatch(setLocation(e.target.value));
                }}
                type="text"
                placeholder="Search Location"
                className="pl-5 pr-16 bg-transparent outline-none flex-grow text-sm text-gray-600 placeholder-gray-400"
              />
            </div>
          </div>

          {/* amenities */}
          <div className="conveniences-filter">
            <h2 className="filter-heading">Amenities</h2>
            {/* search bar */}
            <div className="flex items-center md:border-2 rounded-full py-2  md:shadow-sm filter-element">
              <CheckCircleOutlinedIcon className="inline-flex text-blue-700 rounded-full cursor-pointer mx-2 transition-all duration-200 ease-out hover:-translate-y-[.5px]" />
              <input
                value={amenitiesSearch}
                onChange={(e) => {
                  dispatch(setAmenitiesSearch(e.target.value));
                }}
                type="text"
                placeholder="Search Amenities"
                className="pl-5 pr-16 bg-transparent outline-none flex-grow text-sm text-gray-600 placeholder-gray-400"
              />
            </div>
            {/* badges */}
            <div className="badges filter-element w-full">
              {amenities.includes("wi-fi") && (
                <WifiBadge amenitiesBadgeClick={amenitiesBadgeClick} />
              )}
              {amenities.includes("balcony") && (
                <BalconyBadge amenitiesBadgeClick={amenitiesBadgeClick} />
              )}
              {amenities.includes("ac") && (
                <AcBadge amenitiesBadgeClick={amenitiesBadgeClick} />
              )}
              {amenities.includes("with-food") && (
                <WithFoodBadge amenitiesBadgeClick={amenitiesBadgeClick} />
              )}
              {amenities.includes("24/7") && (
                <TwentyFourSevenBadge
                  amenitiesBadgeClick={amenitiesBadgeClick}
                />
              )}
              {amenities.includes("laundry") && (
                <LaundryBadge amenitiesBadgeClick={amenitiesBadgeClick} />
              )}
              {amenities.includes("attached washrooms") && (
                <AttachedWashroomBadge
                  amenitiesBadgeClick={amenitiesBadgeClick}
                />
              )}
            </div>
          </div>

          {/* bed sharing */}
          <div className="bed-sharing">
            <h2 className="filter-heading">Bed Sharing</h2>
            {/* badges */}
            <div className="badges filter-element w-full">
              {sharings.map((sharing) => {
                return (
                  <BedBadge
                    key={sharing}
                    sharing={sharing}
                    sharingBadgeClick={sharingBadgeClick}
                  />
                );
              })}
              <div
                className={`convenience-badge badge-select`}
                onClick={sharingBadgeClick}
              >
                <HotelOutlinedIcon className="convenience-badge-icon" />
                <span className="convenience-badge-text">Any</span>
              </div>
            </div>
          </div>
        </div>

        {/* apply button */}
        <div className="p-2 w-full mt-6" onClick={applyFilters}>
          <button className="font-semibold bg-gray-700 w-full py-3 rounded-xl text-gray-100 transition-all duration-150 ease-out hover:bg-gray-800 active:bg-gray-800 hover:shadow-sm active:shadow-sm">
            Apply
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar_Filters;
