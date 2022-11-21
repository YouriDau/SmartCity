import axios from "axios";
import { Alert } from "react-native";

const BASE_URL_API = "http://192.168.1.53:3001/person";

export default function useFetchPerson() {
  const addPerson = async (pseudo, lastname, firstname, email, password) => {
    try {
      await axios({
        method: "post",
        url: BASE_URL_API,
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
              "Félicitation, vous avez créé votre compte avec succès"
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
          Alert.alert(
            "Le pseudo est déjà utilisé, veuillez en choisir un autre"
          );
          break;
        case 500:
          Alert.alert("Erreur lors de l'ajout, veuillez réessayer!");
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
