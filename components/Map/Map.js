import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  useMap,
  Popup,
} from "react-leaflet";

import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef } from "react";

import L from "leaflet";
import { setCenter, setZoom } from "@/slices/mapSlice";

const MarkerPopup = ({ pg }) => {
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

function CustomMarker({ position, pg }) {
  const markerRef = useRef();

  const eventHandlers = useMemo(
    () => ({
      mouseover() {
        console.log("over");
        if (markerRef) markerRef.current.openPopup();
      },
      mouseout() {
        console.log("out");
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
        <MarkerPopup pg={pg} />
      </Popup>
    </Marker>
  );
}

function Map({ coordinate }) {
  // redux
  const nearbyCoordinates = useSelector(
    (state) => state.filter.nearbyCoordinates
  );
  const center = useSelector((state) => state.map.center);
  const zoom = useSelector((state) => state.map.zoom);

  const pgs = useSelector((state) => state.pgs.pgs);

  const Recenter = () => {
    const map = useMap();
    useEffect(() => {
      map.setView(center, zoom);
    }, [map]);
    return null;
  };

  // Define a custom icon with a red marker
  const redIcon = new L.Icon({
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

  return (
    <MapContainer
      className="w-full lg:h-[60vh] md:h-[40vh] h-[25vh]"
      scrollWheelZoom={true}
      zoomControl={false}
      zoom={zoom}
      center={center}
    >
      <Recenter />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {!coordinate && nearbyCoordinates.length ? (
        <Circle
          center={nearbyCoordinates}
          pathOptions={{ fillColor: "blue" }}
          radius={2000}
        />
      ) : null}

      {!coordinate &&
        pgs.map((pg) => {
          return (
            <CustomMarker
              key={pg.slug}
              position={pg.location.coordinates}
              pg={pg}
            />
          );
        })}

      {!coordinate && nearbyCoordinates.length ? (
        <Marker position={nearbyCoordinates} icon={redIcon}></Marker>
      ) : null}

      {coordinate && <Marker position={coordinate}></Marker>}
    </MapContainer>
  );
}

export default Map;
