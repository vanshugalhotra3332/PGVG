import React from "react";
import Image from "next/image";

const WhyChoose = ({ img, title, description }) => {
  return (
    <div className="rounded-xl border-2 border-white cursor-pointer xl:w-1/4 md:w-1/2 w-4/5 transition-all ease-out duration-150 hover:border-2 hover:border-blue-600 mx-3 active:border-blue-600 active:shadow-md">
      <div className="py-10 px-6">
        <div className="icon relative h-14">
          <Image src={img} alt={""} layout={"fill"} />
        </div>
        <div className="card-text p-3">
          <h1 className="text-xl font-semibold text-center p-2">{title}</h1>
          <p className="text-gray-500 text-center p-1">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;
