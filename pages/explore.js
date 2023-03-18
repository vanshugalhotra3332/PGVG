import RangeSlider from "@/components/RangeSlider";
import React from "react";

const Explore = () => {
  return (
    <>
      <div className="sidebar h-[90vh] w-[24vw]">
        <div className="sidebar-elements px-10 py-5">
          {/* filter & reset */}
          <div className="heading flex justify-between items-center">
            <h1 className="text-3xl font-semibold inline-flex">Filters</h1>
            <span className="text-lg text-blue-600 cursor-pointer mt-3 transition-all duration-150 ease-out hover:text-blue-500">
              Reset
            </span>
          </div>

          <div className="mt-4 price-filter">
            <h2 className="text-lg font-semibold">Price (₹) </h2>
            <RangeSlider
              initialMin={2500}
              initialMax={7500}
              minVal={0}
              maxVal={10000}
              step={100}
              priceCap={1000}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Explore;
