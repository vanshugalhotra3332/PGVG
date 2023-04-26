import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// components import
import Map from "@/components/Map";
import PGcard from "@/components/Cards/PGcard";
import Sidebar_Filters from "@/components/Sidebars/Sidebar_Filters";
import Sidebar_Nav from "@/components/Sidebars/Sidebar_Nav";

// icons import
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ImportExportOutlinedIcon from "@mui/icons-material/ImportExportOutlined";

// slices import
import { setPGs } from "@/slices/pgSlice";
import { toggleFilterSideBar } from "@/slices/filterSlice";
import { fetchData } from "@/db/dbFuncs";

const Explore = () => {
  const dispatch = useDispatch();

  // REACT STUFF
  useEffect(() => {
    async function getPGs() {
      const api = "http://localhost:3000/api/pg/getpgs";
      const pgs = await fetchData(api);
      dispatch(setPGs(pgs.pgs));
    }
    getPGs();
  }, [dispatch]);

  // local variables
  let coords = [];

  // redux state
  const pgs = useSelector((state) => state.pgs.pgs);
  pgs.map((pg) => coords.push(pg.location.coordinates));

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
          {pgs.length > 0 && <Map className="h-full" coords={coords} />}
        </div>
        <div
          className="listing mt-16 grid md:grid-cols-2 grid-cols-1"
          id="listings"
        >
          {pgs.length > 0 &&
            pgs.map(({ slug, name, image, location, rentPerMonth }) => {
              return (
                <PGcard
                  key={slug}
                  name={name}
                  image={image}
                  location={location}
                  rentPerMonth={rentPerMonth}
                  slug={slug}
                />
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Explore;
