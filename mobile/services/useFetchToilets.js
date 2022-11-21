import axios from "axios";

const BASE_URL_API = "http://172.1.1.28:3001/toilet";

export default function useFetchToilet() {
  const getToiletsFetch = async () => {
    try {
      const response = await axios({
        method: "get",
        url: BASE_URL_API,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("getToiletsError", error);
    }
  };

  const addToiletFetch = async (
    latitude,
    longitude,
    isPaid,
    isReducedMobility
  ) => {
    try {
      await axios({
        method: "post",
        url: BASE_URL_API,
        data: { latitude, longitude, isPaid, isReducedMobility },
      });
    } catch (error) {
      console.error("addToiletError", error);
    }
  };

  return {
    getToiletsFetch,
    addToiletFetch,
  };
}
