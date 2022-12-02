import {
  SET_REVIEWS,
  ADD_REVIEW,
  DELETE_REVIEW,
  UPDATE_REVIEW,
} from "./actionsType";

export function setReviews(reviews) {
  return {
    type: SET_REVIEWS,
    payload: { reviews },
  };
}

export function addReview(id, note, comment, toiletId) {
  return {
    type: ADD_REVIEW,
    payload: { id, note, comment, toiletId },
  };
}

export function deleteReview(id) {
  return {
    type: DELETE_REVIEW,
    payload: { id },
  };
}

export function updateReview(id, note, comment) {
  return {
    type: UPDATE_REVIEW,
    payload: { id, note, comment },
  };
}
