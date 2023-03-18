import React from "react";
import Image from "next/image";

const Testimonial = ({ img }) => {
  return (
    <div className="cursor-pointer transition-all ease-out duration-150 hover:border-blue-500 active:border-blue-500 p-1 w-full border-2 border-gray-200 border-opacity-60 rounded-xl overflow-hidden mx-3 my-3">
      <div className="h-full bg-white p-4 rounded-lg">
        <a className="inline-flex items-center relative">
          <Image
            alt="testimonial"
            src={img}
            className="!w-14 !h-14 !relative rounded-[50%] flex-shrink-0 object-cover object-center"
            layout="fill"
            style={{ objectFit: "cover" }}
          />
          <span className="flex-grow flex flex-col pl-4">
            <span className="title-font font-medium text-gray-900">
              Holden Caulfield
            </span>
            <span className="text-gray-500 text-sm">Chandigarh</span>
          </span>
        </a>
        <p className="leading-relaxed my-6 text-gray-600 text-sm max-w-full">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse a itaque
          nulla nesciunt iste deleniti eveniet quod atque illo molestias.
        </p>
      </div>
    </div>
  );
};

export default Testimonial;
