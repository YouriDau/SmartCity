import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviews } from "../../redux/selectors";
import { useNavigation } from "@react-navigation/native";
import { setReviews } from "../../redux/actions/review";

import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import Title from "../../components/Title";
import Button from "../../components/Button";
import useFetchReviews from "../../services/useFetchReviews";

const Item = ({ navigation, review }) => {
  return (
    <View style={styles.item}>
      <View style={styles.leftPart}>
        <Text>
          review {review.id}: {review.date}
        </Text>
      </View>

      <View>
        <Pressable
          style={styles.pressable}
          onPress={() => {
            navigation.navigate("UpdateReview", { review });
          }}
        >
          <Text style={styles.button}>See more</Text>
        </Pressable>
        <Pressable
          style={styles.pressable}
          onPress={() => {
            navigation.navigate("DeleteReview", { id: review.id });
          }}
        >
          <Text style={styles.button}>Delete</Text>
        </Pressable>
      </View>
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
    return <Item navigation={navigation} review={item} />;
  };

  const handlePressCancel = () => {
    navigation.goBack();
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
    flex: 1,
    height: "50%",
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  item: {
    backgroundColor: "lightgrey",
    padding: 20,
    margin: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftPart: {
    flex: 1,
  },
  pressable: {
    paddingVertical: 5,
    paddingHorizontal: 3,
  },
  button: {
    color: "blue",
  },
  buttons: {
    position: "absolute",
    bottom: 0,
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default List;
