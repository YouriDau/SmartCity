import { combineReducers } from "redux";
import { account } from "./account";
import { reviews } from "./reviews";
import { map } from "./map";

export const rootReducers = combineReducers({
  account,
  reviews,
  map,
});
