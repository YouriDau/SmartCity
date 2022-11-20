import axios from "axios";

const BASE_URL_API = "http://192.168.1.55:3001/toilet";

export default function useFetchToilet() {
  const getToilets = async () => {
    try {
      const response = await axios({
        method: "get",
        url: BASE_URL_API,
      });
      console.log(response.status);
      return response.data;
    } catch (error) {
      console.error("getToiletsError", error);
    }
  };

  const addToilet = async (latitude, longitude, isPaid, isReducedMobility) => {
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
    getToilets,
    addToilet,
  };
}
