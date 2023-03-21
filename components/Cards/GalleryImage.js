import React from "react";
import Image from "next/image";

const GalleryImage = ({ img }) => {
  return (
    <div className="relative h-[70vh] w-[97%]">
      <Image src={img} alt={""} layout="fill" style={{ objectFit: "cover" }} unoptimized className="mx-96 rounded-lg"/>
    </div>
  );
};

export default GalleryImage;
