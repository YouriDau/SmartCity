import { ADD_USER, DELETE_USER } from "../actions/actionsType";

initialState = [];

export const account = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return [
        ...state,
        {
          pseudo: action.payload.pseudo,
          lastName: action.payload.lastName,
          firstName: action.payload.firstName,
          email: action.payload.email,
          password: action.payload.password,
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
