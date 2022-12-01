import axios from "axios";
import { Alert } from "react-native";
import { BASE_URL_API } from "../config";
import authHeader from "./authHeader";

export default function useFetchPerson() {
  const addPersonFetch = async (
    pseudo,
    lastName,
    firstName,
    email,
    password
  ) => {
    try {
      const response = await axios({
        method: "post",
        url: `${BASE_URL_API}/person`,
        data: {
          pseudo,
          lastName,
          firstName,
          email,
          password,
        },
      });
      console.log(response.status);
      return response.status;
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

  const loginFetch = async (pseudo, password) => {
    const response = await axios({
      method: "post",
      url: `${BASE_URL_API}/person/login`,
      data: {
        pseudo,
        password,
      },
    });
    return { status: response.status, data: response.data };
  };

  const logoutFetch = async () => {
    try {
      localStorage.removeItem("user");
    } catch (error) {
      console.error("logoutError", error);
    }
  };

  const getCurrentUserFetch = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${BASE_URL_API}/person/current`,
        headers: await authHeader(),
      });
      return { status: response.status, user: response.data };
    } catch (error) {
      console.error("getCurrentUserError", error);
    }
  };

  return {
    addPersonFetch,
    loginFetch,
    logoutFetch,
    getCurrentUserFetch,
  };
}
