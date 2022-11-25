import { useEffect } from "react";
import { SET_TOILETS, ADD_MAP_MARKER } from "../actions/actionsType";

initialState = [];

export const map = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOILETS:
      state = action.payload.toilets;
      return state;
    case ADD_MAP_MARKER:
      const id = action.payload.id;
      const latitude = action.payload.latitude;
      const longitude = action.payload.longitude;
      const isPaid = action.payload.isPaid;
      const isReducedMobility = action.payload.isReducedMobility;

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
