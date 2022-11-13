import {
  ADD_USER,
  DELETE_USER,
} from "../actions/actionsType";

initialState = [
  {
    pseudo: "pseudo",
    lastname: "lastname",
    firstname: "firstname",
    password: "password",
    email: "email",
  },
];

export const account = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return [
        ...state,
        {
          pseudo: action.payload.pseudo,
          lastname: action.payload.lastname,
          firstname: action.payload.firstname,
          password: action.payload.password,
          email: action.payload.email,
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
