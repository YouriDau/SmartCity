import { View, StyleSheet, Text } from "react-native";
import { Card } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";

import Button from "../components/Button";

const ToiletCard = ({ isPaid, isReducedMobility, toiletId, navigation }) => {
  const handlePressAddReview = () => {
    navigation.navigate("AddReview", { toiletId });
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
        <View style={styles.buttons}>
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
};

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    bottom: 80,
    paddingHorizontal: 10,
    width: "90%",
  },
  iconItem: {
    flexDirection: "row",
  },
  buttons: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "space-between",
    width: "100%",
  },
});

export default ToiletCard;
