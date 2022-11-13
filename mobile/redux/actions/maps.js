import { ADD_MAP_MARKER } from "./actionsType";

export function addMapMarker(lat, lon) {
  return {
    type: ADD_MAP_MARKER,
    payload: { lat, lon },
  };
}
