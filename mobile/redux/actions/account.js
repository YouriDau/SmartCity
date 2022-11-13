import { ADD_USER, DELETE_USER } from "./actionsType";

export function addUser(pseudo, lastname, firstname, password, email) {
  return {
    type: ADD_USER,
    payload: { pseudo, lastname, firstname, password, email },
  };
}

export function deleteUser(id) {
  return {
    type: DELETE_USER,
    payload: { id },
  };
}
