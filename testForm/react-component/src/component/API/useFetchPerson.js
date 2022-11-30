import axios from "axios";
import { BASE_URL_API } from "../../config";

const getAllPersonsFetch = async () => {
  try {
    const response = await axios.get(`${BASE_URL_API}/person`);
    return response.data;
  } catch (error) {
    console.error("getAllPersonsFetchError", error)
  }
}

const getPersonById = async (id) => {
  try {
    const response = await axios.get(BASE_URL_API, {
      params: { id },
    });
    return response.data;
  } catch (error) {
    console.error("getPersonByIdError", error);
  }
};

const addPersonFetch = async (pseudo, lastName, firstName, email, password) => {
  console.log(BASE_URL_API);
  await axios({
    method: "post",
    url: `${BASE_URL_API}/person`,
    data: {
      pseudo,
      lastName,
      firstName,
      email,
      password,
    },
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    return response.status;
  });
};

export { getAllPersonsFetch, getPersonById, addPersonFetch };
