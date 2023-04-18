import React, { useState, useEffect } from "react";
import Map from "@/components/Map";

import { UilFilter, UilArrowsVAlt } from "@iconscout/react-unicons";
import PGcard from "@/components/Cards/PGcard";
import Sidebar_Filters from "@/components/Sidebars/Sidebar_Filters";

import { useSelector, useDispatch } from "react-redux";
import { setPGs } from "@/slices/pgSlice";
import { toggleSideBar } from "@/slices/filterSlice";

const Explore = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function getPGs() {
      try {
        const response = await fetch("http://localhost:3000/api/getpgs");
        const pgs = await response.json();
        dispatch(setPGs(pgs.pgs));
      } catch (error) {
        console.log(error);
      }
    }
    getPGs();
  }, []);
  const pgs = useSelector((state) => state.pgs.pgs);

  const showSideBar = useSelector((state) => state.filter.showSideBar);

  return (
    <section className="flex">
      <Sidebar_Filters />
      {/* main content */}
      <div
        className={`content w-full ${
          showSideBar ? "hidden" : "inline-block"
        } lg:w-3/4 lg:px-12 px-6 py-4 overflow-y-auto flex-grow lg:ml-[25vw]`}
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
                dispatch(toggleSideBar());
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
          {pgs.length > 0 && (
            <h1 className="text-3xl font-semibold leading-normal">
              {pgs.length} Results
            </h1>
          )}
          {!pgs.length && (
            <h1 className="text-3xl font-semibold leading-normal">
              No Results Found
            </h1>
          )}
        </div>
        <div className="map">{pgs.length > 0 && <Map className="h-full" />}</div>
        <div className="listing mt-16 grid md:grid-cols-2 grid-cols-1">
          {pgs.length > 0 &&
            pgs.map(({ slug, name, image, location, rentPerMonth }) => {
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
