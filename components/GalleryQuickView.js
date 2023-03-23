import React from "react";
import {
  UilTimes,
  UilAngleLeftB,
  UilAngleRightB,
} from "@iconscout/react-unicons";
import Carousel from "nuka-carousel/lib/carousel";
import GalleryImage from "./Cards/GalleryImage";

const GalleryQuickView = ({ setShowQuickView }) => {
  return (
    <div className="relative top-0 gallery-quick-view z-[100] bg-gray-100/10">
      <div
        className="cross absolute right-6 md:top-4 top-7 cursor-pointer transition-all duration-200 ease-out hover:-translate-y-[1px]"
        onClick={() => {
          setShowQuickView(false);
        }}
      >
        <UilTimes className="h-8 w-8 text-gray-700 font-semibold" />
      </div>
      {/* topbar */}
      <div className="topbar md:px-40 px-4 py-10">
        <div className="title-button flex flex-col md:flex-row justify-between">
          <div className="title m-4">
            <span className="md:text-xl text-lg font-medium">
              3 RK Apartment in , Sector 15 for rent - Chandigarh
            </span>
          </div>
          <div className="contact-button m-auto md:m-0">
            <button className="bg-blue-500 cursor-pointer text-white md:text-base text-sm py-2 md:px-5 px-2 rounded-md hover:bg-blue-600 transition-all duration-200 ease-out">
              Contact Owner
            </button>
          </div>
        </div>
        <div className="hidden md:flex overflow-x-auto overflow-y-hidden border-b border-gray-200 whitespace-nowrap dark:border-gray-700 mt-3 space-x-7">
          <button className="tab-button active-tab">bedroom</button>
          <button className="tab-button">balcony</button>
          <button className="tab-button">bathroom</button>
          <button className="tab-button">others</button>
        </div>
      </div>
      {/* image carousel */}
      <div className="image-carousel">
        <Carousel
          wrapAround={true}
          slidesToShow={`${window.innerWidth > 1100 ? 2 : 1}`}
          adaptiveHeight={true}
          autoplay={false}
          autoplayInterval={2000}
          withoutControls={false}
          defaultControlsConfig={{
            pagingDotsStyle: {
              margin: "0 10px",
              display: "none",
            },
          }}
          renderCenterLeftControls={({ previousDisabled, previousSlide }) => (
            <button
              onClick={previousSlide}
              disabled={previousDisabled}
              className="w-10 bg-white rounded-full"
            >
              <UilAngleLeftB className="h-10 w-10 text-gray-800 font-semibold" />
            </button>
          )}
          renderCenterRightControls={({ nextDisabled, nextSlide }) => (
            <button
              onClick={nextSlide}
              disabled={nextDisabled}
              className="w-10 bg-white rounded-full"
            >
              <UilAngleRightB className="h-10 w-10 text-gray-800" />
            </button>
          )}
        >
          <GalleryImage img={"/assets/img/pgs/pg.webp"} />
          <GalleryImage img={"/assets/img/pgs/pg1.avif"} />
          <GalleryImage img={"/assets/img/pgs/pg2.avif"} />
        </Carousel>
      </div>
    </div>
  );
};

export default GalleryQuickView;
