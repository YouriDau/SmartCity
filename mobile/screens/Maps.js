import React, { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Location from "expo-location";
import { getToilets } from "../redux/selectors";
import Icon from "react-native-vector-icons/Ionicons";

import MapView, { Marker } from "react-native-maps";

import Button from "../components/Button";
import { setToilets } from "../redux/actions/maps";
import useFetchToilets from "../services/useFetchToilets";
import ToiletCard from "../components/ToiletCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DEFAULT_POSITION } from "../config";

const Maps = ({ navigation }) => {
  const [canAddToilet, setCanAddToilet] = useState(false);
  const [newCoordinate, setNewCoordinates] = useState();
  const [cardIsVisible, setCardIsVisible] = useState(false);
  const [toiletSelected, setToiletSelected] = useState();
  const toilets = useSelector(getToilets);

  const { getToiletsFetch } = useFetchToilets();
  const dispatch = useDispatch();

  useEffect(() => {
    getToiletsFetch().then(({ status, data }) => {
      console.log(data);
      dispatch(setToilets(data));
    });
  }, []);

  const handlePressMap = (coordinate) => {
    if (cardIsVisible) {
      setCardIsVisible(false);
    }
    if (canAddToilet) {
      setNewCoordinates(coordinate);
    }
  };

  const handlePressCancel = () => {
    setCanAddToilet(false);
    setNewCoordinates();
  };

  const handlePressAddToiletFirst = () => {
    setCardIsVisible(false);
    AsyncStorage.getItem("token").then((token) => {
      if (token) {
        Alert.alert("click on the map to add new marker");
        setCanAddToilet(true);
      } else {
        Alert.alert("You are not connected", "Please, connect to add toilet");
      }
    });
  };

  const handlePressAddToiletSecond = () => {
    if (canAddToilet && newCoordinate) {
      setCanAddToilet(false);
      navigation.navigate("AddToilet", { newCoordinate });
    }
  };

  const handlePressMarker = (toilet) => {
    setToiletSelected(toilet);
    setCardIsVisible(true);
  };

  const showMarkers = () => {
    if (toilets) {
      return toilets.map((toilet) => (
        <Marker
          key={toilet.id}
          coordinate={toilet.location}
          onPress={() => {
            handlePressMarker(toilet);
          }}
        />
      ));
    }
  };

  const showNewMarker = () => {
    if (canAddToilet && newCoordinate !== undefined) {
      return <Marker key={-1} coordinate={newCoordinate} />;
    }
  };

  const showCard = () => {
    if (cardIsVisible) {
      return (
        <ToiletCard
          isPaid={toiletSelected.isPaid}
          isReducedMobility={toiletSelected.isReducedMobility}
          toiletId={toiletSelected.id}
          navigation={navigation}
        />
      );
    }
  };

  const showButtons = () => {
    if (!canAddToilet) {
      return (
        <View style={styles.mapButtons}>
          <Pressable onPress={handlePressAddToiletFirst}>
            <Icon name="add-circle" size={70} color="grey" />
          </Pressable>
        </View>
      );
    } else {
      return (
        <View style={styles.mapButtons}>
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
          ...DEFAULT_POSITION,
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
        {showMarkers()}
        {showNewMarker()}
      </MapView>
      {showCard()}
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
  card: {
    position: "absolute",
    bottom: 80,
    paddingHorizontal: 10,
    width: "90%",
  },
  iconItem: {
    flexDirection: "row",
  },
  cardButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "space-between",
    width: "100%",
  },
  mapButtons: {
    width: "100%",
    flexDirection: "row",
    position: "absolute",
    justifyContent: "space-around",
    bottom: 10,
    marginHorizontal: "auto",
  },
});

export default Maps;
