import { View, Text, StyleSheet, TextInput } from "react-native";
import Title from "../../components/Title";
import Slider from "@react-native-community/slider";
import { useState } from "react";
import Button from "../../components/Button";
import ReviewForm from "../../components/ReviewForm";

const AddForm = ({ navigation, route }) => {
  const { toiletId } = route.params;
  return (
    <ReviewForm isUpdate={false} toiletId={toiletId} navigation={navigation} />
  );
};

export default AddForm;
