import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

// Icons import

import StarIcon from "@mui/icons-material/Star";
import RoomIcon from "@mui/icons-material/Room";

const PGcard = ({ slug, name, image, location, rentPerMonth }) => {
  const router = useRouter();

  return (
    <div className="p-4 w-full cursor-pointer transition-all duration-200 ease-out">
      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-2xl overflow-hidden ">
        <div className="relative h-[28vh] overflow-hidden">
          <Image
            className="lg:h-48 md:h-36 w-full object-cover object-center hover:scale-105 transition-all duration-300 ease-out -z-10"
            src={image}
            alt=""
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="details pt-8">
          <div className="rating-title">
            <div className="ml-5 rating-box bg-orange-50 px-3 py-2 rounded-lg inline-flex items-center">
              <StarIcon className="h-6 w-6 text-orange-400 inline-block" />
              <span className="inline-block ml-2 text-orange-400 text-lg">
                4.5 (380)
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

export default PGcard;
