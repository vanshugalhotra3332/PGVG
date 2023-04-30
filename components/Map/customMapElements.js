import L from "leaflet";
import { Marker, Popup } from "react-leaflet";
import { useMemo, useRef } from "react";
import Image from "next/image";

const markerIcon = ({ iconUrl }) => {
  return L.icon({
    iconUrl: iconUrl,
    iconSize: [48, 48],
    iconAnchor: [24, 48],
    popupAnchor: [1, -34],
    tooltipAnchor: [24, -28],
    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
  });
};

export const homeIcon = markerIcon({
  iconUrl: "/assets/img/icons/homeMarker.svg",
});
export const bankIcon = markerIcon({
  iconUrl: "/assets/img/icons/bankMarker.png",
});
export const busIcon = markerIcon({
  iconUrl: "/assets/img/icons/busMarker.png",
});
export const cinemaIcon = markerIcon({
  iconUrl: "/assets/img/icons/cinemaMarker.png",
});
export const foodIcon = markerIcon({
  iconUrl: "/assets/img/icons/foodMarker.png",
});
export const hospitalIcon = markerIcon({
  iconUrl: "/assets/img/icons/hospitalMarker.png",
});
export const parkIcon = markerIcon({
  iconUrl: "/assets/img/icons/parkMarker.png",
});

export const shoppingIcon = markerIcon({
  iconUrl: "/assets/img/icons/shoppingMarker.png",
});

export const redIcon = new L.Icon({
  iconUrl:
    "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  shadowAnchor: [12, 41],
});

export const ImageMarkerPopup = ({ pg }) => {
  return (
    <div className="flex flex-col lg:w-[300px] md:w-[250px] w-[200px] p-2 bg-white rounded-md">
      <div className="relative w-full h-40 overflow-hidden rounded-t-md">
        <Image
          src={pg.image}
          alt={`${pg.name} image`}
          layout="fill"
          objectFit="cover"
          className="rounded-t-md"
        />
        <span
          className={`absolute top-2 left-2 ${
            pg.gender === "boys" ? "bg-blue-500" : "bg-pink-500"
          } text-white px-2 py-1 rounded-md text-sm font-medium uppercase`}
        >
          {pg.gender}
        </span>
      </div>
      <div className="p-2">
        <h2 className="my-1 text-lg font-semibold">{pg.name}</h2>
        <span className="text-gray-500 ">{pg.location.address}</span>
        <div className="mt-1 font-bold">&#x20b9; {pg.rentPerMonth}</div>
      </div>
    </div>
  );
};

export function ImageMarker({ position, pg }) {
  const markerRef = useRef();

  const eventHandlers = useMemo(
    () => ({
      mouseover() {
        if (markerRef) markerRef.current.openPopup();
      },
      mouseout() {
        if (markerRef) markerRef.current.closePopup();
      },
    }),
    []
  );

  const customIcon = new L.DivIcon({
    html: `<div class="relative w-16 h-16">
            <div class="absolute bottom-0 w-10 h-6 bg-black"></div>
            <div class="absolute bottom-6 w-0 h-0 border-b-6 border-l-4 border-transparent border-black transform rotate-45"></div>
            <div class="absolute w-full h-full rounded-full border-2 border-black bg-cover overflow-hidden" style="background-image: url(${pg.image})"></div>
          </div>`,
    className: "custom-icon",
    iconSize: [10, 10],
    iconAnchor: [5, 5],
  });

  return (
    <Marker
      position={position}
      icon={customIcon}
      ref={markerRef}
      eventHandlers={eventHandlers}
    >
      <Popup autoPan={false}>
        <ImageMarkerPopup pg={pg} />
      </Popup>
    </Marker>
  );
}

export function IconMarker({ icon, data }) {
  return (
    <Marker position={data.coordinates} icon={icon}>
      <Popup>
        <div className="flex flex-col items-center min-w-[150px]">
          <span className="text-gray-800 text-base">{data.name}</span>
          <div className="flex justify-between w-full my-2">
            <span className="text-gray-500 text-sm uppercase px-8">
              {data.type}
            </span>
            <span className="text-gray-500 text-sm ">
              {data.distanceAway} m Away
            </span>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
