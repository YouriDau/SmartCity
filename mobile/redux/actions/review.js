import { ADD_REVIEW, DELETE_REVIEW } from "./actionsType";

export function addReview(note, comment) {
  return {
    type: ADD_REVIEW,
    payload: {note, comment}
  }
}

export function deleteReview(id) {
  return {
    type: DELETE_REVIEW,
    payload: { id },
  };
}

export function updateReview(id) {
  return {
    type: UPDATE_REVIEW,
    payload: { id },
  }
}