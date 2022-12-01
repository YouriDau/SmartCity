import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, StyleSheet, Text, Pressable, Alert } from "react-native";
import { Card } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";

import Button from "../components/Button";

const ToiletCard = ({ isPaid, isReducedMobility, toiletId, navigation }) => {
  const handlePressListReviews = () => {
    navigation.navigate("ListReviews", { toiletId });
  };

  const handlePressAddReview = () => {
    AsyncStorage.getItem("token").then((token) => {
      console.log(token);
      if (token) {
        navigation.navigate("AddReview", { toiletId });
      } else {
        Alert.alert("You are not connected", "Please, connect to add toilet");
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
        <Text style={styles.reviewTitle}>Review</Text>
        <View style={styles.review}>
          <Pressable style={styles.button} onPress={handlePressListReviews}>
            <Icon name="list-outline" size={45} color="grey" />
          </Pressable>
          <Pressable style={styles.button} onPress={handlePressAddReview}>
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
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  reviewTitle: {
    fontSize: 19,
    color: "grey",
  },
  review: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "lightgrey",
  },
});

export default ToiletCard;
