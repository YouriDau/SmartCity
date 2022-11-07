import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import Title from "../../components/Title";
import Button from "../../components/Button";

const PLACEHOLDERS = {
  pseudo: "Your pseudo here",
  lastname: "Your lastname here",
  firstname: "Your firstname here",
  password: "Your password here",
  email: "Your email here",
};

const RegistrationForm = ({ navigation }) => {
  const [pseudo, setPseudo] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstame] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handlePressCancel = () => {
    navigation.navigate("Maps");
  };

  return (
    <View style={styles.container}>
      <Title text="Registration" />
      <View style={styles.form}>
        <Text style={styles.inputText}>Pseudo</Text>
        <TextInput
          style={styles.input}
          placeholder={PLACEHOLDERS.pseudo}
          onChangeText={setPseudo}
        />

        <Text style={styles.inputText}>Lastname</Text>
        <TextInput
          style={styles.input}
          placeholder={PLACEHOLDERS.lastname}
          onChangeText={setLastname}
        />

        <Text style={styles.inputText}>Firstname</Text>
        <TextInput
          style={styles.input}
          placeholder={PLACEHOLDERS.firstname}
          onChangeText={setFirstame}
        />

        <Text style={styles.inputText}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder={PLACEHOLDERS.password}
          secureTextEntry
          onChangeText={setPassword}
        />

        <Text style={styles.inputText}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder={PLACEHOLDERS.email}
          textContentType={"emailAddress"}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.buttons}>
        <Button
          text={"cancel"}
          textColor={"white"}
          btnColor={"grey"}
          handlePress={handlePressCancel}
        />
        <Button text={"register"} />
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

export default RegistrationForm;
