import { View, Text, StyleSheet, TextInput } from "react-native";
import Title from "../../components/Title";
import Slider from "@react-native-community/slider";
import { useState } from "react";
import Button from "../../components/Button";
import ReviewForm from "../../components/ReviewForm";

const CURRENT_NOTE = 3;
const CURRENT_COMMENT = "My current comment";

const UpdateForm = ({ navigation }) => {
  return (
    <ReviewForm
      isUpdate={true}
      note={CURRENT_NOTE}
      comment={CURRENT_COMMENT}
      navigation={navigation}
    />
  );
};

export default UpdateForm;
