import { View, Text, TextInput, StyleSheet } from "react-native";
import CheckBox from "expo-checkbox";
import { useState } from "react";
import Title from "../../components/Title";
import Button from "../../components/Button";

const DeleteForm = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handlePressCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Title text={"Delete form"} />
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
        <Button text={"Delete"} btnColor={"#D42929"} />
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
