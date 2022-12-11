import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import CheckBox from "expo-checkbox";
import { useState } from "react";
import Title from "../../components/Title";
import Button from "../../components/Button";

import useFetchPerson from "../../services/useFetchPerson";
import {
  ACCOUNT_DELETE_SUCCESS,
  DELETE_NOT_CHECK,
  PASSWORD_INPUT_EMPTY,
} from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DeleteForm = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const { deletePersonFetch } = useFetchPerson();

  const handlePressCancel = () => {
    navigation.goBack();
  };

  const handlePressDelete = () => {
    if (password !== "") {
      if (isChecked) {
        deletePersonFetch(password).then((status) => {
          if (status === 204) {
            Alert.alert(ACCOUNT_DELETE_SUCCESS);
            AsyncStorage.removeItem("token");
            navigation.navigate("MenuDisconnected");
          }
        });
      } else {
        Alert.alert(DELETE_NOT_CHECK);
      }
    } else {
      Alert.alert(PASSWORD_INPUT_EMPTY);
    }
  };

  return (
    <View style={styles.container}>
      <Title text={"Delete account"} />
      <View style={styles.passwordContainer}>
        <Text>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.checkBoxContainer}>
        <CheckBox
          style={styles.checkbox}
          disabled={false}
          value={isChecked}
          onValueChange={setIsChecked}
        />
        <Text>I want to delete my account</Text>
      </View>

      <View style={styles.buttons}>
        <Button
          text={"Cancel"}
          textColor={"white"}
          btnColor={"grey"}
          handlePress={handlePressCancel}
        />
        <Button
          text={"Delete"}
          btnColor={"#D42929"}
          handlePress={handlePressDelete}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  passwordContainer: {
    height: 100,
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    padding: 4,
    borderColor: "lightgrey",
    backgroundColor: "white",
  },
  checkBoxContainer: {
    flex: 1,
    width: "80%",
    justifyContent: "center",
    flexDirection: "row",
  },
  checkbox: {
    marginRight: 15,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default DeleteForm;
