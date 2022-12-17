import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviews } from "../../redux/selectors";
import { setReviews } from "../../redux/actions/review";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Title from "../../components/Title";
import Button from "../../components/Button";
import useFetchReviews from "../../services/useFetchReviews";
import ReviewItem from "../../components/ReviewItem";

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
    return (
      <ReviewItem navigation={navigation} toiletId={toiletId} review={item} />
    );
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
