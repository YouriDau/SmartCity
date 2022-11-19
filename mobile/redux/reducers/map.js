import { ADD_MAP_MARKER } from "../actions/actionsType";
import useFetchToilet from "../../services/useFetchToilets";

const { getToilets } = useFetchToilet();
const toilets = getToilets();
console.log(toilets);
initialState = [];

export const map = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MAP_MARKER:
      return [
        ...state,
        {
          id: state.length,
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
