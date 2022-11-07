import { View, Text, StyleSheet, TextInput } from "react-native";
import Title from "./Title";
import Slider from "@react-native-community/slider";
import { useState } from "react";
import Button from "./Button";

const PLACEHOLDER = "Enter your review here";
const NOTE_MIN = 1;
const NOTE_MAX = 5;

const ReviewForm = (props) => {
  const userNote = props.note || "";
  const userComment = props.comment || "";
  const isUpdate = props.isUpdate;

  const [note, setNote] = useState(NOTE_MIN);
  const [comment, setComment] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Title text={(isUpdate ? "Update" : "Add") + " review"} />
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
        <Button text={"Cancel"} textColor={"white"} btnColor={"grey"} />
        {isUpdate ? (
          <Button text={"Update"} btnColor={"#E2E52B"} />
        ) : (
          <Button text={"Submit"} />
        )}
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
