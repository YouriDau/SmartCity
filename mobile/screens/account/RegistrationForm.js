import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import Title from "../../components/Title";
import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/actions/account";
import { ScrollView } from "react-native-gesture-handler";
import useFetchPerson from "../../services/useFetchPerson";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PLACEHOLDERS = {
  pseudo: "Your pseudo here",
  lastName: "Your last name here",
  firstName: "Your first name here",
  password: "Your password here",
  email: "Your email here",
};

const RegistrationForm = ({ navigation }) => {
  const dispatch = useDispatch();
  const { addPersonFetch, loginFetch } = useFetchPerson();

  const [pseudo, setPseudo] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handlePressRegister = () => {
    let alert = "Please enter your ";
    if (pseudo === "") {
      alert += "pseudo ";
      Alert.alert(alert);
    } else {
      if (lastName === "") {
        alert += "last name ";
        Alert.alert(alert);
      } else {
        if (firstName === "") {
          alert += "first name ";
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
              addPersonFetch(pseudo, lastName, firstName, email, password)
                .then((status) => {
                  dispatch(
                    addUser(
                      { pseudo },
                      { lastName },
                      { firstName },
                      { email },
                      { password }
                    )
                  );
                  console.log(status);
                  switch (status) {
                    case 201:
                      Alert.alert(
                        "Success",
                        "Congratulation, your account was successfully created!"
                      );

                      break;
                    default:
                      console.log("Add user default switch");
                  }
                })
                .then(() => {
                  loginFetch(pseudo, password)
                    .then((result) => {
                      if (result.status === 200) {
                        AsyncStorage.setItem("token", result.data);
                        navigation.navigate("MenuConnected");
                      } else {
                        Alert.alert("Pseudo or password incorect!");
                      }
                    })
                    .catch((error) => console.error("loginFetchError", error));
                });

              setPseudo("");
              setLastName("");
              setFirstName("");
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

        <Text style={styles.inputText}>Last name</Text>
        <TextInput
          style={styles.input}
          placeholder={PLACEHOLDERS.lastName}
          onChangeText={setLastName}
          value={lastName}
        />

        <Text style={styles.inputText}>First name</Text>
        <TextInput
          style={styles.input}
          placeholder={PLACEHOLDERS.firstName}
          onChangeText={setFirstName}
          value={firstName}
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
    backgroundColor: "white",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default RegistrationForm;
