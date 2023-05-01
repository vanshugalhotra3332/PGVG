import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

// Icons import

import RoomIcon from "@mui/icons-material/Room";

const PGcard = ({ slug, name, image, location, rentPerMonth, gender }) => {
  const router = useRouter();

  return (
    <div className="p-4 w-full cursor-pointer transition-all duration-200 ease-out">
      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-2xl overflow-hidden ">
        <div
          className="relative h-[28vh] overflow-hidden"
          onClick={() => {
            router.push(`/pgs/${slug}`);
          }}
        >
          <Image
            className="lg:h-48 md:h-36 w-full object-cover object-center hover:scale-105 transition-all duration-300 ease-out -z-10"
            src={image}
            alt=""
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="details pt-8">
          <div className="title">
            <div className="px-4 py-2">
              <span
                className={`${
                  gender == "boys" ? "bg-blue-500" : "bg-pink-500"
                } uppercase text-lg text-gray-100  py-1 px-2 rounded ml-2`}
              >
                {gender}
              </span>
            </div>
            <div className="pg-title py-2 px-6">
              <h2 className="text-2xl font-medium text-gray-800">{name}</h2>
              <span className="py-2 inline-flex items-center">
                <RoomIcon className="h-6 w-6 text-gray-400 inline-block" />
                <span className="inline-block text-gray-400 pl-2">
                  {location.address}, {location.city}
                </span>
              </span>
            </div>
          </div>
          <div className="price-details py-4 flex flex-col xs:flex-row justify-between items-center px-5 border-t-2 border-gray-200 border-opacity-60 rounded-xl">
            <div className="price py-1">
              <h2 className="text-lg xs:text-xl md:text-2xl text-blue-500 font-bold inline-block">
                ₹{rentPerMonth}
              </h2>
              <span className="text-base xs:text-lg md:text-xl text-blue-500 capitalize relative top-2 left-1">
                /month
              </span>
            </div>
            <button
              className="my-4 xs:ml-2 outline-none inline-flex hover:text-blue-500 hover:border-blue-500 border-[1px] py-2 px-7 focus:outline-none rounded-md text-sm xs:text-base md:text-lg transition-all duration-300 ease-out active:shadow-md active:scale-105 hover:bg-white text-white bg-blue-500 active:bg-white active:text-blue-500 font-semibold"
              onClick={() => {
                router.push(`/pgs/${slug}`);
              }}
            >
              See Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PGCardSkeleton = () => {
  return (
    <div className="p-4 w-full cursor-pointer transition-all duration-200 ease-out">
      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-2xl overflow-hidden">
        <div className="relative h-[28vh] overflow-hidden -z-10">
          <div className="animate-pulse bg-gray-200 rounded-xl w-full h-full"></div>
        </div>
        <div className="details pt-8 py-2">
          <div className="title animate-pulse px-6 py-6">
            <div className="h-7 bg-gray-200 rounded-full dark:bg-gray-700 w-1/4 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
          <div className="price-details py-6 flex flex-col xs:flex-row justify-between items-center px-5 border-t-2 border-gray-200 border-opacity-60 rounded-xl">
            <div className="animate-pulse bg-gray-200 rounded-full h-8 w-full mt-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PGcard;
