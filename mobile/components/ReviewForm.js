import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import Title from "./Title";
import { Slider } from "@miblanchard/react-native-slider";
import { useState } from "react";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { addReview, updateReview } from "../redux/actions/review";
import useFetchReviews from "../services/useFetchReviews";
import {
  MAX_LENGTH_COMMENT,
  REVIEW_ADD_SUCCESS,
  REVIEW_MODIFY_SUCCESS,
} from "../config";
import { getToken, getUser } from "../redux/selectors";

const PLACEHOLDER = "Enter your review here";
const NOTE_MIN = 1;
const NOTE_MAX = 5;

const ReviewForm = ({ isUpdate, navigation, toiletId, review }) => {
  const [note, setNote] = useState(review?.note || 1);
  const [comment, setComment] = useState(review?.comment || "");
  const title = isUpdate ? "Update review " + review.id : "Add Review";
  const user = useSelector(getUser);
  const token = useSelector(getToken);

  const dispatch = useDispatch();
  const { addReviewFetch, updateReviewFetch } = useFetchReviews();

  const handlePressCancel = () => {
    navigation.goBack();
  };

  const handlePressAdd = () => {
    if (comment === "") {
      Alert.alert("Please enter a comment");
    } else {
      addReviewFetch(token, note, comment, toiletId)
        .then(({ status, data }) => {
          if (status === 201) {
            dispatch(addReview(data, note, comment, toiletId, user.id));
            Alert.alert(REVIEW_ADD_SUCCESS);
            navigation.navigate("ListReviews", { toiletId });
          }
        })
        .catch((error) => {
          Alert.alert(error.message);
        });
    }
  };

  const handlePressUpdate = () => {
    if (comment === "") {
      Alert.alert("Please enter a comment");
    } else {
      updateReviewFetch(token, review.id, note, comment)
        .then((status) => {
          if (status === 204) {
            Alert.alert(REVIEW_MODIFY_SUCCESS);
            dispatch(updateReview(review.id, note, comment));
            navigation.navigate("ListReviews", { toiletId });
          }
        })
        .catch((error) => {
          Alert.alert(error.message);
        });
    }
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
          <Text style={styles.sliderNote}>{note}</Text>
          <Slider
            minimumValue={NOTE_MIN}
            maximumValue={NOTE_MAX}
            step={1}
            value={note}
            onValueChange={(value) => setNote(value[0])}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Tell us why</Text>
          <TextInput
            style={styles.input}
            multiline
            placeholder={PLACEHOLDER}
            scrollEnabled={true}
            value={comment}
            onChangeText={setComment}
            maxLength={MAX_LENGTH_COMMENT}
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
    width: 200,
    alignContent: "stretch",
  },
  sliderNote: {
    textAlign: "center",
  },
  slider: {
    backgroundColor: "red",
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
