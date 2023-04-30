import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { MapContainer, TileLayer, Marker, Circle, useMap } from "react-leaflet";

import {
  homeIcon,
  redIcon,
  ImageMarker,
  bankIcon,
  busIcon,
  cinemaIcon,
  IconMarker,
  foodIcon,
  hospitalIcon,
  parkIcon,
  shoppingIcon,
} from "./customMapElements";

import { useSelector } from "react-redux";
import { useEffect } from "react";

function Map({ coordinate }) {
  // redux
  const nearbyCoordinates = useSelector(
    (state) => state.filter.nearbyCoordinates
  );
  const center = useSelector((state) => state.map.center);
  const zoom = useSelector((state) => state.map.zoom);

  const pgs = useSelector((state) => state.pgs.pgs);
  const nearbyBusStops = useSelector((state) => state.pgs.nearbyBusStops);
  const nearbyBanks = useSelector((state) => state.pgs.nearbyBanks);
  const nearbyCinemas = useSelector((state) => state.pgs.nearbyCinemas);
  const nearbyRestraunts = useSelector((state) => state.pgs.nearbyRestraunts);
  const nearbyHospitals = useSelector((state) => state.pgs.nearbyHospitals);
  const nearbyParks = useSelector((state) => state.pgs.nearbyParks);
  const nearbyShopping = useSelector((state) => state.pgs.nearbyShopping);

  const Recenter = () => {
    const map = useMap();
    useEffect(() => {
      map.setView(center, zoom);
    }, [map]);
    return null;
  };

  // Define a custom icon with a red marker

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
            <ImageMarker
              key={pg.slug}
              position={pg.location.coordinates}
              pg={pg}
            />
          );
        })}

      {!coordinate && nearbyCoordinates.length ? (
        <Marker position={nearbyCoordinates} icon={redIcon}></Marker>
      ) : null}

      {coordinate && <Marker position={coordinate} icon={homeIcon}></Marker>}

      {nearbyBusStops.length &&
        nearbyBusStops.map((busStop) => {
          return (
            <IconMarker
              key={busStop.coordinates}
              data={busStop}
              icon={busIcon}
            />
          );
        })}

      {nearbyBanks.length &&
        nearbyBanks.map((bank) => {
          return (
            <IconMarker key={bank.coordinates} data={bank} icon={bankIcon} />
          );
        })}

      {nearbyCinemas.length &&
        nearbyCinemas.map((cinema) => {
          return (
            <IconMarker
              key={cinema.coordinates}
              data={cinema}
              icon={cinemaIcon}
            />
          );
        })}

      {nearbyRestraunts.length &&
        nearbyRestraunts.map((restraunt) => {
          return (
            <IconMarker
              key={restraunt.coordinates}
              data={restraunt}
              icon={foodIcon}
            />
          );
        })}

      {nearbyHospitals.length &&
        nearbyHospitals.map((hospital) => {
          return (
            <IconMarker
              key={hospital.coordinates}
              data={hospital}
              icon={hospitalIcon}
            />
          );
        })}
      {nearbyParks.length &&
        nearbyParks.map((park) => {
          return (
            <IconMarker key={park.coordinates} data={park} icon={parkIcon} />
          );
        })}
      {nearbyShopping.length &&
        nearbyShopping.map((shop) => {
          return (
            <IconMarker
              key={shop.coordinates}
              data={shop}
              icon={shoppingIcon}
            />
          );
        })}
    </MapContainer>
  );
}

export default Map;
