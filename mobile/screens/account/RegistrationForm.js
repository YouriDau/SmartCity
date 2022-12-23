import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import Title from "../../components/Title";
import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/actions/account";
import { ScrollView } from "react-native-gesture-handler";
import useFetchPerson from "../../services/useFetchPerson";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { validAccount } from "../../business/account";
import { setToken } from "../../redux/actions/token";
import {
  MAX_LENGTH_EMAIL,
  MAX_LENGTH_FIRSTNAME,
  MAX_LENGTH_LASTNAME,
  MAX_LENGTH_PSEUDO,
} from "../../config";

const PLACEHOLDERS = {
  pseudo: "Your pseudo here",
  lastName: "Your last name here",
  firstName: "Your first name here",
  email: "Your email here",
  password: "Your password here",
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
    const accountAlert = validAccount(
      pseudo,
      lastName,
      firstName,
      email,
      password
    );
    if (accountAlert !== undefined) {
      Alert.alert(accountAlert);
    } else {
      addPersonFetch(pseudo, lastName, firstName, email, password)
        .then(({ status, id }) => {
          Alert.alert(
            "Success",
            "Congratulation, your account was successfully created!"
          );
          dispatch(setUser(id, pseudo, lastName, firstName, email));
        })
        .then(() => {
          loginFetch(pseudo, password)
            .then((response) => {
              if (response.status === 200) {
                AsyncStorage.setItem("token", response.token);
                dispatch(setToken(response.token));
                navigation.navigate("MenuConnected");
              }
            })
            .catch((error) => {
              Alert.alert(error.message);
            });
        })
        .catch((error) => {
          Alert.alert(error.message);
        });
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
          maxLength={MAX_LENGTH_PSEUDO}
          autoFocus
        />

        <Text style={styles.inputText}>Last name</Text>
        <TextInput
          style={styles.input}
          placeholder={PLACEHOLDERS.lastName}
          onChangeText={setLastName}
          value={lastName}
          maxLength={MAX_LENGTH_LASTNAME}
        />

        <Text style={styles.inputText}>First name</Text>
        <TextInput
          style={styles.input}
          placeholder={PLACEHOLDERS.firstName}
          onChangeText={setFirstName}
          value={firstName}
          maxLength={MAX_LENGTH_FIRSTNAME}
        />

        <Text style={styles.inputText}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder={PLACEHOLDERS.email}
          keyboardType={"email-address"}
          onChangeText={setEmail}
          value={email}
          maxLength={MAX_LENGTH_EMAIL}
        />

        <Text style={styles.inputText}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder={PLACEHOLDERS.password}
          secureTextEntry
          onChangeText={setPassword}
          value={password}
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
