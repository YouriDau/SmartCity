import axios from "axios";
import { Alert } from "react-native";
import { BASE_URL_API } from "../config";
import { useJwt } from "react-jwt";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useFetchUser() {
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
    loginFetch,
    logoutFetch,
    getCurrentUserFetch,
  };
}
