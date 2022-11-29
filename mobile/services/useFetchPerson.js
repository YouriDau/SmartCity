import axios from "axios";
import { Alert } from "react-native";
import { BASE_URL_API } from "../config";

export default function useFetchPerson() {
  const addPersonFetch = async (
    pseudo,
    lastname,
    firstname,
    email,
    password
  ) => {
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
    });
  };

  const loginFetch = async (pseudo, password) => {
    const response = await axios({
      method: "post",
      url: `${BASE_URL_API}/user/login`,
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
      return JSON.parse(localStorage.getItem("user"));
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
