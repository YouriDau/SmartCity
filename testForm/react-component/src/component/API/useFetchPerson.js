import axios from "axios";
import axiosRetry from "axios-retry";
import { BASE_URL_API } from "../../config";
import { errorMessage } from "../../utils/utils";

axiosRetry(axios, {
  retries: 3,
  retryDelay: (retryCount) => {
    return retryCount * 2000;
  },
  retryCondition: (error) => {
    return error.response.status === 500;
  },
});

const getCurrentUserFetch = async (token) => {
  try {
    const response = await axios({
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

const getAllPersonsFetch = async () => {
  try {
    const response = await axios.get(`${BASE_URL_API}/person`);
    return response.data;
  } catch (error) {
    const message = errorMessage(
      error.response.status,
      error.response.data,
      "Account"
    );
    throw new Error(message);
  }
};

const getPersonByIdFetch = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL_API}/person/${id}`);
    return response.data;
  } catch (error) {
    const message = errorMessage(
      error.response.status,
      error.response.data,
      "Account"
    );
    throw new Error(message);
  }
};

const addPersonFetch = async (pseudo, lastName, firstName, email, password) => {
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
    const message = errorMessage(
      error.response.status,
      error.response.data,
      "Account"
    );
    throw new Error(message);
  }
};

const updatePersonFetch = async (token, pseudo, lastName, firstName, email) => {
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

const updatePersonByIdFetch = async (
  token,
  id,
  pseudo,
  lastName,
  firstName,
  email
) => {
  try {
    const response = await axios({
      method: "put",
      url: `${BASE_URL_API}/person/byId`,
      data: {
        id,
        pseudo,
        lastName,
        firstName,
        email,
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

const updateCurrentUserPasswordFetch = async (token, password, newPassword) => {
  try {
    const response = await axios({
      method: "put",
      url: `${BASE_URL_API}/person/currentUserPassword`,
      data: {
        password,
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

const updateUserPasswordFetch = async (token, id, newPassword) => {
  try {
    const response = await axios({
      method: "put",
      url: `${BASE_URL_API}/person/userPassword`,
      data: {
        id,
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

const deletePersonByIdFetch = async (id) => {
  try {
    const token = await localStorage.getItem("token");
    const response = await axios({
      method: "delete",
      url: `${BASE_URL_API}/person/deleteUser`,
      data: { id }, // data car aller voir dans le controller de l'api
      headers: {
        authorization: `Bearer ${token}`, // r??cup??rer le token dans le localStorage
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
    // on recoit l'objet status et on prend seulement ce qui nous int??resse
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

export {
  getCurrentUserFetch,
  getAllPersonsFetch,
  getPersonByIdFetch,
  addPersonFetch,
  updatePersonFetch,
  updatePersonByIdFetch,
  updateCurrentUserPasswordFetch,
  updateUserPasswordFetch,
  deletePersonByIdFetch,
  loginFetch,
};
