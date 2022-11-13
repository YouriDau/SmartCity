import { ADD_MAP_MARKER } from "../actions/actionsType";

initialState = [
  {
    id: 0,
    title: "1 toilet",
    description: "Toilet 1 Description",
    location: {
      latitude: 50.46535,
      longitude: 4.86461,
    },
  },
  {
    id: 1,
    title: "2 toilet",
    description: "Toilet 2 Description",
    location: {
      latitude: 50.47104,
      longitude: 4.85807,
    },
  },
];

export const map = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MAP_MARKER:
      return [
        ...state,
        {
          id: initialState.length,
          title: "test",
          description: "description test",
          location: {
            latitude: action.payload.lat,
            longitude: action.payload.lon,
          },
        },
      ];
    default:
      return initialState;
  }
};
