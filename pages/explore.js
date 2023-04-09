import RangeSlider from "@/components/RangeSlider";
import React, { useState, useEffect } from "react";
import Map from "@/components/Map";

import {
  UilMapMarker,
  UilCheckCircle,
  UilWifi,
  UilRestaurant,
  UilHouseUser,
  UilToiletPaper,
  UilWind,
  UilWater,
  UilCloudMoon,
  UilBed,
  UilFilter,
  UilArrowsVAlt,
  UilTimes,
} from "@iconscout/react-unicons";
import PGcard from "@/components/Cards/PGcard";

const Explore = () => {
  const [pgs, setPgs] = useState([]);

  useEffect(() => {
    async function getPGs() {
      try {
        const response = await fetch("http://localhost:3000/api/getpgs");
        const pgs = await response.json();
        setPgs(pgs.pgs);
      } catch (error) {
        console.log(error);
      }
    }
    getPGs();
    return () => {};
  }, []);

  const [togglePopDD, setTogglePopDD] = useState(false);
  const [toggleSortDD, setToggleSortDD] = useState(false);
  const [propertyType, setPropertyType] = useState("All");
  const [location, setLocation] = useState("");
  const [convenienceSearch, setConvenienceSearch] = useState("");
  const [sortby, setSortby] = useState("Popularity");

  const [toggleFilterMenu, setToggleFilterMenu] = useState(false);

  const properties = ["All", "PG", "Flat"];
  const sortByOptions = [
    "Popularity",
    "What's new",
    "Price - high to low",
    "Price - low to high",
    "Rating",
  ];

  const coordinates = [];
  pgs.map((pg) => coordinates.push(pg.location.coordinates));

  const propertyClick = (event) => {
    setPropertyType(event.target.value);
    setTogglePopDD(false);
  };

  const sortByClick = (event) => {
    setSortby(event.target.value);
    setToggleSortDD(false);
  };

  const badgeClick = (event) => {
    event.target.classList.toggle("badge-select");
  };

  return (
    <section className="flex">
      <div
        className={`${
          toggleFilterMenu ? "!inline-block" : "hidden"
        } hidden lg:!inline-block sidebar w-full lg:w-1/4 border-2 border-gray-200 border-opacity-60 rounded-lg border-t-0 transition-all transform duration-300 ease-in-out`}
      >
        <div className="sidebar-elements px-10 py-5">
          {/* filter & reset */}
          <div className="heading flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-semibold inline-flex">Filter</h1>
              <UilFilter className="mb-[0.7rem] hidden md:inline-flex text-gray-800 mx-2 transition-all duration-200 ease-out hover:-translate-y-[.5px] pointer-events-none" />
            </div>
            <span className="text-lg text-blue-600 cursor-pointer mt-3 transition-all duration-150 ease-out hover:text-blue-500 ">
              Reset
            </span>
            <UilTimes
              className="h-6 w-6 cursor-pointer text-sm lg:!hidden"
              onClick={() => {
                setToggleFilterMenu(false);
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
                    setToggleSortDD(!toggleSortDD);
                  }}
                >
                  <span className="ml-4">{sortby}</span>
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
                  toggleSortDD ? "block" : "hidden"
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
              <h2 className="filter-heading">Price (₹) </h2>
              <RangeSlider
                className="filter-element"
                initialMin={2500}
                initialMax={7500}
                minVal={0}
                maxVal={10000}
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
                      setTogglePopDD(!togglePopDD);
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
                    togglePopDD ? "block" : "hidden"
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
                <UilMapMarker className="inline-flex text-blue-700 rounded-full cursor-pointer mx-2 transition-all duration-200 ease-out hover:-translate-y-[.5px]" />
                <input
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                  type="text"
                  placeholder="Search Location"
                  className="pl-5 pr-16 bg-transparent outline-none flex-grow text-sm text-gray-600 placeholder-gray-400"
                />
              </div>
            </div>

            {/* conveniences */}
            <div className="conveniences-filter">
              <h2 className="filter-heading">Conveniences</h2>
              {/* search bar */}
              <div className="flex items-center md:border-2 rounded-full py-2  md:shadow-sm filter-element">
                <UilCheckCircle className="inline-flex text-blue-700 rounded-full cursor-pointer mx-2 transition-all duration-200 ease-out hover:-translate-y-[.5px]" />
                <input
                  value={convenienceSearch}
                  onChange={(e) => {
                    setConvenienceSearch(e.target.value);
                  }}
                  type="text"
                  placeholder="Search Convenience"
                  className="pl-5 pr-16 bg-transparent outline-none flex-grow text-sm text-gray-600 placeholder-gray-400"
                />
              </div>
              {/* badges */}
              <div className="badges filter-element w-full">
                <div className={`convenience-badge`} onClick={badgeClick}>
                  <UilWifi className="convenience-badge-icon" />
                  <span className="convenience-badge-text">Wi-Fi</span>
                </div>
                <div className={`convenience-badge`} onClick={badgeClick}>
                  <UilHouseUser className="convenience-badge-icon" />
                  <span className="convenience-badge-text">Balcony</span>
                </div>
                <div className={`convenience-badge`} onClick={badgeClick}>
                  <UilRestaurant className="convenience-badge-icon" />
                  <span className="convenience-badge-text">With Food</span>
                </div>
                <div className={`convenience-badge`} onClick={badgeClick}>
                  <UilWind className="convenience-badge-icon" />
                  <span className="convenience-badge-text">AC</span>
                </div>
                <div className={`convenience-badge`} onClick={badgeClick}>
                  <UilWater className="convenience-badge-icon" />
                  <span className="convenience-badge-text">Laundry</span>
                </div>
                <div className={`convenience-badge`} onClick={badgeClick}>
                  <UilCloudMoon className="convenience-badge-icon" />
                  <span className="convenience-badge-text">24/7</span>
                </div>
                <div className={`convenience-badge `} onClick={badgeClick}>
                  <UilToiletPaper className="convenience-badge-icon" />
                  <span className="convenience-badge-text">
                    Attached Washroom
                  </span>
                </div>
              </div>
            </div>

            {/* bed sharing */}
            <div className="bed-sharing">
              <h2 className="filter-heading">Bed Sharing</h2>
              {/* badges */}
              <div className="badges filter-element w-full">
                <div className={`convenience-badge`} onClick={badgeClick}>
                  <UilBed className="convenience-badge-icon" />
                  <span className="convenience-badge-text">Single</span>
                </div>
                <div className={`convenience-badge`} onClick={badgeClick}>
                  <UilBed className="convenience-badge-icon" />
                  <span className="convenience-badge-text">Double</span>
                </div>
                <div className={`convenience-badge`} onClick={badgeClick}>
                  <UilBed className="convenience-badge-icon" />
                  <span className="convenience-badge-text">Triple</span>
                </div>
                <div
                  className={`convenience-badge badge-select`}
                  onClick={badgeClick}
                >
                  <UilBed className="convenience-badge-icon" />
                  <span className="convenience-badge-text">Any</span>
                </div>
              </div>
            </div>
          </div>

          {/* apply button */}
          <div className="p-2 w-full mt-6">
            <button className="font-semibold bg-gray-700 w-full py-3 rounded-xl text-gray-100 transition-all duration-150 ease-out hover:bg-gray-800 active:bg-gray-800 hover:shadow-sm active:shadow-sm">
              Apply
            </button>
          </div>
        </div>
      </div>

      <div
        className={`content w-full ${
          toggleFilterMenu ? "hidden" : "inline-block"
        } lg:w-3/4 lg:px-16 px-6 py-4`}
      >
        {/* mobile view tabs */}
        <div className="lg:hidden mobile-view-tabs w-full">
          <div className="tabs w-full h-[6vh] fixed bottom-0 left-0 flex items-center justify-between">
            <div className="tab">
              <UilArrowsVAlt className="w-5 h-5 text-gray-700" />
              <span className="capitalize text-lg text-gray-700 font-semibold ml-3">
                SORT
              </span>
            </div>
            <div
              className="tab"
              onClick={() => {
                setToggleFilterMenu(!toggleFilterMenu);
              }}
            >
              <UilFilter className="w-5 h-5 text-gray-700" />
              <span className="capitalize text-lg text-gray-700 font-semibold ml-3">
                FILTER
              </span>
            </div>
          </div>
        </div>

        {/* real content - map & pgs */}
        <div className="content-text py-3 xs:py-6">
          <h1 className="text-3xl font-semibold leading-normal align-middle">
            16 Results
          </h1>
        </div>
        <div className="map">
          <Map className="h-full" coords={coordinates} />
        </div>
        <div className="listing mt-16 grid md:grid-cols-2 grid-cols-1">
          {pgs.map(({ slug, name, image, location, rentPerMonth }) => {
            return (
              <PGcard
                key={slug}
                name={name}
                image={image}
                location={location}
                rentPerMonth={rentPerMonth}
                slug={slug}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Explore;
