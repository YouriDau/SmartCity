import { SET_USER, DELETE_USER } from "./actionsType";

export function setUser(pseudo, lastName, firstName, email, password) {
  return {
    type: SET_USER,
    payload: { pseudo, lastName, firstName, email, password },
  };
}

export function deleteUser(id) {
  return {
    type: DELETE_USER,
    payload: { id },
  };
}
