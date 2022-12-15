import axios from "axios";
import { Alert } from "react-native";
import { useSelector } from "react-redux";
import { BASE_URL_API } from "../config";
import { getToken } from "../redux/selectors";
import { errorMessage } from "../utils/utils";
import authHeader from "./authHeader";

export default function useFetchPerson() {
  const token = useSelector(getToken);

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

  const deletePersonFetch = async (password) => {
    try {
      const response = await axios({
        method: "delete",
        url: `${BASE_URL_API}/person`,
        data: {
          password,
        },
        headers: await authHeader(),
      });
      return response.status;
    } catch (error) {
      const message = errorMessage(
        error.response.status,
        error.response.data,
        "Account"
      );
      throw new Error(message);
    }
  };

  const updatePersonFetch = async (pseudo, lastName, firstName, email) => {
    try {
      const response = await axios({
        method: "put",
        url: `${BASE_URL_API}/person`,
        data: {
          pseudo,
          lastName,
          firstName,
          email,
        },
        headers: await authHeader(),
      });

      return { status: response.status, token: response.data };
    } catch (error) {
      const message = errorMessage(
        error.response.status,
        error.response.data,
        "Account"
      );
      throw new Error(message);
    }
  };

  const loginFetch = async (pseudo, password) => {
    try {
      const response = await axios({
        method: "post",
        url: `${BASE_URL_API}/person/login`,
        data: {
          pseudo,
          password,
        },
      });
      return { status: response.status, token: response.data };
    } catch (error) {
      const message = errorMessage(
        error.response.status,
        error.response.data,
        "Account"
      );
      throw new Error(message);
    }
  };

  const getCurrentUserFetch = async () => {
    console.log(token);
    try {
      const response = await axios({
        method: "get",
        url: `${BASE_URL_API}/person/current`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return { status: response.status, user: response.data };
    } catch (error) {
      const message = errorMessage(
        error.response.status,
        error.response.data,
        "Account"
      );
      throw new Error(message);
    }
  };

  return {
    addPersonFetch,
    deletePersonFetch,
    updatePersonFetch,
    loginFetch,
    getCurrentUserFetch,
  };
}
