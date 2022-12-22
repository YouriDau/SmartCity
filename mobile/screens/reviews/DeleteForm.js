import { View, Text, StyleSheet, Alert } from "react-native";
import Title from "../../components/Title";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteReview } from "../../redux/actions/review";
import useFetchReviews from "../../services/useFetchReviews";
import { getToken } from "../../redux/selectors";

const DeleteForm = ({ navigation, route }) => {
  const id = route.params.id;
  const token = useSelector(getToken);
  const dispatch = useDispatch();
  const { deleteReviewFetch } = useFetchReviews();

  const handlePressCancel = () => {
    navigation.goBack();
  };

  const handlePressDelete = () => {
    deleteReviewFetch(token, id)
      .then((status) => {
        if (status === 204) {
          Alert.alert("Success", "Delete with success!");
          dispatch(deleteReview(id));
          navigation.goBack();
        }
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Title text={"Delete review " + id} />
      <View style={styles.content}>
        <Text style={styles.text}>
          Are you sure you want to delete this review?
        </Text>
      </View>
      <View style={styles.buttons}>
        <Button
          text={"Cancel"}
          textColor={"white"}
          btnColor={"grey"}
          handlePress={handlePressCancel}
        />
        <Button text={"Yes"} btnColor={"red"} handlePress={handlePressDelete} />
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
    height: "80%",
  },
  buttons: {
    width: "100%",
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default DeleteForm;
