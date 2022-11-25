import axios from "axios";
import { BASE_URL_API } from "../../config";

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
      last_name: lastName,
      first_name: firstName,
      email,
      is_admin: false,
      password,
    },
  }).then((response) => {
    switch (response.status) {
      case 201:
        console.log("Insert Réussi!");
        break;
      default:
        console.log("Add user default switch");
    }
  });
};

export { getPersonById, addPersonFetch };
