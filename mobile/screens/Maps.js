import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { getMarkers } from "../redux/selectors";

import Button from "../components/Button";
import { addMapMarker } from "../redux/actions/maps";
import useFetchToilets from "../services/useFetchToilets";

const Maps = ({ navigation }) => {
  const [canAddToilet, setCanAddToilet] = useState(false);
  const [newCoordinate, setNewCoordinates] = useState();
  const [toilets, setToilets] = useState([]);
  const { getToilets } = useFetchToilets();
  const dispatch = useDispatch();

  useEffect(() => {
    getToilets().then((toilet) => {
      setToilets(toilet);
    });
  }, [dispatch]);

  const handlePressMap = (coordinate) => {
    if (canAddToilet) {
      setNewCoordinates(coordinate);
    }
  };

  const handlePressCancel = () => {
    setCanAddToilet(false);
    setNewCoordinates();
  };

  const handlePressAddToiletFirst = () => {
    Alert.alert("click on the map to add new marker");
    setCanAddToilet(true);
  };

  const handlePressAddToiletSecond = () => {
    if (canAddToilet && newCoordinate) {
      setCanAddToilet(false);
      navigation.navigate("AddToilet", { newCoordinate });
    }
  };

  const showNewMarker = () => {
    if (canAddToilet && newCoordinate !== undefined) {
      return <Marker key={"0"} coordinate={newCoordinate} />;
    }
  };

  const showButtons = () => {
    if (!canAddToilet) {
      return (
        <View style={styles.buttons}>
          <Button
            text={"Add toilet"}
            textColor={"white"}
            btnColor={"grey"}
            handlePress={handlePressAddToiletFirst}
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
            handlePress={handlePressCancel}
          />
          <Button
            text={"Add toilet here"}
            textColor={"white"}
            btnColor={"#44AAFF"}
            handlePress={handlePressAddToiletSecond}
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

        onPress={(e) => {
          handlePressMap(e.nativeEvent.coordinate);
        }}
      >
        {toilets.map((toilet) => (
          <Marker key={toilet.id} coordinate={toilet.location} />
        ))}
        {showNewMarker()}
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
