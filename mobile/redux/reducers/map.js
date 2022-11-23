import { useEffect } from "react";
import { SET_TOILETS, ADD_MAP_MARKER } from "../actions/actionsType";
import useFetchToilet from "../../services/useFetchToilets";

const { addToiletFetch } = useFetchToilet();
initialState = [];

export const map = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOILETS:
      state = action.payload.toilets;
      return state;
    case ADD_MAP_MARKER:
      const latitude = action.payload.latitude;
      const longitude = action.payload.longitude;
      const isPaid = action.payload.isPaid;
      const isReducedMobility = action.payload.isReducedMobility;
      const id = addToiletFetch(latitude, longitude, isPaid, isReducedMobility);

      return [
        ...state,
        {
          id,
          isPaid,
          isReducedMobility,
          location: {
            latitude,
            longitude,
          },
        },
      ];
    default:
      return state;
  }
};
