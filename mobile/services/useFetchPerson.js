import axios from "axios";
import { backOff } from "exponential-backoff";
import { useSelector } from "react-redux";
import { BASE_URL_API } from "../config";
import { getToken } from "../redux/selectors";
import { errorMessage } from "../utils/utils";

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
      return { status: response.status, id: response.data };
    } catch (error) {
      const message = errorMessage(
        error.response.status,
        error.response.data,
        "Account"
      );
      throw new Error(message);
    }
  };

  const deletePersonFetch = async (token, password) => {
    try {
      const response = await axios({
        method: "delete",
        url: `${BASE_URL_API}/person`,
        data: {
          password,
        },
        headers: {
          authorization: `Bearer ${token}`,
        },
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

  const updatePersonFetch = async (
    token,
    pseudo,
    lastName,
    firstName,
    email
  ) => {
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
        headers: {
          authorization: `Bearer ${token}`,
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

  const updatePasswordFetch = async (token, currentPassword, newPassword) => {
    try {
      const response = await axios({
        method: "put",
        url: `${BASE_URL_API}/person/currentUserPassword`,
        data: {
          password: currentPassword,
          newPassword,
        },
        headers: {
          authorization: `Bearer ${token}`,
        },
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

  const getCurrentUserFetch = async (token) => {
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
    updatePasswordFetch,
    getCurrentUserFetch,
  };
}
