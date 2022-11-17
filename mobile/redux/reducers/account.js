import { ADD_USER, DELETE_USER } from "../actions/actionsType";
import useFetchPerson from "../../services/useFetchPerson";

const { addPerson } = useFetchPerson();

initialState = [];

export const account = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      const pseudo = action.payload.pseudo;
      const lastname = action.payload.lastname;
      const firstname = action.payload.firstname;
      const email = action.payload.email;
      const password = action.payload.password;

      addPerson(pseudo, lastname, firstname, email, password);

      return [
        ...state,
        {
          pseudo,
          lastname,
          firstname,
          email,
          password,
        },
      ];
    case DELETE_USER:
      return state.filter((user) => user.id != action.payload.id);
    // case VERIFY_USER_EXISTING:
    //   return "";
    default:
      return initialState;
  }
};
