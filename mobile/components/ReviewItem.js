import { useSelector } from "react-redux";
import { getUser } from "../redux/selectors";
import { Slider } from "@miblanchard/react-native-slider";
import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NEED_CONNEXION_ERROR } from "../config";

const ReviewItem = ({ navigation, toiletId, review }) => {
  const user = useSelector(getUser);

  const handlePressUpdate = () => {
    AsyncStorage.getItem("token").then((token) => {
      if (token) {
        navigation.navigate("UpdateReview", { toiletId, review });
      } else {
        Alert.alert(NEED_CONNEXION_ERROR);
      }
    });
  };

  const handlePressDelete = () => {
    AsyncStorage.getItem("token").then((token) => {
      if (token) {
        navigation.navigate("DeleteReview", { id: review.id });
      } else {
        Alert.alert(NEED_CONNEXION_ERROR);
      }
    });
  };

  const showButtons = () => {
    return (
      <View style={styles.pressables}>
        <Pressable
          style={[styles.pressable, styles.update]}
          onPress={handlePressUpdate}
        >
          <Text style={styles.button}>See more</Text>
        </Pressable>
        <Pressable
          style={[styles.pressable, styles.delete]}
          onPress={handlePressDelete}
        >
          <Text style={styles.button}>Delete</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={[user.id === review.userId ? styles.userItem : styles.item]}>
      <View style={styles.leftPart}>
        <Text>review {review.id}</Text>
        <Text>{review.date}</Text>
        <Text style={styles.comment}>{review.comment}</Text>
        <Text style={styles.noteTitle}>note:</Text>
        <Slider
          minimumValue={0}
          maximumValue={5}
          value={review.note}
          disabled
        />
      </View>
      {showButtons()}
    </View>
  );
};

const styles = StyleSheet.create({
  comment: {
    paddingTop: 10,
  },
  item: {
    backgroundColor: "lightgrey",
    borderRadius: 15,
    margin: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userItem: {
    backgroundColor: "lightblue",
    borderRadius: 15,
    margin: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  noteTitle: {
    fontWeight: "bold",
    marginTop: 10,
  },
  leftPart: {
    flex: 1,
    padding: 20,
  },
  pressable: {
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 3,
  },
  pressables: {
    borderLeftWidth: 1,
    borderLeftColor: "white",
  },
  update: {
    flex: 1,
    borderTopRightRadius: 15,
    backgroundColor: "#E2E52B",
  },
  delete: {
    flex: 1,
    borderBottomRightRadius: 15,
    backgroundColor: "#D42929",
  },
  button: {
    fontWeight: "400",
  },
});

export default ReviewItem;
