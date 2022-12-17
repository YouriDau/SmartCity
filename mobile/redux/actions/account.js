import { SET_USER } from "./actionsType";

export function setUser(id, pseudo, lastName, firstName, email) {
  return {
    type: SET_USER,
    payload: { id, pseudo, lastName, firstName, email },
  };
}
