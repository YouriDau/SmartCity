import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getToilets } from "../redux/selectors";

import MapView, { Marker } from "react-native-maps";
import { Card, TouchableRipple } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";

import Button from "../components/Button";
import { addMapMarker, setToilets } from "../redux/actions/maps";
import useFetchToilets from "../services/useFetchToilets";

const Maps = ({ navigation }) => {
  const [canAddToilet, setCanAddToilet] = useState(false);
  const [newCoordinate, setNewCoordinates] = useState();
  const [cardIsVisible, setCardIsVisible] = useState(false);
  const [toiletToDisplay, setToiletToDisplay] = useState();
  const [toiletCard, setToiletCard] = useState();
  const toilets = useSelector(getToilets);

  const { getToiletsFetch, getToiletFetch } = useFetchToilets();
  const dispatch = useDispatch();

  useEffect(() => {
    getToiletsFetch().then((newToilets) => dispatch(setToilets(newToilets)));
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
    Alert.alert("click on the map to add new marker");
    setCanAddToilet(true);
  };

  const handlePressAddToiletSecond = () => {
    if (canAddToilet && newCoordinate) {
      setCanAddToilet(false);
      navigation.navigate("AddToilet", { newCoordinate });
    }
  };

  const handlePressMarker = (toilet) => {
    setToiletToDisplay(toilet);
    setCardIsVisible(true);
  };

  const handlePressAddReview = () => {
    navigation.navigate("AddReview");
  };

  const showMarkers = () => {
    if (toilets !== undefined) {
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
        <Card style={styles.card}>
          <Card.Title style={styles.cardTitle} title="toilet description" />
          <Card.Content>
            <View style={styles.iconItem}>
              <Icon
                size={30}
                name={
                  toiletToDisplay.is_paid
                    ? "checkmark-circle-outline"
                    : "close-circle-outline"
                }
                color={toiletToDisplay.is_paid ? "green" : "red"}
              />
              <Text>is paid?</Text>
            </View>
            <View style={styles.iconItem}>
              <Icon
                name={
                  toiletToDisplay.is_reduced_mobility
                    ? "checkmark-circle-outline"
                    : "close-circle-outline"
                }
                size={30}
                color={toiletToDisplay.is_reduced_mobility ? "green" : "red"}
              />
              <Text>is for reduce mobility people?</Text>
            </View>
            <View style={styles.cardButtons}>
              <Button
                text={"add review"}
                textColor={"white"}
                btnColor={"grey"}
                handlePress={handlePressAddReview}
              />
            </View>
          </Card.Content>
        </Card>
      );
    }
  };

  const showButtons = () => {
    if (!canAddToilet) {
      return (
        <View style={styles.mapButtons}>
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
