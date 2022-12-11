import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import Title from "./Title";
import Slider from "@react-native-community/slider";
import { useState } from "react";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { addReview } from "../redux/actions/review";
import useFetchReviews from "../services/useFetchReviews";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { REVIEW_ADD_SUCCESS, REVIEW_MODIFY_SUCCESS } from "../config";

const PLACEHOLDER = "Enter your review here";
const NOTE_MIN = 1;
const NOTE_MAX = 5;

const ReviewForm = ({ isUpdate, navigation, toiletId, review }) => {
  const [note, setNote] = useState(review?.note);
  const [comment, setComment] = useState(review?.comment);
  const title = isUpdate ? "Update review " + review.id : "Add Review";

  const dispatch = useDispatch();
  const { addReviewFetch, updateReviewFetch } = useFetchReviews();

  const handlePressCancel = () => {
    navigation.goBack();
  };

  const handlePressAdd = () => {
    addReviewFetch(note, comment, toiletId).then(({ status, data }) => {
      if (status === 201) {
        dispatch(addReview(data, note, comment, toiletId));
        Alert.alert(REVIEW_ADD_SUCCESS);
        navigation.goBack();
      }
    });
  };

  const handlePressUpdate = () => {
    updateReviewFetch(review.id, note, comment).then((status) => {
      if (status === 204) {
        Alert.alert(REVIEW_MODIFY_SUCCESS);
        navigation.goBack();
      }
    });
  };

  const showButton = () => {
    if (isUpdate) {
      return (
        <Button
          text={"Update"}
          btnColor={"#E2E52B"}
          handlePress={handlePressUpdate}
        />
      );
    } else {
      return <Button text={"Submit"} handlePress={handlePressAdd} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Title text={title} />
        <View style={styles.slideContainer}>
          <Text>{note}</Text>
          <Slider
            style={styles.slider}
            minimumValue={NOTE_MIN}
            maximumValue={NOTE_MAX}
            step={1}
            value={note}
            onValueChange={setNote}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Tell us why</Text>
          <TextInput
            style={styles.input}
            multiline
            maxLength={300}
            placeholder={PLACEHOLDER}
            scrollEnabled={true}
            value={comment}
            onChangeText={setComment}
          />
        </View>
      </View>
      <View style={styles.buttons}>
        <Button
          text={"Cancel"}
          textColor={"white"}
          btnColor={"grey"}
          handlePress={handlePressCancel}
        />
        {showButton()}
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
    alignItems: "center",
  },
  slideContainer: {
    alignItems: "center",
  },
  slider: {
    width: 200,
    height: 20,
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    width: 200,
    height: 200,
    borderWidth: 1,
    borderRadius: 7,
    textAlignVertical: "top",
    padding: 15,
    backgroundColor: "white",
  },
  buttons: {
    width: "100%",
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 0,
  },
});

export default ReviewForm;
