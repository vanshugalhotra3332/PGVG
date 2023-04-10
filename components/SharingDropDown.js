import React, { useState } from "react";

import {
  UilBed,
  UilAngleRight,
  UilAngleDown,
  UilCheck,
} from "@iconscout/react-unicons";

const SharingDropDown = ({ sharing, sharingDetails }) => {
  const [showIncludedItem, setShowIncludedItem] = useState(true);
  return (
    <div className="sharing py-4">
      <div className="text-gray-600 inline-flex items-center justify-center">
        <span>
          <UilBed className="h-6 w-6" />
        </span>
        <span className="font-semibold tracking-wide text-xs xs:text-sm ml-2">
          {sharing} Sharing
        </span>
        <span className="ml-3 mt-1">
          {showIncludedItem && (
            <UilAngleDown
              className="h-6 w-6 cursor-pointer"
              onClick={() => {
                setShowIncludedItem(false);
              }}
            />
          )}
          {!showIncludedItem && (
            <UilAngleRight
              className="h-6 w-6 cursor-pointer"
              onClick={() => {
                setShowIncludedItem(true);
              }}
            />
          )}
        </span>
      </div>
      <div
        className={` ${
          showIncludedItem ? "block" : "hidden"
        } price-details py-2 px-1 xs:px-3 bg-gray-100/60`}
      >
        <div className="price flex justify-between items-center">
          <span className="text-gray-600 font-semibold uppercase text-xs xs:text-sm tracking-tight leading-relaxed">
            Option 1
          </span>
          <span className="text-gray-900 font-semibold text-xs md:text-lg lg:text-xl tracking-wide leading-relaxed">
            ₹{sharingDetails.rentPerMonth}
            <span className="text-xs xs:text-sm text-gray-700">/bed</span>
          </span>
        </div>
        <div className="deposit py-4 border-b-2 border-gray-200 border-opacity-80">
          <span className="text-xs xs:text-sm text-gray-500 tracking-wide capitalize leading-snug font-semibold">
            One time security deposit :{" "}
            <span className="text-xs md:text-base text-black">
              ₹{sharingDetails.security}
            </span>
          </span>
        </div>
        <div className="included grid lg:grid-cols-3 grid-cols-1 xs:grid-cols-2">
          {sharingDetails.includes.map((item, index) => {
            return (
              <div
                key={index}
                className="included-item inline-flex items-center py-2 gap-2"
              >
                <span>
                  <UilCheck className="h-4 w-4 text-gray-500" />
                </span>
                <span className="text-gray-500 text-xs font-normal">
                  {item}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SharingDropDown;
