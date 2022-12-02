import {
  SET_REVIEWS,
  ADD_REVIEW,
  DELETE_REVIEW,
  UPDATE_REVIEW,
} from "../actions/actionsType";

initialState = [];

export const review = (state = initialState, action) => {
  const date = new Date();
  date.toLocaleDateString("fr");
  const dateFormated = toString(date);

  switch (action.type) {
    case SET_REVIEWS:
      state = action.payload.reviews;
      return state;
    case ADD_REVIEW:
      const id = action.payload.id;
      const note = action.payload.note;
      const comment = action.payload.comment;
      const toiletId = action.payload.toiletId;

      return [
        ...state,
        {
          id,
          date: dateFormated,
          note,
          comment,
          toiletId,
        },
      ];
    case DELETE_REVIEW:
      return state.filter((review) => review.id != action.payload.id);
    case UPDATE_REVIEW:
      state.forEach((review) => {
        if (review.id === action.payload.id) {
          review.note = action.payload.note;
          review.comment = action.payload.comment;
        }
      });
      return state;
    default:
      return initialState;
  }
};
