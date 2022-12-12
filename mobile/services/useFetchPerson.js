import axios from "axios";
import { Alert } from "react-native";
import { useSelector } from "react-redux";
import { BASE_URL_API } from "../config";
import { getToken } from "../redux/selectors";
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
      console.error("deletePersonFetchError", error);
      if (error.response.status === 400) {
        Alert.alert("Error, the password is wrong");
      }
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

      return { status: response.status, data: response.data };
    } catch (error) {
      console.error("updatePersonFetch", error);
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

  const getCurrentUserFetch = async () => {
    // console.log("début getCurrentUserFetch");
    console.log(token);
    try {
      const response = await axios({
        method: "get",
        url: `${BASE_URL_API}/person/current`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      // console.log("fin getCurrentUserFetch");
      return { status: response.status, user: response.data };
    } catch (error) {
      console.error("getCurrentUserFetchError", error);
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
