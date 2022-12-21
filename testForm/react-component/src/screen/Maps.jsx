import React from "react";
import Header from "../component/Header";
import PopupToilet from "../component/PupupToilet";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { getAllToiletsFetch } from "../component/API/useFetchToilet";
import {
  IoIosAddCircle, // add circle
} from "react-icons/io";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import LocationMarker from "../component/LocationMarker";

const INITIAL_POSITION = [50.46498, 4.86529];
const ZOOM = 16;

const Maps = () => {
  const [initialPosition, setInitialPosition] = useState(INITIAL_POSITION);
  const [newCoordinate, setNewCoordinate] = useState();
  const [canAddToilet, setCanAddToilet] = useState(true);
  const [toilets, setToilets] = useState([]);

  useEffect(() => {
    getAllToiletsFetch()
      .then(({ status, data }) => {
        setToilets(data);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  // useEffect(() => {
  //   map.on("click", (e) => {
  //     alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng);
  //   });
  // }, [map]);

  return (
    <div className="leaflet-container">
      <Header />
      <MapContainer center={initialPosition} zoom={ZOOM} scrollWheelZoom={true}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://api.openstreetmap.org/">OpenStreetMap</a> contributors'
        />
        <LocationMarker />
        {toilets.map((toilet) => {
          return (
            <Marker
              key={toilet.id}
              position={[toilet.location.latitude, toilet.location.longitude]}
            >
              <PopupToilet
                isPaid={toilet.isPaid}
                isReducedMobility={toilet.isReducedMobility}
                toiletId={toilet.id}
              />
            </Marker>
          );
        })}
      </MapContainer>
      <button>
        <IoIosAddCircle size={60} />
      </button>
      <Link to="/addToilet" id={"mapAddButton"}></Link>
    </div>
  );
};

export default Maps;
