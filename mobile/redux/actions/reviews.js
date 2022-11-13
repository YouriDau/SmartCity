import { DELETE_REVIEW } from "./actionsType";

export function deleteReview(id) {
  return {
    type: DELETE_REVIEW,
    payload: { id },
  };
}
