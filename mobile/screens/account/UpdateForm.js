import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Title from "../../components/Title";
import useFetchPerson from "../../services/useFetchPerson";
import { ScrollView } from "react-native-gesture-handler";
import { ACCOUNT_MODIFY_SUCCESS } from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { getToken, getUser } from "../../redux/selectors";
import { validAccount } from "../../business/account";
import { setToken } from "../../redux/actions/token";
import { setUser } from "../../redux/actions/account";

const UpdateForm = ({ navigation }) => {
  const [pseudo, setPseudo] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const user = useSelector(getUser);
  const token = useSelector(getToken);

  const { updatePersonFetch } = useFetchPerson();
  const dispatch = useDispatch();

  useEffect(() => {
    setPseudo(user.pseudo);
    setLastName(user.lastName);
    setFirstName(user.firstName);
    setEmail(user.email);
  }, [user]);

  const handlePressUpdate = () => {
    const accountAlert = validAccount(pseudo, lastName, firstName, email);
    if (accountAlert !== undefined) {
      Alert.alert(accountAlert);
    } else {
      updatePersonFetch(token, pseudo, lastName, firstName, email).then(
        (response) => {
          if (response.status === 200) {
            Alert.alert(ACCOUNT_MODIFY_SUCCESS);
            AsyncStorage.setItem("token", response.token);
            dispatch(setToken(response.token));
            dispatch(setUser(user.id, pseudo, lastName, firstName, email));
            navigation.navigate("Maps");
          }
        }
      );
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
          autoFocus
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
          keyboardType={"email-address"}
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
