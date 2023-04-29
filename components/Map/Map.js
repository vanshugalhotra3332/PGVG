import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { MapContainer, TileLayer, Marker, Circle, useMap } from "react-leaflet";

import { useSelector} from "react-redux";
import { useEffect } from "react";

import L from "leaflet";

function Map({ coords }) {
  // redux
  const nearbyCoordinates = useSelector(
    (state) => state.filter.nearbyCoordinates
  );
  const center = useSelector((state) => state.map.center);
  const zoom = useSelector((state) => state.map.zoom);

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
      {nearbyCoordinates.length ? (
        <Circle
          center={nearbyCoordinates}
          pathOptions={{ fillColor: "blue" }}
          radius={2000}
        />
      ) : null}

      {coords.map((cord, index) => {
        return <Marker key={index} position={cord}></Marker>;
      })}
      {nearbyCoordinates.length ? (
        <Marker position={nearbyCoordinates} icon={redIcon}></Marker>
      ) : null}
    </MapContainer>
  );
}

export default Map;
