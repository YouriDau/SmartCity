import { SET_USER, DELETE_USER } from "../actions/actionsType";

initialState = [];

export const account = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      state = {
        pseudo: action.payload.pseudo,
        lastName: action.payload.lastName,
        firstName: action.payload.firstName,
        email: action.payload.email,
        password: action.payload.password,
      };
      return state;
    case DELETE_USER:
      return state.filter((user) => user.id != action.payload.id);
    default:
      return initialState;
  }
};
