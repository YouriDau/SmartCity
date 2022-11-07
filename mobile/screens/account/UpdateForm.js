import { View, Text, TextInput, StyleSheet } from "react-native";
import { useState } from "react";
import Button from "../../components/Button";
import Title from "../../components/Title";

const UpdateForm = () => {
  const [pseudo, setPseudo] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  return (
    <View style={styles.container}>
      <Title text={"Modify account"} />
      <View style={styles.form}>
        <Text style={styles.inputText}>Pseudo</Text>
        <TextInput style={styles.input} onChangeText={setPseudo} />

        <Text style={styles.inputText}>Lastname</Text>
        <TextInput style={styles.input} onChangeText={setLastname} />

        <Text style={styles.inputText}>Firstname</Text>
        <TextInput style={styles.input} onChangeText={setFirstname} />

        <Text style={styles.inputText}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          onChangeText={setPassword}
        />

        <Text style={styles.inputText}>Email</Text>
        <TextInput
          style={styles.input}
          textContentType={"emailAddress"}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.buttons}>
        <Button text={"cancel"} textColor={"white"} btnColor={"grey"} />
        <Button text={"Update"} btnColor={"#E2E52B"} />
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

export default UpdateForm;
