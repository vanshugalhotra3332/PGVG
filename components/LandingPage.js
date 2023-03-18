import React from "react";
import Image from "next/image";
import WhyChoose from "./Cards/WhyChoose";
import NearbyPG from "./Cards/NearbyPG";
import Testimonial from "./Cards/Testimonial";
import Carousel from "nuka-carousel/lib/carousel";
import { useRouter } from "next/router";

const LandingPage = () => {
  const router = useRouter();
  return (
    <>
      {/* image & text section */}
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
            <button
              className="outline-none flex mx-auto text-blue-500 border-blue-500 border-[1px] py-2 px-12 focus:outline-none rounded-md full text-lg transition-all duration-200 ease-out active:shadow-md active:scale-105 hover:text-white hover:bg-blue-500 active:bg-blue-500 active:text-white font-semibold"
              onClick={() => {
                router.push({
                  pathname: "/explore",
                });
              }}
            >
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
            style={{ objectFit: "cover" }}
          />
        </div>
      </section>

      {/* why choose us section */}
      <section className="lg:mt-28 md:mt-16 mt-8">
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
            img={"assets\\img\\icons\\thumbsup.svg"}
            title={"Hassle Free Booking"}
            description={"Book your hotel from our website without any hassle."}
          />
          <WhyChoose
            img={"assets\\img\\icons\\reviews.svg"}
            title={"28K Reviews"}
            description={"Book your hotel from our website without any hassle."}
          />
          <WhyChoose
            img={"assets\\img\\icons\\calendar.svg"}
            title={"Free Cancellation"}
            description={"Book your hotel from our website without any hassle."}
          />
          <WhyChoose
            img={"assets\\img\\icons\\support.svg"}
            title={"24/7 Support"}
            description={"Book your hotel from our website without any hassle."}
          />
        </div>
      </section>

      {/* nearby locations section */}
      <section className="mt-6">
        <div className="text-center heading md:text-[2.8rem] text-4xl leading-snug">
          <h1>
            Nearby <span className="text-blue-500">PG</span> Locations
          </h1>
        </div>
        <div className="nearby-pg-cards py-10 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 items-center justify-center lg:px-20 px-8 md:px-12">
          <NearbyPG
            img={"/assets/img/locations/sec15.jpg"}
            location={"Sector 15"}
          />
          <NearbyPG
            img={"/assets/img/locations/sec15.jpg"}
            location={"Sector 15"}
          />
          <NearbyPG
            img={"/assets/img/locations/sec15.jpg"}
            location={"Sector 15"}
          />
          <NearbyPG
            img={"/assets/img/locations/sec15.jpg"}
            location={"Sector 15"}
          />
        </div>
      </section>

      {/* testimonials section  */}
      <section className="mt-6 flex flex-col items-center">
        <div className="heading text-[2.8rem] leading-snug">
          <h1 className="relative before:content-start before:absolute before:top-[5px] before:-left-[30px] before:h-[56px] before:w-[56px] before:rounded-[50%] before:bg-orange-400 before:-z-10 before:inline-block before:cursor-pointer before:transition-all before:duration-200 before:ease-out after:content-start after:absolute after:w-[35px] after:h-[35px] after:bg-[url('/assets/img/icons/lines.svg')] after:bg-contain after:bg-no-repeat after:bg-center after:-top-[11px] after:-left-[50px]">
            Testimonials
          </h1>
        </div>
        {/* className="testimonials flex flex-col lg:flex-row justify-around items-center mt-14 lg:px-36 md:px-20 px-10 space-x-5" */}
        <div className="mt-16 w-2/3 flex items-center justify-center pl-24 md:pl-2">
          <Carousel
            wrapAround={true}
            slidesToShow={3}
            adaptiveHeight={true}
            autoplay={true}
            autoplayInterval={2000}
            withoutControls
          >
            <Testimonial img={"/assets/img/others/test.jpg"} />
            <Testimonial img={"/assets/img/others/test1.jpg"} />
            <Testimonial img={"/assets/img/others/user.jpg"} />
          </Carousel>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
