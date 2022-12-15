import { SET_USER } from "./actionsType";

export function setUser(pseudo, lastName, firstName, email) {
  return {
    type: SET_USER,
    payload: { pseudo, lastName, firstName, email },
  };
}
