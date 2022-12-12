import { combineReducers } from "redux";
import { account } from "./account";
import { review } from "./review";
import { map } from "./map";
import { token } from "./token";

export const rootReducers = combineReducers({
  account,
  review,
  map,
  token,
});
