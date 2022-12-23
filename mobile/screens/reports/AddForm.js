import { useState } from "react";
import { View, TextInput, Text, StyleSheet, Alert } from "react-native";
import { useSelector } from "react-redux";
import Button from "../../components/Button";
import Title from "../../components/Title";
import {
  MAX_LENGTH_REASON,
  REASON_INPUT_EMPTY,
  REPORT_ADD_SUCCESS,
} from "../../config";
import { getToken } from "../../redux/selectors";
import useFetchReport from "../../services/useFetchReport";

const PLACEHOLDER = "Enter your problem here";

const AddForm = ({ navigation, route }) => {
  const [reason, setReason] = useState("");
  const token = useSelector(getToken);
  const toiletId = route.params.toiletId;

  const addReportFetch = useFetchReport();

  const handlePressCancel = () => {
    navigation.goBack();
  };

  const handlePressSubmit = () => {
    if (reason) {
      addReportFetch(token, reason, toiletId)
        .then((status) => {
          if (status === 201) {
            Alert.alert(REPORT_ADD_SUCCESS);
            navigation.navigate("Maps");
          }
        })
        .catch((error) => {
          Alert.alert(error.message);
        });
    } else {
      Alert.alert(REASON_INPUT_EMPTY);
    }
  };

  return (
    <View style={styles.container}>
      <Title text={`Report toilet ${toiletId}`} />
      <View style={styles.content}>
        <Text>What is the problem ?</Text>
        <TextInput
          style={styles.input}
          multiline
          placeholder={PLACEHOLDER}
          scrollEnabled={true}
          onChangeText={setReason}
          maxLength={MAX_LENGTH_REASON}
        />
      </View>

      <View style={styles.buttons}>
        <Button
          text={"Cancel"}
          textColor={"white"}
          btnColor={"grey"}
          handlePress={handlePressCancel}
        />
        <Button text="Report" handlePress={handlePressSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  content: {
    flex: 1,
    marginTop: 50,
    width: "80%",
  },
  input: {
    width: "100%",
    height: 200,
    borderWidth: 1,
    borderRadius: 7,
    textAlignVertical: "top",
    padding: 15,
    backgroundColor: "white",
  },
  buttons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default AddForm;
