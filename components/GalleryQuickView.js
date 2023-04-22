import React from "react";
import Carousel from "nuka-carousel/lib/carousel";
import GalleryImage from "./Cards/GalleryImage";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useSelector } from "react-redux";

const GalleryQuickView = ({ setShowQuickView }) => {
  const windowWidth = useSelector((state) => state.global.windowWidth);

  return (
    <>
      <div className="relative top-0 gallery-quick-view z-[100] bg-gray-100/10">
        <div
          className="cross absolute inline-flex items-center justify-center right-6 cursor-pointer transition-all duration-200 ease-out hover:-translate-y-[1px] bg-white rounded-full px-1 py-1 z-[1000] top-4"
          onClick={() => {
            setShowQuickView(false);
          }}
        >
          <CloseIcon className="h-6 w-6 inline-block text-gray-700 font-semibold" />
        </div>
        {/* image carousel */}
        <div className="image-carousel">
          <Carousel
            wrapAround={true}
            slidesToShow={`${windowWidth > 1100 ? 2 : 1}`}
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
                <KeyboardArrowLeftIcon className="h-10 w-10 text-gray-800 font-semibold" />
              </button>
            )}
            renderCenterRightControls={({ nextDisabled, nextSlide }) => (
              <button
                onClick={nextSlide}
                disabled={nextDisabled}
                className="w-10 bg-white rounded-full"
              >
                <KeyboardArrowRightIcon className="h-10 w-10 text-gray-800" />
              </button>
            )}
          >
            <GalleryImage img={"/assets/img/pgs/pg.webp"} />
            <GalleryImage img={"/assets/img/pgs/pg1.avif"} />
            <GalleryImage img={"/assets/img/pgs/pg2.avif"} />
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default GalleryQuickView;
