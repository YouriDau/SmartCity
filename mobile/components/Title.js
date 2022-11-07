import { Text, StyleSheet } from "react-native";

const Title = (props) => {
  const text = props.text || "Enter a text";
  return <Text style={styles.text}>{text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    textAlign: "center",
    textDecorationLine: "underline",
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 60,
  },
});

export default Title;
