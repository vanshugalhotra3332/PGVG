import React from "react";
import Image from "next/image";

const ReviewCard = () => {
  return (
    <section className="rounded-t-3xl overflow-hidden my-6">
      <div className="container mx-auto">
        <div className="mb-2 shadow-md rounded-3xl overflow-hidden">
          <div className="pt-3 pb-3 md:pb-1 px-4 md:pr-8 bg-gray-100/80">
            <div className="flex flex-wrap items-center">
              <div className="img mr-4 py-2 px-2 bg-gray-100 rounded-2xl">
                <div className="icon relative h-12 w-12">
                  <Image
                    src={"/assets/img/others/eazy.jpg"}
                    alt={""}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-full"
                  />
                </div>
              </div>
              <h4 className="w-auto text-xl font-heading font-medium">
                Eazy E
              </h4>
              <div className="w-full md:w-px h-2 md:h-8 mx-8 bg-transparent md:bg-gray-200"></div>
              <span className="mr-4 text-xl font-heading font-medium">5.0</span>
              <div className="inline-flex">
                <a className="inline-block mr-1" href="#">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 7.91677H12.4167L10 0.416763L7.58333 7.91677H0L6.18335 12.3168L3.81668 19.5834L10 15.0834L16.1834 19.5834L13.8167 12.3168L20 7.91677Z"
                      fill="#FFCB00"
                    ></path>
                  </svg>
                </a>
                <a className="inline-block mr-1" href="#">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 7.91677H12.4167L10 0.416763L7.58333 7.91677H0L6.18335 12.3168L3.81668 19.5834L10 15.0834L16.1834 19.5834L13.8167 12.3168L20 7.91677Z"
                      fill="#FFCB00"
                    ></path>
                  </svg>
                </a>
                <a className="inline-block mr-1" href="#">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 7.91677H12.4167L10 0.416763L7.58333 7.91677H0L6.18335 12.3168L3.81668 19.5834L10 15.0834L16.1834 19.5834L13.8167 12.3168L20 7.91677Z"
                      fill="#FFCB00"
                    ></path>
                  </svg>
                </a>
                <a className="inline-block mr-1" href="#">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 7.91677H12.4167L10 0.416763L7.58333 7.91677H0L6.18335 12.3168L3.81668 19.5834L10 15.0834L16.1834 19.5834L13.8167 12.3168L20 7.91677Z"
                      fill="#FFCB00"
                    ></path>
                  </svg>
                </a>
                <a className="inline-block text-gray-200" href="#">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 7.91677H12.4167L10 0.416763L7.58333 7.91677H0L6.18335 12.3168L3.81668 19.5834L10 15.0834L16.1834 19.5834L13.8167 12.3168L20 7.91677Z"
                      fill="#FFCB00"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="px-4 overflow-hidden md:px-6 pt-4 pb-4 bg-white">
            <div className="flex flex-wrap">
              <div className="w-full md:w-2/3 mb-6 md:mb-0">
                <p className="mb-2 md:mb-6 max-w-2xl text-gray-900 text-sm font-semibold tracking-wide leading-loose">
                  I haretra neque non mi aliquam, finibus hart bibendum
                  molestie. Vestibulum suscipit sagittis dignissim mauris.
                </p>
              </div>
              <div className="w-full md:w-1/3 text-right">
                <p className="mb-2 md:mb-6 text-xs text-gray-400">Added 2 months ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewCard;
