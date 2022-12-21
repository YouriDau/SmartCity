import { useState } from "react";
import { useEffect } from "react";
import { Marker, Popup, useMap } from "react-leaflet";

const LocationMarker = (props) => {
  const [location, setLocation] = useState(null);
  const map = useMap();

  useEffect(() => {
    map.on("click", (e) => {
      setLocation(e.latlng);
    });
  }, [map]);

  return location === null ? null : (
    <div>
      <h1>add marker here?</h1>
      <Marker position={location}>
        <h1>test</h1>
        <Popup>You clicked here.</Popup>
      </Marker>
    </div>
  );
};

export default LocationMarker;
