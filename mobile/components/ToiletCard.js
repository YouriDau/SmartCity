import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, StyleSheet, Text, Pressable, Alert } from "react-native";
import { Card } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";

import Button from "../components/Button";
import { NEED_CONNEXION_ERROR } from "../config";

const ToiletCard = ({ isPaid, isReducedMobility, toiletId, navigation }) => {
  const handlePressListReviews = () => {
    navigation.navigate("ListReviews", { toiletId });
  };

  const handlePressAddReview = () => {
    AsyncStorage.getItem("token").then((token) => {
      if (token) {
        navigation.navigate("AddReview", { toiletId });
      } else {
        Alert.alert(NEED_CONNEXION_ERROR);
      }
    });
  };

  const handlePressAddReport = () => {
    AsyncStorage.getItem("token").then((token) => {
      if (token) {
        navigation.navigate("AddReport", { toiletId });
      } else {
        Alert.alert(NEED_CONNEXION_ERROR);
      }
    });
  };

  return (
    <Card style={styles.card}>
      <Card.Title style={styles.cardTitle} title="toilet description" />
      <Card.Content>
        <View style={styles.iconItem}>
          <Icon
            size={30}
            name={isPaid ? "checkmark-circle-outline" : "close-circle-outline"}
            color={isPaid ? "green" : "red"}
          />
          <Text>is paid?</Text>
        </View>
        <View style={styles.iconItem}>
          <Icon
            name={
              isReducedMobility
                ? "checkmark-circle-outline"
                : "close-circle-outline"
            }
            size={30}
            color={isReducedMobility ? "green" : "red"}
          />
          <Text>is for reduce mobility people?</Text>
        </View>

        <Text style={styles.title}>Review</Text>
        <View style={styles.subcontent}>
          <Pressable style={styles.button} onPress={handlePressListReviews}>
            <Icon name="list-outline" size={45} color="grey" />
          </Pressable>
          <Pressable style={styles.button} onPress={handlePressAddReview}>
            <Icon name="add-circle" size={45} color="grey" />
          </Pressable>
        </View>
        <Text style={styles.title}>Report</Text>
        <View style={styles.subContentReport}>
          <Pressable style={styles.button} onPress={handlePressAddReport}>
            <Icon name="add-circle" size={45} color="grey" />
          </Pressable>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    bottom: 90,
    paddingHorizontal: 10,
    width: "90%",
  },
  iconItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    marginVertical: 10,
    justifyContent: "center",
    flexDirection: "row",
  },
  title: {
    fontSize: 19,
    color: "grey",
  },
  subcontent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "lightgrey",
  },
  subContentReport: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "lightgrey",
  },
});

export default ToiletCard;
