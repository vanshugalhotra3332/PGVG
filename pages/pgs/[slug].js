import React, { useState } from "react";
import { useRouter } from "next/router";
import { UilMapMarker, UilPlus } from "@iconscout/react-unicons";
import Image from "next/image";
import GalleryQuickView from "@/components/GalleryQuickView";

const Slug = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [toggleQuickView, setToggleQuickView] = useState(false);

  return (
    <>
      {/* image gallery quick view */}
      {toggleQuickView && (
        <GalleryQuickView setToggleQuickView={setToggleQuickView} />
      )}
      <section className="px-44 h-[100vh] mb-3">
        {!toggleQuickView && (
          <div className="image-location">
            {/* location & last updated details */}
            <div className="basic-details flex justify-between">
              <span className="py-2 location inline-flex items-center">
                <UilMapMarker className="h-6 w-6 text-gray-400 inline-block" />
                <span className="inline-block text-gray-400 pl-2">
                  B-604, Sector 15C, Chandigarh
                </span>
              </span>
              <span className="py-2 updated text-gray-400 text-sm mt-1">
                Last Updated: 23 March 2023
              </span>
            </div>

            {/* image gallery */}
            <div className="flex image-gallery my-2 rounded-lg">
              <div className="big-image relative h-[60.5vh] w-3/4 border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden cursor-pointer">
                <Image
                  src={"/assets/img/pgs/pg.webp"}
                  alt={""}
                  layout="fill"
                  className="transition-all duration-300 ease-in-out hover:scale-105"
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div className="small-images border-2 w-1/4 border-gray-200 border-opacity-60 rounded-lg">
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
                    setToggleQuickView(!toggleQuickView);
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
                    <div className="mr-2 transition-all duration-200 ease-in-out hover:-translate-y-[1px]">
                      <UilPlus className="h-8 w-8 font-semibold text-gray-100 " />
                    </div>
                    <span className="text-white text-2xl">3 more</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Slug;
