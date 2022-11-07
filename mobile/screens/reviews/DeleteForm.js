import { View, Text, StyleSheet } from "react-native";
import Title from "../../components/Title";
import Button from "../../components/Button";

const DeleteForm = () => {
  return (
    <View style={styles.container}>
      <Title text={"Delete review"} />
      <View style={styles.content}>
        <Text style={styles.text}>
          Are you sure you want to delete this review?
        </Text>
      </View>

      <View style={styles.buttons}>
        <Button text={"Cancel"} textColor={"white"} btnColor={"grey"} />
        <Button text={"Yes"} btnColor={"red"} />
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
    height: "80%",
  },
  buttons: {
    width: "100%",
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default DeleteForm;
