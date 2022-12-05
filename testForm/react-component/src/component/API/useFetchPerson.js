import axios from "axios";
import { BASE_URL_API } from "../../config";

const getAllPersonsFetch = async () => {
  try {
    const response = await axios.get(`${BASE_URL_API}/person`);
    return response.data;
  } catch (error) {
    console.error("getAllPersonsFetchError", error);
  }
};

const getPersonById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL_API}/person`, {
      params: { id }, // params --> pour les liens
    });
    return response.data;
  } catch (error) {
    console.error("getPersonByIdError", error);
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
    console.error("addPersonFetchError", error);
  }
};

const deletePersonByIdFetch = async (id) => {
  try {
    const response = await axios({
      method: "delete",
      url: `${BASE_URL_API}/person/user`,
      data: { id }, // data car aller voir dans le controller de l'api
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}` // récupérer le token dans le localStorage
      }
    });
    return response.status;
  } catch (error) {
    console.error("deletePersonFetchError", error);
  }
}

const loginFetch = async (pseudo, password) => {
  try {
    const response = await axios({
      method: "post",
      url: `${BASE_URL_API}/person/login`,
      data: {
        pseudo,
        password,
      }
    });
    console.log(response);
    // on recoit l'objet status et on prend seulement ce qui nous intéresse
    return { status: response.status, data : response.data};
  } catch(error) {
    console.error("loginFetchError", error);
  }
}

export { getAllPersonsFetch, getPersonById, addPersonFetch, deletePersonByIdFetch, loginFetch };
