import { ADD_REVIEW, DELETE_REVIEW } from "../actions/actionsType";
import useFetchReviews from "../../services/useFetchReviews";

const { deleteReviewFetch, addReviewFetch } = useFetchReviews();

initialState = [];

export const review = (state = initialState, action) => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formatedDate = `${day}/${month}/${year}`;

  switch (action.type) {
    case ADD_REVIEW:
      const note = action.payload.note;
      const comment = action.payload.comment;
      const toiletId = action.payload.toiletId;
      addReviewFetch(note, comment, toiletId);
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
      deleteReview(action.payload.id);
      return state.filter((review) => review.id != action.payload.id);
    default:
      return initialState;
  }
};
