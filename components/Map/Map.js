import "leaflet/dist/leaflet.css";
import { useState } from "react";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function Map({ coords }) {
  console.log(coords);
  return (
    coords.length && (
      <MapContainer
        className="w-full lg:h-[60vh] md:h-[40vh] h-[25vh]"
        center={coords[0]}
        zoom={20}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {coords.map((cord, index) => {
          return <Marker key={index} position={cord}></Marker>;
        })}
      </MapContainer>
    )
  );
}

export default Map;
