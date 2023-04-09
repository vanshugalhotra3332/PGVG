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
  UilWifi,
  UilRestaurant,
  UilToiletPaper,
  UilWind,
  UilWater,
  UilCloudMoon,
  UilArrowRight,
  UilBusAlt,
  UilUniversity,
  UilFilm,
  UilMedkit,
  UilTrees,
  UilShoppingCartAlt,
} from "@iconscout/react-unicons";

import Map from "@/components/Map";
import Image from "next/image";
import GalleryQuickView from "@/components/GalleryQuickView";
import ReviewCard from "@/components/Cards/ReviewCard";
import Link from "next/link";
import PGs from "@/models/PGs";
import mongoose from "mongoose";

const Slug = ({ pg }) => {
  const {
    rules,
    location,
    otherInfo,
    name,
    image,
    type,
    rentPerMonth,
    sharings,
    amenities,
    gender,
  } = pg;
  const [showQuickView, setShowQuickView] = useState(false);
  const [showIncludedItem, setShowIncludedItem] = useState(true);

  return (
    <>
      {/* image gallery quick view */}
      {showQuickView && (
        <GalleryQuickView setShowQuickView={setShowQuickView} />
      )}
      {/* image section */}
      <section className="xl:px-44 lg:px-24 px-5 md:px-20 sm:px-10 pt-4">
        {!showQuickView && (
          <div className="image-location">
            {/* location & last updated details */}
            <div className="basic-details flex flex-col sm:flex-row justify-between">
              <span className="py-2 location inline-flex items-center m-auto sm:m-0">
                <UilMapMarker className="h-6 w-6 text-gray-400 inline-block" />
                <span className="inline-block text-gray-400 pl-2">
                  {location.address}, {location.city}
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
                  src={image}
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
                {name}
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
                ₹{rentPerMonth}
                <span className="xs:text-lg text-base">/Month</span>
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
              <span
                className={`${
                  gender == "boys" ? "bg-blue-500" : "bg-pink-500"
                } uppercase text-xs text-gray-100  py-1 px-2 rounded ml-2`}
              >
                {gender}
              </span>
            </div>
            <div className="">
              <Link href={"#rooms"}>
                <span className="text-blue-500 text-sm tracking-wider cursor-pointer capitalize font-semibold">
                  View Rooms
                </span>
              </Link>
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

      {/* navigation tabs section             */}
      <section className="hidden lg:flex items-center justify-between border-t-2 border-gray-200 border-opacity-60 sticky top-[80px] z-[9000] bg-white shadow-md px-44">
        <div className="flex overflow-x-auto overflow-y-hidden whitespace-nowrap space-x-7">
          <Link href={"#overview"}>
            <button className="big-tab-button big-active-tab">overview</button>
          </Link>
          <Link href={"#rooms"}>
            <button className="big-tab-button">rooms offered</button>
          </Link>
          <Link href={"#amenities"}>
            <button className="big-tab-button">amenities</button>
          </Link>
          <Link href={"#rules"}>
            <button className="big-tab-button">rules</button>
          </Link>
          <Link href={"#explore-neighbourhood"}>
            <button className="big-tab-button">explore neighbourhood</button>
          </Link>
        </div>
      </section>

      {/* tabs content & reviews */}
      <section className="my-4 flex justify-between lg:mx-32 mx-8 relative gap-6">
        {/* tabs content */}
        <div className="tabs-content w-full">
          {/* overview div */}
          <div
            className="overview border-2 my-4 rounded-lg border-gray-200 border-opacity-60"
            id="overview"
          >
            <div className="title bg-white px-4 py-4 border-b-2 border-gray-200 border-opacity-60 ">
              <h2 className="text-xl text-gray-800 tracking-wide font-semibold">
                Overview
              </h2>
            </div>
            <div className="details lg:pt-10 pt-4 pb-6 lg:px-8 px-3">
              <div className="py-2 grid grid-cols-1 xs:grid-cols-2">
                <div className="overview-info">
                  <span className="">Meal Types</span>
                  <p className="">Breakfast, Lunch, Dinner</p>
                </div>
                <div className="overview-info">
                  <span className="">Meal Offerings</span>
                  <p className="">Punjabi, South Indian, North Indian</p>
                </div>
                <div className="overview-info">
                  <span className="">Total Beds</span>
                  <p className="">4</p>
                </div>
                <div className="overview-info">
                  <span className="">Notice Period</span>
                  <p className="">30 days</p>
                </div>
                <div className="overview-info">
                  <span className="">Lock In Period</span>
                  <p className="">Zero lock in period</p>
                </div>
                <div className="overview-info">
                  <span className="">Power Backup</span>
                  <p className="">No Backup</p>
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
          <div
            className="rooms-offered border-2 my-4 rounded-lg border-gray-200 border-opacity-60"
            id="rooms"
          >
            <div className="title bg-white px-4 py-4 border-b-2 border-gray-200 border-opacity-60 ">
              <h2 className="text-xl text-gray-800 tracking-wide font-semibold">
                Rooms Offered
              </h2>
            </div>
            <div className="sharing-option px-8 py-4">
              <div className="sharing py-4">
                <div className="text-gray-600 inline-flex items-center justify-center">
                  <span>
                    <UilBed className="h-6 w-6" />
                  </span>
                  <span className="font-semibold tracking-wide text-xs xs:text-sm ml-2">
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
                  } price-details py-2 px-1 xs:px-3 bg-gray-100/60`}
                >
                  <div className="price flex justify-between items-center">
                    <span className="text-gray-600 font-semibold uppercase text-xs xs:text-sm tracking-tight leading-relaxed">
                      Option 1
                    </span>
                    <span className="text-gray-900 font-semibold text-xs md:text-lg lg:text-xl tracking-wide leading-relaxed">
                      ₹10,500{" "}
                      <span className="text-xs xs:text-sm text-gray-700">
                        /bed
                      </span>
                    </span>
                  </div>
                  <div className="deposit py-4 border-b-2 border-gray-200 border-opacity-80">
                    <span className="text-xs xs:text-sm text-gray-500 tracking-wide capitalize leading-snug font-semibold">
                      One time security deposit :{" "}
                      <span className="text-xs md:text-base text-black">
                        ₹5,500
                      </span>
                    </span>
                  </div>
                  <div className="included grid lg:grid-cols-3 grid-cols-1 xs:grid-cols-2">
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

          {/* amenities */}
          <div
            className="amenities my-4 border-2 rounded-lg border-gray-200 border-opacity-60"
            id="amenities"
          >
            <div className="title bg-white px-4 py-4 border-b-2 border-gray-200 border-opacity-60 ">
              <h2 className="text-xl text-gray-800 tracking-wide font-semibold">
                Top Amenities
              </h2>
            </div>
            <div className="amen bg-gray-100/60 py-4 px-4 xs:px-8 lg:px-0 flex items-center flex-wrap">
              <div className="amen-item ">
                <div className="icon my-1">
                  <UilWifi className="h-6 w-6 text-gray-500" />
                </div>
                <span className="text-sm text-gray-500 font-normal capitalize">
                  Wi-fi
                </span>
              </div>
              <div className="amen-item ">
                <div className="icon my-1">
                  <UilWater className="h-6 w-6 text-gray-500" />
                </div>
                <span className="text-sm text-gray-500 font-normal capitalize">
                  Laundry
                </span>
              </div>
              <div className="amen-item ">
                <div className="icon my-1">
                  <UilRestaurant className="h-6 w-6 text-gray-500" />
                </div>
                <span className="text-sm text-gray-500 font-normal capitalize">
                  Food
                </span>
              </div>
              <div className="amen-item ">
                <div className="icon my-1">
                  <UilWind className="h-6 w-6 text-gray-500" />
                </div>
                <span className="text-sm text-gray-500 font-normal capitalize">
                  Air Conditioner
                </span>
              </div>
              <div className="amen-item ">
                <div className="icon my-1">
                  <UilCloudMoon className="h-6 w-6 text-gray-500" />
                </div>
                <span className="text-sm text-gray-500 font-normal capitalize">
                  24/7
                </span>
              </div>{" "}
              <div className="amen-item ">
                <div className="icon my-1">
                  <UilToiletPaper className="h-6 w-6 text-gray-500" />
                </div>
                <span className="text-sm text-gray-500 font-normal capitalize">
                  Attached Washrooms
                </span>
              </div>
            </div>
          </div>

          {/* rules  */}
          <div
            className="rules my-4 border-2 rounded-lg border-gray-200 border-opacity-60"
            id="rules"
          >
            <div className="title bg-white px-4 py-4 border-b-2 border-gray-200 border-opacity-60 ">
              <h2 className="text-xl text-gray-800 tracking-wide font-semibold">
                Rules
              </h2>
            </div>
            <div className="house-rules px-4 xs:px-8 py-4">
              <div className="rule my-2">
                <span>
                  <UilArrowRight className="h-6 w-6 text-green-500 inline-block" />
                </span>
                <span className="mx-2 text-gray-700 text-sm font-semibold leading-tight">
                  Non veg food is allowed
                </span>
              </div>
              <div className="rule my-2">
                <span>
                  <UilArrowRight className="h-6 w-6 text-green-500 inline-block" />
                </span>
                <span className="mx-2 text-gray-700 text-sm font-semibold leading-tight">
                  Visitors are allowed
                </span>
              </div>
              <div className="rule my-2">
                <span>
                  <UilArrowRight className="h-6 w-6 text-green-500 inline-block" />
                </span>
                <span className="mx-2 text-gray-700 text-sm font-semibold leading-tight">
                  Cooking Allowed
                </span>
              </div>
              <div className="rule my-2">
                <span>
                  <UilArrowRight className="h-6 w-6 text-red-500 inline-block" />
                </span>
                <span className="mx-2 text-gray-700 text-sm font-semibold leading-tight">
                  Guests of opposite gender are not allowed
                </span>
              </div>
              <div className="rule my-2">
                <span>
                  <UilArrowRight className="h-6 w-6 text-red-500 inline-block" />
                </span>
                <span className="mx-2 text-gray-700 text-sm font-semibold leading-tight">
                  Drinking Not Allowed
                </span>
              </div>
              <div className="rule my-2">
                <span>
                  <UilArrowRight className="h-6 w-6 text-red-500 inline-block" />
                </span>
                <span className="mx-2 text-gray-700 text-sm font-semibold leading-tight">
                  Smoking is not allowed
                </span>
              </div>
            </div>
          </div>

          {/* explore neighbourhood */}
          <div
            className="explore-neighbourhood my-4 border-2 rounded-lg border-gray-200 border-opacity-60"
            id="explore-neighbourhood"
          >
            <div className="title bg-white px-4 py-4 border-b-2 border-gray-200 border-opacity-60 ">
              <h2 className="text-xl text-gray-800 tracking-wide font-semibold">
                Explore Neighbourhood
              </h2>
            </div>
            <div className="map-div px-4 py-4">
              <div className="map">
                <Map className="h-full" coords={[[30.7521, 76.7757]]} />
              </div>
              <div className="explore my-4 pt-2 px-4 flex items-center flex-wrap justify-between">
                <div className="explore-item">
                  <div>
                    <UilBusAlt />
                  </div>
                  <span>Bus Stops</span>
                </div>
                <div className="explore-item">
                  <div>
                    <UilUniversity />
                  </div>
                  <span>Banks</span>
                </div>
                <div className="explore-item">
                  <div>
                    <UilFilm />
                  </div>
                  <span>Cinema</span>
                </div>
                <div className="explore-item">
                  <div>
                    <UilRestaurant />
                  </div>
                  <span>Food</span>
                </div>
                <div className="explore-item">
                  <div>
                    <UilMedkit />
                  </div>
                  <span>Medcare</span>
                </div>
                <div className="explore-item">
                  <div>
                    <UilTrees />
                  </div>
                  <span>Parks</span>
                </div>
                <div className="explore-item">
                  <div>
                    <UilShoppingCartAlt />
                  </div>
                  <span>Shopping</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* reviews */}
        <div className="hidden lg:block reviews mt-16 mx-8">
          <div className="title px-6">
            <h2 className="text-3xl font-semibold tracking-wider leading-snug">
              Reviews
            </h2>
          </div>
          <div className="review-cards">
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
          </div>
        </div>
      </section>

      {/* reviews mobile view */}
      <div className="lg:hidden block reviews mt-8 mx-12">
        <div className="title px-6">
          <h2 className="text-3xl font-semibold tracking-wider leading-snug">
            Reviews
          </h2>
        </div>
        <div className="review-cards">
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let pg = await PGs.findOne({ slug: context.query.slug });
  console.log(pg);

  return {
    props: {
      pg: JSON.parse(JSON.stringify(pg)),
    },
  };
}

export default Slug;
