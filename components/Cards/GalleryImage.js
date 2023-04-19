import React from "react";
import Image from "next/image";

const GalleryImage = ({ img }) => {
  return (
    <div className="relative lg:h-[70vh] md:h-[55vh] h-[40vh] w-[97%]">
      <Image src={img} alt={""} fill style={{ objectFit: "cover" }} unoptimized className="lg:mx-96 md:mx-5 rounded-lg"/>
    </div>
  );
};

export default GalleryImage;
