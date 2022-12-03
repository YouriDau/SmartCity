import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Title from "../../components/Title";
import useFetchPerson from "../../services/useFetchPerson";
import { ScrollView } from "react-native-gesture-handler";
import { ACCOUNT_MODIFY_SUCCESS } from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UpdateForm = ({ navigation }) => {
  const [pseudo, setPseudo] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");

  const { getCurrentUserFetch, updatePersonFetch } = useFetchPerson();

  useEffect(() => {
    getCurrentUserFetch().then(({ status, user }) => {
      setPseudo(user.pseudo);
      setLastName(user.lastName);
      setFirstName(user.firstName);
      setEmail(user.email);
    });
  }, []);

  const handlePressUpdate = () => {
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
          if (email === "") {
            alert += "email ";
            Alert.alert(alert);
          } else {
            updatePersonFetch(pseudo, lastName, firstName, email).then(
              (response) => {
                if (response.status === 200) {
                  Alert.alert(ACCOUNT_MODIFY_SUCCESS);
                  AsyncStorage.setItem("token", response.data);
                  navigation.navigate("Maps");
                }
              }
            );

            setPseudo("");
            setLastName("");
            setFirstName("");
            setEmail("");
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
      <Title text={"Modify account"} />
      <ScrollView style={styles.form}>
        <Text style={styles.inputText}>Pseudo</Text>
        <TextInput
          style={styles.input}
          value={pseudo}
          onChangeText={setPseudo}
        />

        <Text style={styles.inputText}>Last name</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
        />

        <Text style={styles.inputText}>First name</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
        />

        <Text style={styles.inputText}>Email</Text>
        <TextInput
          style={styles.input}
          textContentType={"emailAddress"}
          value={email}
          onChangeText={setEmail}
        />
      </ScrollView>
      <View style={styles.buttons}>
        <Button
          text={"cancel"}
          textColor={"white"}
          btnColor={"grey"}
          handlePress={handlePressCancel}
        />
        <Button
          text={"Update"}
          btnColor={"#E2E52B"}
          handlePress={handlePressUpdate}
        />
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

export default UpdateForm;
