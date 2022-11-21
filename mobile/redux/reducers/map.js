import { useEffect } from "react";
import { SET_TOILETS, ADD_MAP_MARKER } from "../actions/actionsType";
import useFetchToilet from "../../services/useFetchToilets";

const { addToilet } = useFetchToilet();
initialState = [];

export const map = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOILETS:
      initialState = action.payload.toilets;
      break;
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
