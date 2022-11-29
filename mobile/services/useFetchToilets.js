import axios from "axios";
import { Alert } from "react-native";
import { BASE_URL_API } from "../config";

export default function useFetchToilet() {
  const getToiletsFetch = async () => {
    const response = await axios({
      method: "get",
      url: `${BASE_URL_API}/toilet`,
    });
    return { status: response.status, data: response.data };
  };

  const addToiletFetch = async (
    latitude,
    longitude,
    isPaid,
    isReducedMobility
  ) => {
    const response = await axios({
      method: "post",
      url: `${BASE_URL_API}/toilet`,
      data: { latitude, longitude, isPaid, isReducedMobility },
    });
    return { status: response.status, data: response.data };
  };

  return {
    getToiletsFetch,
    addToiletFetch,
  };
}
