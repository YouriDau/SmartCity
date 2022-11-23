import axios from "axios";
import { Alert } from "react-native";

const BASE_URL_API = "http://192.168.1.53:3001/toilet";

export default function useFetchToilet() {
  const getToiletsFetch = async () => {
    try {
      const response = await axios({
        method: "get",
        url: BASE_URL_API,
      });
      return response.data;
    } catch (error) {
      console.error("getToiletsError", error);
    }
  };

  const getToiletFetch = async (id) => {
    try {
      const response = await axios({
        method: "get",
        url: BASE_URL_API + `/${id}`,
        params: { id },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("getToiletError", error);
    }
  };

  const addToiletFetch = async (
    latitude,
    longitude,
    isPaid,
    isReducedMobility
  ) => {
    try {
      const response = await axios({
        method: "post",
        url: BASE_URL_API,
        data: { latitude, longitude, isPaid, isReducedMobility },
      });
      Alert.alert("Success", "The toilet was successfully created!");
      return response.data;
    } catch (error) {
      Alert.alert(
        "Retry",
        "There was an error during the creation of the toilet, retry!"
      );
      console.error("addToiletError", error);
    }
  };

  return {
    getToiletsFetch,
    getToiletFetch,
    addToiletFetch,
  };
}
