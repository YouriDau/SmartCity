import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { getMarkers } from "../redux/selectors";

import Button from "../components/Button";
import { addMapMarker } from "../redux/actions/maps";

const Maps = ({ navigation }) => {
  const dispatch = useDispatch();
  const toilets = useSelector(getMarkers);
  const [canAddToilet, setCanAddToilet] = useState(false);
  const [newCoordinate, setNewCoordinates] = useState();

  function addNewMarker() {
    if (canAddToilet && newCoordinate) {
      setCanAddToilet(false);
      navigation.navigate("AddToilet");
    }
  }

  const handlePressMap = (coordinate) => {
    setNewCoordinates(coordinate);
  };

  const showButtons = () => {
    if (!canAddToilet) {
      return (
        <View style={styles.buttons}>
          <Button
            text={"Add toilet"}
            textColor={"white"}
            btnColor={"grey"}
            handlePress={() => {
              setCanAddToilet(true);
            }}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.buttons}>
          <Button
            text={"Cancel"}
            textColor={"white"}
            btnColor={"grey"}
            handlePress={() => {
              setCanAddToilet(false);
            }}
          />
          <Button
            text={"Add toilet here"}
            textColor={"white"}
            btnColor={"#44AAFF"}
            handlePress={addNewMarker}
          />
        </View>
      );
    }
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

        onPress={(e) => handlePressMap(e.nativeEvent.coordinate)}
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
      {showButtons()}
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
  marker: {
    height: 60,
    width: 60,
  },
  buttons: {
    width: "100%",
    flexDirection: "row",
    position: "absolute",
    justifyContent: "space-around",
    bottom: 0,
    marginHorizontal: "auto",
  },
});

export default Maps;
