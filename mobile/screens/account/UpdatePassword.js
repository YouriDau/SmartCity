import { useState } from "react";
import { StyleSheet, Text, View, TextInput, Alert } from "react-native";
import { useSelector } from "react-redux";
import Button from "../../components/Button";
import Title from "../../components/Title";
import { getToken } from "../../redux/selectors";
import useFetchPerson from "../../services/useFetchPerson";

const UpdatePassword = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const token = useSelector(getToken);

  const { updatePasswordFetch } = useFetchPerson();

  const handlePressCancel = () => {};

  const handlePressUpdate = () => {
    if (newPassword !== newPasswordConfirm) {
      Alert.alert("The first password is not the same as the second one!");
    } else {
      updatePasswordFetch(token, currentPassword, newPasswordConfirm)
        .then((status) => {
          if (status === 204) {
            Alert.alert("Success, your password has been successfully modify");
            setCurrentPassword("");
            setNewPassword("");
            setNewPasswordConfirm("");
            navigation.navigate("Maps");
          }
        })
        .catch((error) => {
          Alert.alert(error.message);
        });
    }
  };
  return (
    <View style={styles.container}>
      <Title text={"Modify password"} />
      <View style={styles.form}>
        <Text style={styles.inputText}>Current password</Text>
        <TextInput
          style={styles.input}
          value={currentPassword}
          keyboardType={"visible-password"}
          onChangeText={setCurrentPassword}
          secureTextEntry
          autoFocus
        />
        <Text style={styles.inputText}>New password</Text>
        <TextInput
          style={styles.input}
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />
        <Text style={styles.inputText}>Confirm new password</Text>
        <TextInput
          style={styles.input}
          value={newPasswordConfirm}
          onChangeText={setNewPasswordConfirm}
          secureTextEntry
        />
      </View>
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

export default UpdatePassword;
