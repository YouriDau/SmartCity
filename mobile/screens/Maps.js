import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { getMarkers } from "../redux/selectors";

import Button from "../components/Button";
import { addMapMarker } from "../redux/actions/maps";

const Maps = ({ navigation }) => {
  const [newMarker, setNewMarker] = useState();
  const dispatch = useDispatch();
  const toilets = useSelector(getMarkers);

  function addMarker(coordinate) {
    dispatch(addMapMarker(coordinate.latitude, coordinate.longitude));
  }

  const handlePressAddToilet = () => {
    dispatch(addMarker);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          // Latitude et longitude de Namur
          latitude: 50.46535,
          longitude: 4.86461,
          // LatitudeDelta and LongitudeDelta to the size of the map
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        // e.nativeEvent renvoie toutes les informations concernant le click:
        // action="press", coordinates: {latitude: XXX, ...}, ...

        onPress={(e) => addMarker(e.nativeEvent.coordinate)}
      >
        {toilets.map((toilet) => (
          <Marker
            key={toilet.id}
            coordinate={toilet.location}
            title={toilet.title}
            description={toilet.description}
          />
        ))}
      </MapView>
      <View style={styles.buttons}>
        <Button
          text={"Add toilet"}
          textColor={"white"}
          btnColor={"grey"}
          handlePress={handlePressAddToilet}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  map: {
    flex: 1,
    width: "100%",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 0,
    marginHorizontal: "auto",
  },
});

export default Maps;
