import { ADD_USER, DELETE_USER } from "./actionsType";

export function addUser(pseudo, lastName, firstName, email, password) {
  return {
    type: ADD_USER,
    payload: { pseudo, lastName, firstName, email, password },
  };
}

export function deleteUser(id) {
  return {
    type: DELETE_USER,
    payload: { id },
  };
}
