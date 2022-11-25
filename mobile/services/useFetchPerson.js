import axios from "axios";
import { Alert } from "react-native";
import { BASE_URL_API } from "../config";

export default function useFetchPerson() {
  const addPerson = async (pseudo, lastname, firstname, email, password) => {
    try {
      await axios({
        method: "post",
        url: `${BASE_URL_API}/person`,
        data: {
          pseudo,
          last_name: lastname,
          first_name: firstname,
          email,
          is_admin: false,
          password,
        },
      }).then(function (response) {
        switch (response.status) {
          case 201:
            Alert.alert(
              "Success",
              "Congratulation, your account was successfully created!"
            );
            break;
          default:
            console.log("Add user default switch");
        }
      });
    } catch (error) {
      console.error("addPersonError", error);
      switch (error.response.status) {
        case 409:
          Alert.alert("Retry", "This pseudo is already used!");
          break;
        case 500:
          Alert.alert(
            "Error",
            "There was an error during the creation, retry!"
          );
          break;
        default:
          console.log("Add user error default switch");
      }
    }
  };

  return {
    addPerson,
  };
}
