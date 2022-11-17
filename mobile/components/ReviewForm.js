import { View, Text, StyleSheet, TextInput } from "react-native";
import Title from "./Title";
import Slider from "@react-native-community/slider";
import { useState } from "react";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { getReviews } from "../redux/selectors";
import { addReview } from "../redux/actions/review";

const PLACEHOLDER = "Enter your review here";
const NOTE_MIN = 1;
const NOTE_MAX = 5;

const ReviewForm = ({ navigation, isUpdate, id }) => {
  const [note, setNote] = useState();
  const [comment, setComment] = useState();

  const dispatch = useDispatch();

  const title = isUpdate ? "Update review " + id : "Add Review";
  const showButton = () => {
    if (isUpdate) {
      return <Button text={"Update"} btnColor={"#E2E52B"} />;
    } else {
      return <Button text={"Submit"} handlePress={handlePressAdd} />;
    }
  };

  const handlePressCancel = () => {
    navigation.goBack();
  };

  const handlePressAdd = () => {
    dispatch(addReview(note, comment));
    navigation.goBack();
  };

  const handlePressUpdate = () => {};

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
  },
  buttons: {
    width: "100%",
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default ReviewForm;
