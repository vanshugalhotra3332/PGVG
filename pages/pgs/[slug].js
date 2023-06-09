import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";

// mongoose stuff
import mongoose from "mongoose";
import PGs from "@/models/PGs";

// components import
import ReviewCard from "@/components/Cards/ReviewCard";
import GalleryQuickView from "@/components/GalleryQuickView";
import Map from "@/components/Map";
import SharingDropDown from "@/components/SharingDropDown";
import Sidebar_Nav from "@/components/Sidebars/Sidebar_Nav";
import {
  AcBadge,
  AttachedWashroomBadge,
  BalconyBadge,
  LaundryBadge,
  TwentyFourSevenBadge,
  WifiBadge,
  WithFoodBadge,
} from "../../components/Badges";

// icons import
import RoomIcon from "@mui/icons-material/Room";
import AddIcon from "@mui/icons-material/Add";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import DirectionsBusFilledOutlinedIcon from "@mui/icons-material/DirectionsBusFilledOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import MovieFilterOutlinedIcon from "@mui/icons-material/MovieFilterOutlined";
import MedicationLiquidOutlinedIcon from "@mui/icons-material/MedicationLiquidOutlined";
import ForestOutlinedIcon from "@mui/icons-material/ForestOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

// slice imports
import { setCenter, setZoom } from "@/slices/mapSlice";
import {
  setNearbyBanks,
  setNearbyBusStops,
  setNearbyCinemas,
  setNearbyHospitals,
  setNearbyRestraunts,
  setNearbyParks,
  setNearbyShopping,
} from "@/slices/pgSlice";

const Slug = ({ pg }) => {
  const {
    rules,
    location,
    otherInfo,
    name,
    image,
    propertyType,
    rentPerMonth,
    sharings,
    amenities,
    gender,
  } = pg;

  const dispatch = useDispatch();

  // local states
  const [showQuickView, setShowQuickView] = useState(false);

  // redux states
  const isSideBarOpen = useSelector((state) => state.nav.isSideBarOpen);
  const sideBarOpenWidth = useSelector((state) => state.nav.sideBarOpenWidth);
  const sideBarCloseWidth = useSelector((state) => state.nav.sideBarCloseWidth);

  // local variables
  let marginLeft = isSideBarOpen ? sideBarOpenWidth : sideBarCloseWidth;
  const radius = 1000;
  const lat = location.coordinates[0];
  const long = location.coordinates[1];

  // react stuff
  useEffect(() => {
    dispatch(setCenter(pg.location.coordinates));
    dispatch(setZoom(16));

    // Cleanup function to reset state when leaving the page
    return () => {
      dispatch(setCenter([30.7109, 76.7603]));
      dispatch(setZoom(12));
      dispatch(setNearbyBusStops([]));
      dispatch(setNearbyBanks([]));
    };
  }, [dispatch, pg.location.coordinates]);

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // radius of Earth in meters
    const phi1 = (lat1 * Math.PI) / 180;
    const phi2 = (lat2 * Math.PI) / 180;
    const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
    const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
      Math.cos(phi1) *
        Math.cos(phi2) *
        Math.sin(deltaLambda / 2) *
        Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c;
    return Math.round(d);
  }

  function clearPreviousResults() {
    // clearing others
    dispatch(setNearbyBusStops([]));
    dispatch(setNearbyBanks([]));
    dispatch(setNearbyCinemas([]));
    dispatch(setNearbyRestraunts([]));
    dispatch(setNearbyHospitals([]));
    dispatch(setNearbyParks([]));
    dispatch(setNearbyShopping([]));
  }

  async function getNearbyThings(query) {
    const endpoint = `https://lz4.overpass-api.de/api/interpreter`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `data=${encodeURIComponent(query)}`,
    });
    const data = await response.json();
    return data.elements;
  }

  async function plotBusStops() {
    const query = `[out:json];node["highway"="bus_stop"](around:${radius},${lat},${long});out body;   
    >;
    out qt;`;
    const busStops = await getNearbyThings(query);

    let busStopsData = [];
    busStops.map((each) => {
      return busStopsData.push({
        coordinates: [each.lat, each.lon],
        name: each.tags.name ? each.tags.name : "",
        type: each.tags.highway,
        distanceAway: calculateDistance(lat, long, each.lat, each.lon),
      });
    });
    clearPreviousResults();
    dispatch(setNearbyBusStops(busStopsData));
  }
  async function plotBanks() {
    const query = `[out:json];
    (
      node["amenity"="bank"](around:${radius},${lat},${long});
      node["amenity"="atm"](around:${radius},${lat},${long});
    );
    out body;
    >;
    out qt;`;
    const banks = await getNearbyThings(query);

    let banksData = [];
    banks.map((each) => {
      return banksData.push({
        coordinates: [each.lat, each.lon],
        name: each.tags.name ? each.tags.name : "",
        type: each.tags.amenity,
        distanceAway: calculateDistance(lat, long, each.lat, each.lon),
      });
    });
    clearPreviousResults();
    dispatch(setNearbyBanks(banksData));
  }
  async function plotCinemas() {
    const query = `[out:json];
    (
      node["amenity"="cinema"](around:${radius},${lat},${long});
      way["amenity"="cinema"](around:${radius},${lat},${long});
    );
    out center;
    >;
    out skel qt;`;

    const cinemas = await getNearbyThings(query);

    let cinemasData = [];
    cinemas.map((each) => {
      if (each.tags && each.tags.name) {
        return cinemasData.push({
          coordinates: [
            each.lat ? each.lat : each.center.lat,
            each.lon ? each.lon : each.center.lon,
          ],
          name: each.tags ? each.tags.name : "",
          type: each.tags ? each.tags.amenity : "Cinema",
          distanceAway: calculateDistance(
            lat,
            long,
            each.lat ? each.lat : each.center.lat,
            each.lon ? each.lon : each.center.lon
          ),
        });
      }
    });
    clearPreviousResults();
    dispatch(setNearbyCinemas(cinemasData));
  }
  async function plotRestraunts() {
    const query = `[out:json];
    (
      node["amenity"="fast_food"](around:${radius},${lat},${long});
    );
    out body;
    >;
    out skel qt;`;

    const restraunts = await getNearbyThings(query);

    let restrauntsData = [];
    restraunts.map((each) => {
      return restrauntsData.push({
        coordinates: [each.lat, each.lon],
        name: each.tags.name ? each.tags.name : "",
        type: each.tags.amenity,
        distanceAway: calculateDistance(lat, long, each.lat, each.lon),
      });
    });
    clearPreviousResults();
    dispatch(setNearbyRestraunts(restrauntsData));
  }
  async function plotHospitals() {
    const query = `[out:json];
    (
      node["amenity"="clinic"](around:${radius},${lat},${long});
    );
    out body;
    >;
    out skel qt;`;

    const hospitals = await getNearbyThings(query);

    let hospitalsData = [];
    hospitals.map((each) => {
      return hospitalsData.push({
        coordinates: [each.lat, each.lon],
        name: each.tags.name ? each.tags.name : "",
        type: each.tags.amenity,
        distanceAway: calculateDistance(lat, long, each.lat, each.lon),
      });
    });
    clearPreviousResults();
    dispatch(setNearbyHospitals(hospitalsData));
  }
  async function plotParks() {
    const query = `[out:json];
    (
      node["leisure"="park"](around:${radius},${lat},${long});
      way["leisure"="park"](around:${radius},${lat},${long});
    );
    out center;
    >;
    out skel qt;`;

    const parks = await getNearbyThings(query);
    let parksData = [];
    parks.map((each) => {
      if (each.tags && each.tags.name) {
        return parksData.push({
          coordinates: [
            each.lat ? each.lat : each.center.lat,
            each.lon ? each.lon : each.center.lon,
          ],
          name: each.tags ? each.tags.name : "",
          type: each.tags ? each.tags.leisure : "Park",
          distanceAway: calculateDistance(
            lat,
            long,
            each.lat ? each.lat : each.center.lat,
            each.lon ? each.lon : each.center.lon
          ),
        });
      }
    });

    clearPreviousResults();
    dispatch(setNearbyParks(parksData));
  }
  async function plotShops() {
    const query = `[out:json];
    (
      node["shop"](around:${radius},${lat},${long});
    );
    out body;
    >;
    out skel qt;`;

    const shops = await getNearbyThings(query);

    let shopsData = [];
    shops.map((each) => {
      return shopsData.push({
        coordinates: [each.lat, each.lon],
        name: each.tags.name ? each.tags.name : "",
        type: each.tags.shop,
        distanceAway: calculateDistance(lat, long, each.lat, each.lon),
      });
    });
    clearPreviousResults();
    dispatch(setNearbyShopping(shopsData));
  }

  return (
    <div className="flex">
      <Sidebar_Nav />
      <div
        className={`pg-details overflow-y-auto overflow-x-hidden py-10`}
        style={{
          marginLeft: marginLeft,
          marginRight: sideBarCloseWidth,
        }}
      >
        {/* image gallery quick view */}
        {showQuickView && (
          <GalleryQuickView setShowQuickView={setShowQuickView} />
        )}
        {/* image section */}
        <section className="md:px-8 2xl:px-20">
          {!showQuickView && (
            <div className="image-location">
              {/* location & last updated details */}
              <div className="basic-details flex flex-col sm:flex-row justify-between">
                <span className="py-2 location inline-flex items-center m-auto sm:m-0">
                  <RoomIcon className="h-6 w-6 text-gray-400 inline-block" />
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
                    fill
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
                      fill
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
                      fill
                      style={{ objectFit: "cover" }}
                      className="transition-all duration-300 ease-in-out hover:scale-[1.02]"
                    />
                    <div className="see-more relative flex flex-col justify-center items-center bg-gray-800/40 w-full h-full">
                      <div className="mr-2 up-icon">
                        <AddIcon className="h-8 w-8 font-semibold text-gray-100 " />
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
                    <ShareOutlinedIcon className="h-4 w-4 xs:h-6 xs:w-6 text-gray-500" />
                  </span>
                  <span className="inline-block ml-3 up-icon">
                    <FavoriteBorderOutlinedIcon className="h-4 w-4 xs:h-6 xs:w-6 text-red-500" />
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
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="details px-8 space-y-1">
                <p className="text-gray-500 text-sm font-medium tracking-wider">
                  Property Location
                </p>
                <p className="text-gray-800 text-sm font-semibold tracking-wider">
                  {location.address}, {location.city}
                </p>
                <p className="text-blue-500 text-xs font-medium tracking-wider cursor-pointer">
                  View On Map
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* navigation tabs section             */}
        <section className="hidden lg:flex items-center justify-between border-t-2 border-gray-200 border-opacity-60 bg-white shadow-md px-44">
          <div className="flex overflow-x-auto overflow-y-hidden whitespace-nowrap space-x-7">
            <Link href={"#overview"}>
              <button className="big-tab-button big-active-tab">
                overview
              </button>
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
        <section className="my-4 flex justify-between md:mx-8 mx-2 relative gap-6">
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
                    <span className="">Meal propertyTypes</span>
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
                      fill
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
                {Object.keys(sharings).map((eachSharing) => {
                  return (
                    <SharingDropDown
                      key={eachSharing}
                      sharing={eachSharing}
                      sharingDetails={sharings[eachSharing]}
                    />
                  );
                })}
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
              <div className="amenities-items bg-gray-100/60 py-4 px-4 xs:px-8 lg:px-0 flex items-center flex-wrap">
                {/* <div className="amen-item convenience-badge">
                <div className="icon my-1">
                  <UilWifi className="h-6 w-6 text-gray-500" />
                </div>
                <span className="text-sm text-gray-500 font-normal capitalize">
                  Wi-fi
                </span>
              </div> */}

                {amenities.includes("wi-fi") && <WifiBadge />}
                {amenities.includes("balcony") && <BalconyBadge />}
                {amenities.includes("ac") && <AcBadge />}
                {amenities.includes("with-food") && <WithFoodBadge />}
                {amenities.includes("24/7") && <TwentyFourSevenBadge />}
                {amenities.includes("laundry") && <LaundryBadge />}
                {amenities.includes("attached washrooms") && (
                  <AttachedWashroomBadge />
                )}
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
                {rules.allowed.map((rule, index) => {
                  return (
                    <div className="rule my-2" key={index}>
                      <span>
                        <EastOutlinedIcon className="h-5 w-5 text-green-500 inline-block" />
                      </span>
                      <span className="mx-2 text-gray-700 text-sm font-semibold leading-tight">
                        {rule}
                      </span>
                    </div>
                  );
                })}
                {rules.notAllowed.map((rule, index) => {
                  return (
                    <div className="rule my-2" key={index}>
                      <span>
                        <EastOutlinedIcon className="h-5 w-5 text-red-500 inline-block" />
                      </span>
                      <span className="mx-2 text-gray-700 text-sm font-semibold leading-tight">
                        {rule}
                      </span>
                    </div>
                  );
                })}
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
                  <Map className="h-full" coordinate={location.coordinates} />
                </div>
                <div className="explore my-4 pt-2 px-4 flex items-center flex-wrap justify-between">
                  <div className="explore-item" onClick={plotBusStops}>
                    <div>
                      <DirectionsBusFilledOutlinedIcon />
                    </div>
                    <span>Bus Stops</span>
                  </div>
                  <div className="explore-item" onClick={plotBanks}>
                    <div>
                      <AccountBalanceOutlinedIcon />
                    </div>
                    <span>Banks</span>
                  </div>
                  <div className="explore-item" onClick={plotCinemas}>
                    <div>
                      <MovieFilterOutlinedIcon />
                    </div>
                    <span>Cinema</span>
                  </div>
                  <div className="explore-item" onClick={plotRestraunts}>
                    <div>
                      <RestaurantMenuOutlinedIcon />
                    </div>
                    <span>Food</span>
                  </div>
                  <div className="explore-item" onClick={plotHospitals}>
                    <div>
                      <MedicationLiquidOutlinedIcon />
                    </div>
                    <span>Medcare</span>
                  </div>
                  <div className="explore-item" onClick={plotParks}>
                    <div>
                      <ForestOutlinedIcon />
                    </div>
                    <span>Parks</span>
                  </div>
                  <div className="explore-item" onClick={plotShops}>
                    <div>
                      <ShoppingCartOutlinedIcon />
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
      </div>
    </div>
  );
};

// server side rendering
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let pg = await PGs.findOne({ slug: context.query.slug });
  return {
    props: {
      pg: JSON.parse(JSON.stringify(pg)),
    },
  };
}

export default Slug;
