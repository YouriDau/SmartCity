import axios from 'axios';

const URL_API = "http://192.168.1.10:3001/person";

const getPersonById = async (id) => {
    try {
        const response = await axios.get(URL_API, {
            params: { id }
        });
        return response.data;
    } catch (error) {
        console.error("getPersonByIdError", error);
    }
}

const addPersonFetch = async (pseudo, lastName, firstName, email, password) => {
    console.log("on passe bien dans addPersonFetch");
        await axios.post(URL_API, {
            params: {
                pseudo,
                last_name : lastName,
                first_name: firstName,
                email,
                is_admin: false,
                password
            }
        }).then(function (response) {
            switch (response.status) {
              case 201:
                console.log(
                  "Success, congratulation, your account was successfully created!"
                );
                break;
              default:
                console.log("Add user default switch");
            }
        });
}

export {getPersonById, addPersonFetch};