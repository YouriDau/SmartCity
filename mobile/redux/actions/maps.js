import { ADD_MAP_MARKER } from "./actionsType";

export function addMapMarker(latitude, longitude, isPaid, isReducedMobility) {
  return {
    type: ADD_MAP_MARKER,
    payload: { latitude, longitude, isPaid, isReducedMobility },
  };
}
