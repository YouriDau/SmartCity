import { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import Title from "../../components/Title";
import Button from "../../components/Button";

const PLACEHOLDERS = {
  pseudo: "Your pseudo here",
  lastname: "Your lastname here",
  firstname: "Your firstname here",
  password: "Your password here",
  email: "Your email here",
};

const LoginForm = () => {
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Title text={"Login"} />
      <View style={styles.form}>
        <Text style={styles.inputText}>Pseudo</Text>
        <TextInput
          style={styles.input}
          placeholder={PLACEHOLDERS.pseudo}
          onChangeText={setPseudo}
        />

        <Text style={styles.inputText}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder={PLACEHOLDERS.password}
          secureTextEntry
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.buttons}>
        <Button text={"cancel"} textColor={"white"} btnColor={"grey"} />
        <Button text={"login"} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    flex: 1,
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  inputText: {
    paddingTop: 10,
  },
  input: {
    borderWidth: 1,
    padding: 4,
    borderColor: "lightgrey",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default LoginForm;
