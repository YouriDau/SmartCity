import { Pressable, Text, StyleSheet } from "react-native";

const Button = ({ text, textColor, btnColor, handlePress }) => {
  text = text || "Submit";
  textColor = textColor || "black";
  btnColor = btnColor || "#64C11B";
  handlePress = handlePress || (() => {});

  return (
    <Pressable
      style={[styles.container, { backgroundColor: btnColor }]}
      onPress={() => {
        handlePress();
      }}
    >
      <Text style={[styles.pressableText, { color: textColor }]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 8,
    width: 140,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  pressableText: {
    fontSize: 18,
  },
});

export default Button;
