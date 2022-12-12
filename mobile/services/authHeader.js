import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../redux/selectors";

export default async function authHeader() {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    return { authorization: `Bearer ${token}` };
  } else {
    return {};
  }
}
