import React from "react";
import Header from "../component/Header";
import PopupToilet from "../component/PupupToilet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { getAllToiletsFetch } from "../component/API/useFetchToilet";
import {
  IoIosAddCircle, // add circle
} from "react-icons/io";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const INITIAL_POSITION = [50.46498, 4.86529];
const ZOOM = 16;

const Maps = () => {
  const [initialPosition, setInitialPosition] = useState(INITIAL_POSITION);
  const [toilets, setToilets] = useState([]);

  useEffect(() => {
    getAllToiletsFetch()
      .then(({ status, data }) => {
        console.log(data);
        setToilets(data);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  return (
    <div className="leaflet-container">
      <Header />
      <MapContainer center={initialPosition} zoom={ZOOM} scrollWheelZoom={true}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://api.openstreetmap.org/">OpenStreetMap</a> contributors'
        />
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
      <Link to="/addToilet" id={"mapAddButton"}>
        <IoIosAddCircle size={60} />
      </Link>
    </div>
  );
};

export default Maps;
