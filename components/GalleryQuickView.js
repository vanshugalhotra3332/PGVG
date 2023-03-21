import React from "react";
import {
  UilTimes,
  UilAngleLeftB,
  UilAngleRightB,
} from "@iconscout/react-unicons";
import Carousel from "nuka-carousel/lib/carousel";
import GalleryImage from "./Cards/GalleryImage";

const GalleryQuickView = ({ setToggleQuickView }) => {
  return (
    <div className="relative top-0 gallery-quick-view z-[100] bg-gray-100/10">
      <div
        className="cross absolute right-6 top-4 cursor-pointer transition-all duration-200 ease-out hover:-translate-y-[1px]"
        onClick={() => {
          setToggleQuickView(false);
        }}
      >
        <UilTimes className="h-8 w-8 text-gray-700 font-semibold" />
      </div>
      <div className="topbar px-40 py-7">
        <div className="title-button flex justify-between">
          <div className="title mt-2">
            <span className="text-lg font-medium">
              3 RK Apartment in , Sector 15 for rent - Chandigarh |
            </span>
          </div>
          <div className="contact-button">
            <button className="bg-blue-500 cursor-pointer text-white text-base py-2 px-5 rounded-md hover:bg-blue-600 transition-all duration-200 ease-out">
              Contact Owner
            </button>
          </div>
        </div>
        <div className="flex overflow-x-auto overflow-y-hidden border-b border-gray-200 whitespace-nowrap dark:border-gray-700 mt-3 space-x-7">
          <button className="tab-button active-tab">bedroom</button>
          <button className="tab-button">balcony</button>
          <button className="tab-button">bathroom</button>
          <button className="tab-button">others</button>
        </div>
      </div>
      <div className="image-carousel">
        <Carousel
          wrapAround={true}
          slidesToShow={2}
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
