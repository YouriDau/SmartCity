import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviews, getUser } from "../../redux/selectors";
import { setReviews } from "../../redux/actions/review";
import { Slider } from "@miblanchard/react-native-slider";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import Title from "../../components/Title";
import Button from "../../components/Button";
import useFetchReviews from "../../services/useFetchReviews";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NEED_CONNEXION_ERROR } from "../../config";

const Item = ({ navigation, toiletId, review }) => {
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
    <View
      style={[
        styles.item,
        user.id === review.userId ? styles.userItem : styles.item,
      ]}
    >
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
          thumbStyle={
            user.id === review.userId ? styles.userSliderBtn : styles.sliderBtn
          }
          maximumTrackTintColor={
            user.id === review.userId ? "lightblue" : "lightgrey"
          }
        />
      </View>
      {showButtons()}
    </View>
  );
};

const List = ({ navigation, route }) => {
  const { toiletId } = route.params;
  const reviews = useSelector(getReviews);
  const dispatch = useDispatch();

  const { getReviewsFetch } = useFetchReviews();

  useEffect(() => {
    getReviewsFetch(toiletId).then((allReviews) => {
      dispatch(setReviews(allReviews));
    });
  }, []);

  const renderItem = ({ item }) => {
    return <Item navigation={navigation} toiletId={toiletId} review={item} />;
  };

  const handlePressCancel = () => {
    navigation.navigate("Maps");
  };

  const showReviews = () => {
    if (reviews.length > 0) {
      return (
        <View style={styles.content}>
          <FlatList
            data={reviews}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      );
    } else {
      return <Text>There is not reviews in the list</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <Title text={"Reviews"} />
      {showReviews()}
      <View style={styles.buttons}>
        <Button
          text={"Cancel"}
          textColor={"white"}
          btnColor={"grey"}
          handlePress={handlePressCancel}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  content: {
    height: "70%",
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
  },
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
  sliderBtn: {
    backgroundColor: "lightgrey",
  },
  userSliderBtn: {
    backgroundColor: "lightblue",
  },
  sliderRightPart: {
    backgroundColor: "lightgrey",
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
  buttons: {
    position: "absolute",
    bottom: 0,
    marginTop: 50,
  },
});

export default List;
