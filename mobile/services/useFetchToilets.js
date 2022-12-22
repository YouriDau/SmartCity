import axios from "axios";
import { BASE_URL_API } from "../config";
import { errorMessage } from "../utils/utils";

export default function useFetchToilet() {
  const getToiletsFetch = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${BASE_URL_API}/toilet`,
      });
      return { status: response.status, data: response.data };
    } catch (error) {
      const message = errorMessage(
        error.response.status,
        error.response.data,
        "toilets"
      );
      throw new Error(message);
    }
  };

  const addToiletFetch = async (
    token,
    latitude,
    longitude,
    isPaid,
    isReducedMobility
  ) => {
    try {
      const response = await axios({
        method: "post",
        url: `${BASE_URL_API}/toilet`,
        data: { latitude, longitude, isPaid, isReducedMobility },
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return { status: response.status, data: response.data };
    } catch (error) {
      const message = errorMessage(
        error.response.status,
        error.response.data,
        "toilet"
      );
      throw new Error(message);
    }
  };

  return {
    getToiletsFetch,
    addToiletFetch,
  };
}
