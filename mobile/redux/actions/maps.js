import { SET_TOILETS, ADD_MAP_MARKER } from "./actionsType";

export function setToilets(toilets) {
  return {
    type: SET_TOILETS,
    payload: { toilets },
  };
}

export function addMapMarker(
  id,
  latitude,
  longitude,
  isPaid,
  isReducedMobility
) {
  return {
    type: ADD_MAP_MARKER,
    payload: { id, latitude, longitude, isPaid, isReducedMobility },
  };
}
