import { SET_TOKEN } from "../actions/actionsType";

initialState = "";

export const token = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      state = action.payload.token;
      return state;
    default:
      return initialState;
  }
};
