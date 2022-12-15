import { View, Text, StyleSheet, Alert } from "react-native";
import CheckBox from "expo-checkbox";
import Title from "../../components/Title";
import Button from "../../components/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addMapMarker } from "../../redux/actions/maps";

import useFetchToilet from "../../services/useFetchToilets";

const { addToiletFetch } = useFetchToilet();

const AddToilet = ({ navigation, route }) => {
  const [isPaid, setIsPaid] = useState(false);
  const [isReducedMobility, setIsReducedMobility] = useState(false);
  const { newCoordinate } = route.params;

  const dispatch = useDispatch();

  const handlePressCancel = () => {
    navigation.goBack();
  };

  const handlePressSubmit = () => {
    addToiletFetch(
      newCoordinate.latitude,
      newCoordinate.longitude,
      isPaid,
      isReducedMobility
    )
      .then(({ status, data }) => {
        if (status === 201) {
          console.log(data);
          dispatch(
            addMapMarker(
              data,
              newCoordinate.latitude,
              newCoordinate.longitude,
              isPaid,
              isReducedMobility
            )
          );
        }
      })
      .catch((error) => {
        Alert.alert(error.message);
      });

    navigation.navigate("Maps");
  };

  return (
    <View style={styles.container}>
      <Title text={"Add toilet "} />
      <View style={styles.content}>
        <View style={styles.checkBoxContainer}>
          <CheckBox
            style={styles.checkbox}
            value={isPaid}
            onValueChange={setIsPaid}
          />
          <Text>The toilet is paid</Text>
        </View>
        <View style={styles.checkBoxContainer}>
          <CheckBox
            style={styles.checkbox}
            value={isReducedMobility}
            onValueChange={setIsReducedMobility}
          />
          <Text>The toilet is for reduce mobility people</Text>
        </View>
      </View>
      <View style={styles.buttons}>
        <Button
          text={"Cancel"}
          textColor={"white"}
          btnColor={"grey"}
          handlePress={handlePressCancel}
        />
        <Button handlePress={handlePressSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginTop: 50,
    width: "100%",
  },
  checkBoxContainer: {
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 30,
  },
  checkbox: {
    marginRight: 15,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default AddToilet;
