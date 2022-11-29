import { SET_REVIEWS, ADD_REVIEW, DELETE_REVIEW } from "../actions/actionsType";

initialState = [];

export const review = (state = initialState, action) => {
  const date = new Date();
  date.toLocaleDateString("fr");

  switch (action.type) {
    case SET_REVIEWS:
      state = action.payload.reviews;
      return state;
    case ADD_REVIEW:
      const note = action.payload.note;
      const comment = action.payload.comment;
      const toiletId = action.payload.toiletId;

      return [
        ...state,
        {
          id: state.length,
          date: formatedDate,
          note,
          comment,
          toiletId,
        },
      ];
    case DELETE_REVIEW:
      return state.filter((review) => review.id != action.payload.id);
    default:
      return initialState;
  }
};
