import React from "react";
import Header from "../component/Header";
import PopupToilet from "../component/PupupToilet";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { getAllToiletsFetch } from "../component/API/useFetchToilet";
import {
  IoIosAddCircle, // add circle
  IoIosCloseCircle,
} from "react-icons/io";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LocationMarker from "../component/LocationMarker";

const INITIAL_POSITION = [50.46498, 4.86529];
const ZOOM = 16;

const Maps = () => {
  const [newCoordinate, setNewCoordinate] = useState(null);
  const [canAddToilet, setCanAddToilet] = useState(false);
  const [toilets, setToilets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllToiletsFetch()
      .then(({ status, data }) => {
        setToilets(data);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  const handlePressAddToiletFirst = () => {
    alert("Click on the map to add a new marker");
    setNewCoordinate(null);
    setCanAddToilet(true);
  };

  const handlePressCancelAddToilet = () => {
    setCanAddToilet(false);
  };

  const handlePressAddToiletSecond = () => {
    if (newCoordinate !== null) {
      navigate("/addToilet", { state: { coordinate: newCoordinate } });
    }
  };

  const showButtons = () => {
    if (canAddToilet) {
      return (
        <div className="mapButtons">
          <a className="mapButton" onClick={handlePressCancelAddToilet}>
            <IoIosCloseCircle size={60} />
          </a>
          <a className="mapButton" onClick={handlePressAddToiletSecond}>
            <IoIosAddCircle size={60} />
          </a>
        </div>
      );
    } else {
      return (
        <div className="mapButtons">
          <a className="mapButton" onClick={handlePressAddToiletFirst}>
            <IoIosAddCircle size={60} />
          </a>
        </div>
      );
    }
  };

  const setLocation = (coordinate) => {
    if (canAddToilet) {
      setNewCoordinate(coordinate);
    }
  };

  return (
    <div className="leaflet-container">
      <Header />
      <MapContainer
        center={INITIAL_POSITION}
        zoom={ZOOM}
        scrollWheelZoom={true}
      >
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
        {canAddToilet && <LocationMarker setLocation={setLocation} />}
      </MapContainer>
      {showButtons()}
    </div>
  );
};

export default Maps;
