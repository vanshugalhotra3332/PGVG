import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  UilMapMarker,
  UilPlus,
  UilShareAlt,
  UilHeartAlt,
  UilBed,
  UilAngleRight,
  UilAngleDown,
  UilCheck,
} from "@iconscout/react-unicons";

import Image from "next/image";
import GalleryQuickView from "@/components/GalleryQuickView";

const Slug = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [showQuickView, setShowQuickView] = useState(false);
  const [showIncludedItem, setShowIncludedItem] = useState(true);
  const [showIncludedItem1, setShowIncludedItem1] = useState(false);

  return (
    <>
      {/* image gallery quick view */}
      {showQuickView && (
        <GalleryQuickView setShowQuickView={setShowQuickView} />
      )}
      <section className="xl:px-44 lg:px-24 px-5 md:px-20 sm:px-10 pt-4">
        {!showQuickView && (
          <div className="image-location">
            {/* location & last updated details */}
            <div className="basic-details flex flex-col sm:flex-row justify-between">
              <span className="py-2 location inline-flex items-center m-auto sm:m-0">
                <UilMapMarker className="h-6 w-6 text-gray-400 inline-block" />
                <span className="inline-block text-gray-400 pl-2">
                  B-604, Sector 15C, Chandigarh
                </span>
              </span>
              <span className="py-2 updated text-gray-400 text-sm mt-1 text-center">
                Last Updated: 23 March 2023
              </span>
            </div>

            {/* image gallery */}
            <div className="flex image-gallery my-2 rounded-lg">
              <div className="big-image relative md:h-[60.5vh] h-[40vh] md:w-3/4 w-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden cursor-pointer">
                <Image
                  src={"/assets/img/pgs/pg.webp"}
                  alt={""}
                  layout="fill"
                  className="transition-all duration-300 ease-in-out hover:scale-105"
                  style={{ objectFit: "cover" }}
                />

                {/* tap to see button visible on mobile */}
                <div
                  className="md:hidden tap-to-see h-full w-full relative flex justify-center items-center"
                  onClick={() => {
                    setShowQuickView(true);
                  }}
                >
                  <button className="bg-gray-100 py-2 px-3 rounded-md opacity-80 ">
                    Tap to see all images
                  </button>
                </div>
              </div>

              <div className="hidden md:inline-block small-images border-2 w-1/4 border-gray-200 border-opacity-60 rounded-lg">
                <div className="img1 relative h-[30vh] w-full border-b-2 border-gray-200 border-opacity-60 overflow-hidden cursor-pointer">
                  <Image
                    src={"/assets/img/pgs/pg1.avif"}
                    alt={""}
                    layout="fill"
                    style={{ objectFit: "cover" }}
                    className="transition-all duration-300 ease-in-out hover:scale-[1.02]"
                  />
                </div>

                {/* last image which contains see more div */}
                <div
                  className="img2 relative h-[30vh] w-full border-t-2 border-gray-200 border-opacity-60 overflow-hidden cursor-pointer"
                  onClick={() => {
                    setShowQuickView(!showQuickView);
                  }}
                >
                  <Image
                    src={"/assets/img/pgs/pg2.avif"}
                    alt={""}
                    layout="fill"
                    style={{ objectFit: "cover" }}
                    className="transition-all duration-300 ease-in-out hover:scale-[1.02]"
                  />
                  <div className="see-more relative flex flex-col justify-center items-center bg-gray-800/40 w-full h-full">
                    <div className="mr-2 up-icon">
                      <UilPlus className="h-8 w-8 font-semibold text-gray-100 " />
                    </div>
                    <span className="text-white text-2xl">3 more</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="pg-details my-4">
          <div className="name-price flex flex-col md:flex-row justify-between items-center">
            <div className="name inline-flex justify-center items-center">
              <span className="xs:text-2xl text-xl font-medium tracking-wider leading-relaxed text-gray-800">
                King Suite Rooms
              </span>
              <span className="mt-2">
                <span className="inline-block ml-4 up-icon">
                  <UilShareAlt className="h-4 w-4 xs:h-6 xs:w-6 text-gray-500" />
                </span>
                <span className="inline-block ml-3 up-icon">
                  <UilHeartAlt className="h-4 w-4 xs:h-6 xs:w-6 text-red-500" />
                </span>
              </span>
            </div>
            <div className="price align-middle">
              <span className="xs:text-2xl text-xl font-semibold text-gray-800 tracking-wider mb-2">
                ₹10,500<span className="xs:text-lg text-base">/Month</span>
              </span>
            </div>
          </div>
          <div className="mt-2 sharing-details flex flex-col md:flex-row justify-between items-center">
            <div className="sharing">
              <span className="xs:text-sm text-xs tracking-wider font-medium text-gray-700">
                Double Sharing{" "}
              </span>
              <span className="text-xs text-gray-500 font-medium ml-1">
                for
              </span>
              <span className="uppercase text-xs text-gray-100 bg-blue-500 py-1 px-2 rounded ml-2">
                boys
              </span>
            </div>
            <div className="">
              <span className="text-blue-500 text-sm tracking-wider cursor-pointer capitalize font-semibold">
                View Rooms
              </span>
            </div>
          </div>
          <div className="location-details my-8 inline-flex justify-between items-center">
            <div className="icon relative h-16 w-16 cursor-pointer">
              <Image
                src={"/assets/img/icons/loc.webp"}
                alt={"Map"}
                layout="fill"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="details px-8 space-y-1">
              <p className="text-gray-500 text-sm font-medium tracking-wider">
                Property Location
              </p>
              <p className="text-gray-800 text-sm font-semibold tracking-wider">
                15D, Sector 15, Chandigarh
              </p>
              <p className="text-blue-500 text-xs font-medium tracking-wider cursor-pointer">
                View On Map
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="hidden lg:flex items-center justify-between border-t-2 border-gray-200 border-opacity-60 sticky top-[80px] z-[900] bg-white shadow-md px-44">
        <div className="flex overflow-x-auto overflow-y-hidden whitespace-nowrap space-x-7">
          <button className="big-tab-button big-active-tab">overview</button>
          <button className="big-tab-button">rooms offered</button>
          <button className="big-tab-button">amenities</button>
          <button className="big-tab-button">rules</button>
          <button className="big-tab-button">explore neighbourhood</button>
        </div>
      </section>

      <section className="my-4 flex justify-between mx-44 relative gap-6">
        <div className="tabs-content w-[60%]">
          {/* overview div */}
          <div
            className="overview border-2 rounded-lg border-gray-200 border-opacity-60"
            id="overview"
          >
            <div className="title bg-white px-4 py-4 border-b-2 border-gray-200 border-opacity-60 ">
              <h2 className="text-xl text-gray-800 tracking-wide font-semibold">
                Overview
              </h2>
            </div>
            <div className="details pt-10 pb-6 px-8">
              <div className="py-2 grid grid-cols-2">
                <div className="info my-3">
                  <span className="text-sm tracking-widest font-semibold text-gray-500 leading-relaxed">
                    Meal Types
                  </span>
                  <p className="text-gray-800 text-base font-semibold tracking-widest">
                    Breakfast, Lunch, Dinner
                  </p>
                </div>
                <div className="info my-3">
                  <span className="text-sm tracking-widest font-semibold text-gray-500 leading-relaxed">
                    Meal Offerings
                  </span>
                  <p className="text-gray-800 text-base font-semibold tracking-widest">
                    Punjabi, South Indian, North Indian
                  </p>
                </div>
                <div className="info my-3">
                  <span className="text-sm tracking-widest font-semibold text-gray-500 leading-relaxed">
                    Total Beds
                  </span>
                  <p className="text-gray-800 text-base font-semibold tracking-widest">
                    4
                  </p>
                </div>
                <div className="info my-3">
                  <span className="text-sm tracking-widest font-semibold text-gray-500 leading-relaxed">
                    Notice Period
                  </span>
                  <p className="text-gray-800 text-base font-semibold tracking-widest">
                    30 days
                  </p>
                </div>
                <div className="info my-3">
                  <span className="text-sm tracking-widest font-semibold text-gray-500 leading-relaxed">
                    Lock in Period
                  </span>
                  <p className="text-gray-800 text-base font-semibold tracking-widest">
                    Zero lock in Period
                  </p>
                </div>
                <div className="info my-3">
                  <span className="text-sm tracking-widest font-semibold text-gray-500 leading-relaxed">
                    Power Backup
                  </span>
                  <p className="text-gray-800 text-base font-semibold tracking-widest">
                    No Backup
                  </p>
                </div>
              </div>
              <div className="managed-by inline-flex py-1 my-4 px-2 rounded-md items-center bg-gray-100">
                <div className="px-2 logo relative h-8 w-8 rounded-[50%]">
                  <Image
                    src={"/assets/img/others/user.jpg"}
                    alt={""}
                    layout="fill"
                    className="rounded-[50%]"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <span className="text-xs pl-3 font-semibold text-gray-800 tracking-tight leading-relaxed">
                  Property Managed By{" "}
                  <span className="cursor-pointer font-bold text-gray-900">
                    Vanshu Galhotra
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* rooms offered div */}
          <div className="rooms-offered border-2 rounded-lg border-gray-200 border-opacity-60">
            <div className="title bg-white px-4 py-4 border-b-2 border-gray-200 border-opacity-60 ">
              <h2 className="text-xl text-gray-800 tracking-wide font-semibold">
                Rooms Offered
              </h2>
            </div>
            <div className="sharing-option px-8 py-4">
              <div className="sharing">
                <div className="text-gray-600 inline-flex items-center justify-center">
                  <span>
                    <UilBed className="h-6 w-6" />
                  </span>
                  <span className="font-semibold tracking-wide text-sm ml-2">
                    Double Sharing
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
                  } price-details py-2 px-3 bg-gray-100/60`}
                >
                  <div className="price flex justify-between items-center">
                    <span className="text-gray-600 font-semibold uppercase text-sm tracking-tight leading-relaxed">
                      Option 1
                    </span>
                    <span className="text-gray-900 font-semibold text-xl tracking-wide leading-relaxed">
                      ₹10,500{" "}
                      <span className="text-sm text-gray-700">/bed</span>
                    </span>
                  </div>
                  <div className="deposit py-4 border-b-2 border-gray-200 border-opacity-80">
                    <span className="text-sm text-gray-500 tracking-wide capitalize leading-snug font-semibold">
                      One time security deposit :{" "}
                      <span className="text-base text-black">₹5,500</span>
                    </span>
                  </div>
                  <div className="included grid grid-cols-3">
                    <div className="included-item inline-flex items-center py-2 gap-2">
                      <span>
                        <UilCheck className="h-4 w-4 text-gray-500" />
                      </span>
                      <span className="text-gray-500 text-xs font-normal">
                        Independent Cupboard
                      </span>
                    </div>
                    <div className="included-item inline-flex items-center py-2 gap-2">
                      <span>
                        <UilCheck className="h-4 w-4 text-gray-500" />
                      </span>
                      <span className="text-gray-500 text-xs font-normal">
                        Table-Chair
                      </span>
                    </div>
                    <div className="included-item inline-flex items-center py-2 gap-2">
                      <span>
                        <UilCheck className="h-4 w-4 text-gray-500" />
                      </span>
                      <span className="text-gray-500 text-xs font-normal">
                        Wifi
                      </span>
                    </div>
                    <div className="included-item inline-flex items-center py-2 gap-2">
                      <span>
                        <UilCheck className="h-4 w-4 text-gray-500" />
                      </span>
                      <span className="text-gray-500 text-xs font-normal">
                        TV
                      </span>
                    </div>
                    <div className="included-item inline-flex items-center py-2 gap-2">
                      <span>
                        <UilCheck className="h-4 w-4 text-gray-500" />
                      </span>
                      <span className="text-gray-500 text-xs font-normal">
                        Meals Included
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sharing">
                <div className="text-gray-600 inline-flex items-center justify-center">
                  <span>
                    <UilBed className="h-6 w-6" />
                  </span>
                  <span className="font-semibold tracking-wide text-sm ml-2">
                    Single Sharing
                  </span>
                  <span className="ml-3 mt-1">
                    {showIncludedItem1 && (
                      <UilAngleDown
                        className="h-6 w-6 cursor-pointer"
                        onClick={() => {
                          setShowIncludedItem1(false);
                        }}
                      />
                    )}
                    {!showIncludedItem1 && (
                      <UilAngleRight
                        className="h-6 w-6 cursor-pointer"
                        onClick={() => {
                          setShowIncludedItem1(true);
                        }}
                      />
                    )}
                  </span>
                </div>
                <div
                  className={` ${
                    showIncludedItem1 ? "block" : "hidden"
                  } price-details py-2 px-3 bg-gray-100/60`}
                >
                  <div className="price flex justify-between items-center">
                    <span className="text-gray-600 font-semibold uppercase text-sm tracking-tight leading-relaxed">
                      Option 1
                    </span>
                    <span className="text-gray-900 font-semibold text-xl tracking-wide leading-relaxed">
                      ₹12,500{" "}
                      <span className="text-sm text-gray-700">/bed</span>
                    </span>
                  </div>
                  <div className="deposit py-4 border-b-2 border-gray-200 border-opacity-80">
                    <span className="text-sm text-gray-500 tracking-wide capitalize leading-snug font-semibold">
                      One time security deposit :{" "}
                      <span className="text-base text-black">₹7,500</span>
                    </span>
                  </div>
                  <div className="included grid grid-cols-3">
                    <div className="included-item inline-flex items-center py-2 gap-2">
                      <span>
                        <UilCheck className="h-4 w-4 text-gray-500" />
                      </span>
                      <span className="text-gray-500 text-xs font-normal">
                        Independent Cupboard
                      </span>
                    </div>
                    <div className="included-item inline-flex items-center py-2 gap-2">
                      <span>
                        <UilCheck className="h-4 w-4 text-gray-500" />
                      </span>
                      <span className="text-gray-500 text-xs font-normal">
                        Table-Chair
                      </span>
                    </div>
                    <div className="included-item inline-flex items-center py-2 gap-2">
                      <span>
                        <UilCheck className="h-4 w-4 text-gray-500" />
                      </span>
                      <span className="text-gray-500 text-xs font-normal">
                        Wifi
                      </span>
                    </div>
                    <div className="included-item inline-flex items-center py-2 gap-2">
                      <span>
                        <UilCheck className="h-4 w-4 text-gray-500" />
                      </span>
                      <span className="text-gray-500 text-xs font-normal">
                        TV
                      </span>
                    </div>
                    <div className="included-item inline-flex items-center py-2 gap-2">
                      <span>
                        <UilCheck className="h-4 w-4 text-gray-500" />
                      </span>
                      <span className="text-gray-500 text-xs font-normal">
                        Meals Included
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        
        <div className="reviews w-1/4 sticky top-[44px]"></div>
      </section>
    </>
  );
};

export default Slug;
