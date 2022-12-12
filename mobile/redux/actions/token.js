import { SET_TOKEN } from "./actionsType";

export function setToken(token) {
  return {
    type: SET_TOKEN,
    payload: { token },
  };
}
