import axios from "axios";

const BASE_URL_API = "http://192.168.1.53:3001/person";

export default function useFetchPerson() {
  const addPerson = async (pseudo, lastname, firstname, email, password) => {
    try {
      await axios({
        method: "post",
        url: BASE_URL_API,
        data: {
          pseudo,
          last_name: lastname,
          first_name: firstname,
          email,
          is_admin: false,
          password,
        },
      });
    } catch (error) {
      console.error("addPersonError", error);
    }
  };

  return {
    addPerson,
  };
}
