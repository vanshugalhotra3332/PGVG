import React from "react";
import Image from "next/image";
import WhyChoose from "./Cards/WhyChoose";

const LandingPage = () => {
  return (
    <>
      <section className="flex-col justify-around items-center flex lg:flex-row">
        <div className="text lg:ml-28 lg:mt-16 flex items-center justify-center flex-col p-5 mt-8 cursor-pointer">
          <h1 className="lg:text-5xl text-4xl font-semibold capitalize lg:leading-normal leading-snug">
            <span className="text-blue-500">Experience</span> home
            <br /> away from <span className="text-blue-500">Home</span>
          </h1>
          <p className="text-gray-500 text-2xl mt-3 text-center">
            Find your escape, stay with us
          </p>
          <div className="p-2 w-full mt-6 m-auto">
            <button className="outline-none flex mx-auto text-blue-500 border-blue-500 border-[1px] py-2 px-12 focus:outline-none rounded-md full text-lg transition-all duration-200 ease-out active:shadow-md active:scale-105 hover:text-white hover:bg-blue-500 active:bg-blue-500 active:text-white font-semibold">
              Explore
            </button>
          </div>
        </div>
        <div className="image relative lg:h-[70vh] h-[50vh] lg:top-10 lg:p-0 p-4">
          <Image
            className="rounded-lg !relative"
            src={"/assets/img/background/home.webp"}
            alt={"Home"}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </section>

      <section className="mt-28 h-[40vh]">
        <div className="flex justify-center">
          <div className="heading">
            <div className="relative md:text-[2.8rem] font-normal text-3xl">
              Why book from PGVG?
            </div>
            <div className="scribble-shape relative h-6 before:content-start before:absolute before:h-8 before:w-auto before:bg-contain before:bg-center before:bg-no-repeat before:bg-[url('/assets/img/others/scribble_shape.svg')] before:top-1 before:left-0 before:right-0"></div>
          </div>
        </div>
        <div className="flex items-center justify-center md:mt-20 mt-6 md:px-14 flex-col md:flex-row">
          <WhyChoose
            src={"assets\\img\\icons\\thumbsup.svg"}
            title={"Hassle Free Booking"}
            description={"Book your hotel from our website without any hassle."}
          />
          <WhyChoose
            src={"assets\\img\\icons\\reviews.svg"}
            title={"28K Reviews"}
            description={"Book your hotel from our website without any hassle."}
          />
          <WhyChoose
            src={"assets\\img\\icons\\calendar.svg"}
            title={"Free Cancellation"}
            description={"Book your hotel from our website without any hassle."}
          />
          <WhyChoose
            src={"assets\\img\\icons\\support.svg"}
            title={"24/7 Support"}
            description={"Book your hotel from our website without any hassle."}
          />
        </div>
      </section>
    </>
  );
};

export default LandingPage;
