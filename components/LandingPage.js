import React from "react";
import Image from "next/image";

const LandingPage = () => {
  return (
    <section className="flex-col justify-around items-center flex lg:flex-row">
      <div className="text lg:ml-28 lg:mt-16 flex items-center justify-center flex-col p-5">
        <h1 className="lg:text-5xl text-4xl font-semibold capitalize leading-normal">
          <span className="text-blue-500">Experience</span> home
          <br /> away from <span className="text-blue-500">Home</span>
        </h1>
        <p className="text-gray-500 text-2xl mt-3 text-center">
          Find your escape, stay with us
        </p>
        <div className="p-2 w-full mt-6 m-auto">
          <button className="flex mx-auto text-white bg-blue-400 border-0 py-4 px-10 focus:outline-none hover:bg-blue-600 rounded-full text-lg transition-all duration-100 ease-out active:bg-blue-600 hover:shadow-md active:shadow-md active:scale-105">
            Explore
          </button>
        </div>
      </div>
      <div className="image relative h-[70vh] lg:top-10 top-4 p-12 lg:p-0">
        <Image
          className="rounded-lg !relative"
          src={"/home.webp"}
          alt={"Home"}
          layout="fill"
          objectFit="cover"
        />
      </div>
    </section>
  );
};

export default LandingPage;
