import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// components import
import Map from "@/components/Map";
import PGcard, { PGCardSkeleton } from "@/components/Cards/PGcard";
import Sidebar_Filters from "@/components/Sidebars/Sidebar_Filters";
import Sidebar_Nav from "@/components/Sidebars/Sidebar_Nav";

// icons import
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ImportExportOutlinedIcon from "@mui/icons-material/ImportExportOutlined";

// slices import
import { setPGs } from "@/slices/pgSlice";
import { toggleFilterSideBar } from "@/slices/filterSlice";

// mongoose
import mongoose from "mongoose";
import PGs from "@/models/PGs";

const Explore = ({ PGS }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (PGS) {
      dispatch(setPGs(PGS));
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [dispatch, PGS]);

  // local variables

  // redux state
  const pgs = useSelector((state) => state.pgs.pgs);

  const showSideBar = useSelector((state) => state.filter.showSideBar);

  const isSideBarOpen = useSelector((state) => state.nav.isSideBarOpen);
  const sideBarOpenWidth = useSelector((state) => state.nav.sideBarOpenWidth);
  const sideBarCloseWidth = useSelector((state) => state.nav.sideBarCloseWidth);
  const openFilterSideBarWidth = useSelector(
    (state) => state.filter.openFilterSideBarWidth
  );
  const closeFilterSideBarWidth = useSelector(
    (state) => state.filter.closeFilterSideBarWidth
  );

  // local variables

  let marginForSideBar = isSideBarOpen ? sideBarOpenWidth : sideBarCloseWidth;
  let marginForFilterBar = showSideBar
    ? openFilterSideBarWidth
    : closeFilterSideBarWidth;

  let marginLeft =
    parseFloat(marginForSideBar) + parseFloat(marginForFilterBar);

  marginLeft += "vw";

  return (
    <section className="flex">
      <Sidebar_Filters />
      <Sidebar_Nav />
      {/* main content */}
      <div
        className={`content w-full overflow-y-auto overflow-x-hidden md:px-12 py-10`}
        style={{
          marginLeft: marginLeft,
          marginRight: sideBarCloseWidth,
        }}
      >
        {/* mobile view tabs */}
        <div className="lg:hidden mobile-view-tabs w-full">
          <div className="tabs w-full h-[6vh] fixed bottom-0 left-0 flex items-center justify-between">
            <div className="tab">
              <ImportExportOutlinedIcon className="w-7 h-7 text-gray-700" />
              <span className="capitalize text-lg text-gray-700 font-semibold ml-3">
                SORT
              </span>
            </div>
            <div
              className="tab"
              onClick={() => {
                dispatch(toggleFilterSideBar());
              }}
            >
              <FilterAltOutlinedIcon className="w-7 h-7 text-gray-700" />
              <span className="capitalize text-lg text-gray-700 font-semibold ml-3">
                FILTER
              </span>
            </div>
          </div>
        </div>

        {/* real content - map & pgs */}
        <div className="content-text py-3 xs:py-6">
          {pgs.length > 0 && (
            <h1 className="text-3xl font-semibold leading-normal">
              {pgs.length} Results
            </h1>
          )}
          {!pgs.length && (
            <h1 className="text-3xl font-semibold leading-normal">
              No Results Found
            </h1>
          )}
        </div>
        <div className="map">
          {pgs.length > 0 && <Map className="h-full" />}
        </div>
        <div
          className="listing mt-16 grid md:grid-cols-2 grid-cols-1"
          id="listings"
        >
          {pgs.length > 0 &&
            pgs.map(({ slug, name, image, location, rentPerMonth, gender }) => {
              if (!loading) {
                return (
                  <PGcard
                    key={slug}
                    name={name}
                    image={image}
                    location={location}
                    rentPerMonth={rentPerMonth}
                    slug={slug}
                    gender={gender}
                  />
                );
              } else {
                return <PGCardSkeleton key={slug} />;
              }
            })}
        </div>
      </div>
    </section>
  );
};

// server side rendering
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  const pgs = await PGs.find({});

  return {
    props: {
      PGS: JSON.parse(JSON.stringify(pgs)),
    },
  };
}

export default Explore;
