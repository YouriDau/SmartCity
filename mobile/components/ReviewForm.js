import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import Title from "./Title";
import Slider from "@react-native-community/slider";
import { useState } from "react";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { addReview } from "../redux/actions/review";
import useFetchReviews from "../services/useFetchReviews";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PLACEHOLDER = "Enter your review here";
const NOTE_MIN = 1;
const NOTE_MAX = 5;

const ReviewForm = ({ navigation, isUpdate, toiletId, id }) => {
  const [note, setNote] = useState(1);
  const [comment, setComment] = useState("");
  const title = isUpdate ? "Update review " + id : "Add Review";

  const dispatch = useDispatch();
  const { addReviewFetch } = useFetchReviews();

  const handlePressCancel = () => {
    navigation.goBack();
  };

  const handlePressAdd = () => {
    addReviewFetch(note, comment, toiletId).then(({ status, data }) => {
      dispatch(addReview(data, note, comment, toiletId));
    });
  };

  const handlePressUpdate = () => {};

  const showButton = () => {
    if (isUpdate) {
      return <Button text={"Update"} btnColor={"#E2E52B"} />;
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
    height: "80%",
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
  },
});

export default ReviewForm;
