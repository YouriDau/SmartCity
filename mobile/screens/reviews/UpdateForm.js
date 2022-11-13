import { View, Text, StyleSheet, TextInput } from "react-native";
import Title from "../../components/Title";
import Slider from "@react-native-community/slider";
import { useState } from "react";
import Button from "../../components/Button";
import ReviewForm from "../../components/ReviewForm";


const UpdateForm = ({ navigation, route }) => {
  const id = route.params.id;
  
  return (
    <ReviewForm
      isUpdate={true}
      navigation={navigation}
      id={id}
    />
  );
};

export default UpdateForm;
