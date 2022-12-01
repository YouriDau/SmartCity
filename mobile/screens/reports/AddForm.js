import { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import Button from "../../components/Button";
import Title from "../../components/Title";

const PLACEHOLDER = "Enter your problem here";

const AddForm = ({ navigation }) => {
  const [report, setReport] = useState("");

  const handlePressCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Title text={"Report toilet"} />
      <View style={styles.content}>
        <Text>What is the problem ?</Text>
        <TextInput
          style={styles.input}
          multiline
          maxLength={300}
          placeholder={PLACEHOLDER}
          scrollEnabled={true}
          onChangeText={setReport}
        />
      </View>

      <View style={styles.buttons}>
        <Button
          text={"Cancel"}
          textColor={"white"}
          btnColor={"grey"}
          handlePress={handlePressCancel}
        />
        <Button text={"Report"} />
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
    flex: 1,
    marginTop: 50,
    width: "80%",
  },
  input: {
    width: "100%",
    height: 200,
    borderWidth: 1,
    borderRadius: 7,
    textAlignVertical: "top",
    padding: 15,
    backgroundColor: "white",
  },
  buttons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default AddForm;
