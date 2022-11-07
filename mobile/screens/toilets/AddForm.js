import { View, Text, StyleSheet } from "react-native";
import CheckBox from "expo-checkbox";
import Title from "../../components/Title";
import Button from "../../components/Button";

const AddToilet = () => {
  return (
    <View style={styles.container}>
      <Title text={"Add toilet"} />
      <View style={styles.content}>
        <View style={styles.checkBoxContainer}>
          <CheckBox style={styles.checkbox} />
          <Text>The toilet is free</Text>
        </View>
        <View style={styles.checkBoxContainer}>
          <CheckBox style={styles.checkbox} />
          <Text>The toilet is for reduce mobility people</Text>
        </View>
      </View>
      <View style={styles.buttons}>
        <Button text={"Cancel"} textColor={"white"} btnColor={"grey"} />
        <Button />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginTop: 50,
    width: "100%",
  },
  checkBoxContainer: {
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 30,
  },
  checkbox: {
    marginRight: 15,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default AddToilet;
