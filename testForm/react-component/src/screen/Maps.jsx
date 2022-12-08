import React from "react";
import Header from "../component/Header";
import PopupToilet from "../component/PupupToilet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { getAllToiletsFetch } from "../component/API/useFetchToilet";
import {
  IoIosAddCircle, // add circle
} from "react-icons/io";
import { Link } from "react-router-dom";

class Maps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: [50.46498, 4.86529],
      zoom: 16,
      toilets: [],
    };
  }

  componentDidMount() {
    getAllToiletsFetch().then(({ status, data }) => {
      console.log(data);
      this.setState({ toilets: data });
    });
  }

  render() {
    return (
      <div className="leaflet-container">
        <Header />
        <MapContainer
          center={this.state.position}
          zoom={this.state.zoom}
          scrollWheelZoom={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://api.openstreetmap.org/">OpenStreetMap</a> contributors'
          />
          {this.state.toilets.map((toilet) => {
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
  }
}

export default Maps;
