import { ADD_REVIEW, DELETE_REVIEW } from "../actions/actionsType";

initialState = [
  {
    id: 3645654444444445,
    date: "04/11/2022",
    note: 4,
    comment: "test",
  },
  {
    id: 0, 
    date: "28/12/2022",
    note: 4,
    comment: "test",
  },
  {
    id: 1,
    date: "05/11/2022",
    note: 4,
    comment: "test",
  },
  {
    id: 2,
    date: "05/11/2022",
    note: 4,
    comment: "test",
  },
  {
    id: 3,
    date: "05/11/2022",
    note: 4,
    comment: "test",
  },
  {
    id: 4,
    date: "05/11/2022",
    note: 4,
    comment: "test",
  },
  {
    id: 5,
    date: "05/11/2022",
    note: 4,
    comment: "test",
  },
  {
    id: 6,
    date: "05/11/2022",
    note: 4,
    comment: "test",
  },
  {
    id: 7,
    date: "05/11/2022",
    note: 4,
    comment: "test",
  },
  {
    id: 8,
    date: "05/11/2022",
    note: 4,
    comment: "test",
  },
];

export const review = (state = initialState, action) => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formatedDate = `${day}/${month}/${year}`;

  switch(action.type) {
    case ADD_REVIEW:
      return [
        ...state,
        {
          id: state.length,
          date: formatedDate,
          note: action.payload.note,
          comment: action.payload.comment,
        }
      ];
    case DELETE_REVIEW:
      return state.filter(review => review.id != action.payload.id);
    default:
      return initialState;
  }
};
