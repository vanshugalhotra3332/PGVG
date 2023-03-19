import "leaflet/dist/leaflet.css";
import { useState } from "react";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function Map({ coords }) {
  return (
    <MapContainer
      className="w-full lg:h-[60vh] md:h-[40vh] h-[25vh]"
      center={[30.7521, 76.7757]}
      zoom={16}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {coords.map((cord, index) => {
        return <Marker key={index} position={cord}></Marker>;
      })}
    </MapContainer>
  );
}

export default Map;
