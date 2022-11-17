import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import Title from "../../components/Title";
import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/actions/account";
import { ScrollView } from "react-native-gesture-handler";

const PLACEHOLDERS = {
  pseudo: "Your pseudo here",
  lastname: "Your lastname here",
  firstname: "Your firstname here",
  password: "Your password here",
  email: "Your email here",
};

const RegistrationForm = ({ navigation }) => {
  const dispatch = useDispatch();

  const [pseudo, setPseudo] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstame] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handlePressRegister = () => {
    let alert = "Please enter your ";
    if (pseudo === "") {
      alert += "pseudo ";
      Alert.alert(alert);
    } else {
      if (lastname === "") {
        alert += "lastname ";
        Alert.alert(alert);
      } else {
        if (firstname === "") {
          alert += "firstname ";
          Alert.alert(alert);
        } else {
          if (password === "") {
            alert += "password ";
            Alert.alert(alert);
          } else {
            if (email === "") {
              alert += "email";
              Alert.alert(alert);
            } else {
              dispatch(addUser(pseudo, lastname, firstname, email, password));

              setPseudo("");
              setLastname("");
              setFirstame("");
              setPassword("");
              setEmail("");
            }
          }
        }
      }
    }
  };

  const handlePressCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Title text="Registration" />
      <ScrollView style={styles.form}>
        <Text style={styles.inputText}>Pseudo</Text>
        <TextInput
          style={styles.input}
          placeholder={PLACEHOLDERS.pseudo}
          onChangeText={setPseudo}
          value={pseudo}
        />

        <Text style={styles.inputText}>Lastname</Text>
        <TextInput
          style={styles.input}
          placeholder={PLACEHOLDERS.lastname}
          onChangeText={setLastname}
          value={lastname}
        />

        <Text style={styles.inputText}>Firstname</Text>
        <TextInput
          style={styles.input}
          placeholder={PLACEHOLDERS.firstname}
          onChangeText={setFirstame}
          value={firstname}
        />

        <Text style={styles.inputText}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder={PLACEHOLDERS.password}
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />

        <Text style={styles.inputText}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder={PLACEHOLDERS.email}
          textContentType={"emailAddress"}
          onChangeText={setEmail}
          value={email}
        />
      </ScrollView>
      <View style={styles.buttons}>
        <Button
          text={"cancel"}
          textColor={"white"}
          btnColor={"grey"}
          handlePress={handlePressCancel}
        />
        <Button text={"register"} handlePress={handlePressRegister} />
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
