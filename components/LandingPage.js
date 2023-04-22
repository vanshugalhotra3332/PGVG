import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

// component imports

import WhyChoose from "./Cards/WhyChoose";
import Testimonial from "./Cards/Testimonial";
import Carousel from "nuka-carousel/lib/carousel";
import Sidebar_Nav from "./Sidebars/Sidebar_Nav";
import PGcard from "./Cards/PGcard";

const LandingPage = () => {
  const router = useRouter();

  // redux
  const isSideBarOpen = useSelector((state) => state.nav.isSideBarOpen);
  const sideBarOpenWidth = useSelector((state) => state.nav.sideBarOpenWidth);
  const sideBarCloseWidth = useSelector((state) => state.nav.sideBarCloseWidth);

  let marginLeft = isSideBarOpen ? sideBarOpenWidth : sideBarCloseWidth;

  return (
    <div className="flex">
      <Sidebar_Nav />
      <div
        className={`landing overflow-y-auto overflow-x-hidden`}
        style={{
          marginLeft: marginLeft,
        }}
      >
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
                className="btn-primary"
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
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </section>

        {/* why choose us section */}
        <section className="lg:mt-28 md:mt-16 mt-8">
          <div className="flex justify-center">
            <div className="heading">
              <div className="relative md:text-[2.8rem] font-normal xs:text-3xl text-2xl">
                Why book from PGVG?
              </div>
              <div className="scribble-shape relative h-6 before:content-start before:absolute before:h-8 before:w-auto before:bg-contain before:bg-center before:bg-no-repeat before:bg-[url('/assets/img/others/scribble_shape.svg')] before:top-1 before:left-0 before:right-0"></div>
            </div>
          </div>
          <div className="flex items-center justify-center md:mt-20 mt-6 px-2 flex-col md:flex-row">
            <WhyChoose
              img={"assets\\img\\icons\\thumbsup.svg"}
              title={"Hassle Free Booking"}
              description={
                "Book your hotel from our website without any hassle."
              }
            />
            <WhyChoose
              img={"assets\\img\\icons\\reviews.svg"}
              title={"28K Reviews"}
              description={
                "Book your hotel from our website without any hassle."
              }
            />
            <WhyChoose
              img={"assets\\img\\icons\\calendar.svg"}
              title={"Free Cancellation"}
              description={
                "Book your hotel from our website without any hassle."
              }
            />
            <WhyChoose
              img={"assets\\img\\icons\\support.svg"}
              title={"24/7 Support"}
              description={
                "Book your hotel from our website without any hassle."
              }
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
          <div className="nearby-pg-cards py-10 grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 xs:grid-cols-2 grid-cols-1 items-center justify-center lg:px-20 px-8 md:px-8">
            <PGcard
              slug={"eazyrooms"}
              image={"/assets/img/locations/sec15.jpg"}
              name={"Eazy Rooms"}
              location={{
                coordinates: [30.76642, 76.77602],
                address: "B52, Sector 15D",
                city: "Chandigarh",
                state: "Chandigarh",
                country: "India",
                postalCode: "160015",
              }}
              rentPerMonth={6000}
            />
            <PGcard
              slug={"eazyrooms"}
              image={"/assets/img/locations/sec15.jpg"}
              name={"Eazy Rooms"}
              location={{
                coordinates: [30.76642, 76.77602],
                address: "B52, Sector 15D",
                city: "Chandigarh",
                state: "Chandigarh",
                country: "India",
                postalCode: "160015",
              }}
              rentPerMonth={6000}
            />
            <PGcard
              slug={"eazyrooms"}
              image={"/assets/img/locations/sec15.jpg"}
              name={"Eazy Rooms"}
              location={{
                coordinates: [30.76642, 76.77602],
                address: "B52, Sector 15D",
                city: "Chandigarh",
                state: "Chandigarh",
                country: "India",
                postalCode: "160015",
              }}
              rentPerMonth={6000}
            />
            <PGcard
              slug={"eazyrooms"}
              image={"/assets/img/locations/sec15.jpg"}
              name={"Eazy Rooms"}
              location={{
                coordinates: [30.76642, 76.77602],
                address: "B52, Sector 15D",
                city: "Chandigarh",
                state: "Chandigarh",
                country: "India",
                postalCode: "160015",
              }}
              rentPerMonth={6000}
            />
          </div>
        </section>

        {/* testimonials section  */}
        <section className="mt-6 flex flex-col items-center">
          <div className="heading xs:text-[2.8rem] text-4xl leading-snug">
            <h1 className="relative before:content-start before:absolute before:top-[5px] xs:before:-left-[30px] before:-left-[27px] xs:before:h-[56px] xs:before:w-[56px] before:w-[46px] before:h-[46px] before:rounded-[50%] before:bg-orange-400 before:-z-10 before:inline-block before:cursor-pointer before:transition-all before:duration-200 before:ease-out after:content-start after:absolute after:w-[35px] after:h-[35px] after:bg-[url('/assets/img/icons/lines.svg')] after:bg-contain after:bg-no-repeat after:bg-center after:-top-[11px] xs:after:-left-[50px] after:-left-[39px]">
              Testimonials
            </h1>
          </div>
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
      </div>
    </div>
  );
};

export default LandingPage;
