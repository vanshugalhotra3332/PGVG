import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

function Map() {
  let coords = [];
  const pgs = useSelector((state) => state.pgs.pgs);
  pgs.map((pg) => coords.push(pg.location.coordinates));

  return (
    <MapContainer
      className="w-full lg:h-[60vh] md:h-[40vh] h-[25vh]"
      center={coords[0]}
      zoom={17}
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
  );
}

export default Map;
