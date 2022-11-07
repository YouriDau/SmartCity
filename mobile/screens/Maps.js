import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, LatLng } from "react-native-maps";

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
    {
      id: 2,
      title: "3 toilet",
      description: "Toilet 3 Description",
      location: {
        latitude: 50.46822,
        longitude: 4.8633,
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

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          // Latitude et longitude de Namur
          latitude: 50.46535,
          longitude: 4.86461,
          // LatitudeDelta and LongitudeDelta to the size of the map
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
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
      <View style={{ position: "absolute", bottom: 25, left: 30 }}>
        <Button title={"Add toilet"} />
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
    justifyContent: "center",
  },
  map: {
    height: "100%",
    width: "100%",
  },
});

export default Maps;
