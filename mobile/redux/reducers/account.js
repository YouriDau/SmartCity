import { SET_USER } from "../actions/actionsType";

initialState = [];

export const account = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      state = {
        pseudo: action.payload.pseudo,
        lastName: action.payload.lastName,
        firstName: action.payload.firstName,
        email: action.payload.email,
      };
      return state;
    default:
      return state;
  }
};
