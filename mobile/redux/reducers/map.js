import { ADD_MAP_MARKER } from "../actions/actionsType";
import useFetchToilet from "../../services/useFetchToilets";

const { getToilets, addToilet } = useFetchToilet();
//const toilets = getToilets();
//console.log(toilets);
initialState = [];

export const map = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MAP_MARKER:
      const latitude = action.payload.latitude;
      const longitude = action.payload.longitude;
      const isPaid = action.payload.isPaid;
      const isReducedMobility = action.payload.isReducedMobility;
      addToilet(latitude, longitude, isPaid, isReducedMobility);
      return [
        ...state,
        {
          id: state.length,
          isPaid: isPaid,
          isReduceMobility: isReducedMobility,
          location: {
            latitude: latitude,
            longitude: longitude,
          },
        },
      ];
    default:
      return initialState;
  }
};
