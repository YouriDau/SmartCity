import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Header from "../components/Header";
import Button from "../components/Button";

const Maps = ({ navigation, route }) => {
  const [toilets, setToilets] = useState([
    {
      id: 0,
      title: "1 toilet",
      description: "Toilet 1 Description",
      location: {
        latitude: 50.46535,
        longitude: 4.86461,
      },
    },
    {
      id: 1,
      title: "2 toilet",
      description: "Toilet 2 Description",
      location: {
        latitude: 50.47104,
        longitude: 4.85807,
      },
    },
  ]);

  function addMarker(coordinate) {
    const id = toilets.length;
    const newToilets = [
      ...toilets,
      {
        id,
        title: "toilet " + id,
        description: "description toilet " + id,
        location: {
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
        },
      },
    ];
    setToilets(newToilets);
  }

  const handlePressAddToilet = () => {
      console.log("test");
  }

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
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
        <Button text={"Add toilet"} textColor={"white"} btnColor={"grey"} handlePress={handlePressAddToilet} />
        <Button text={"?"} textColor={"white"} btnColor={"grey"} />
        <Button text={"?"} textColor={"white"} btnColor={"grey"} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "black",
    alignItems: "center",
  },
  map: {
    flex: 1,
    width: "100%",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default Maps;
