import axios from "axios";
import { Alert } from "react-native";
import { BASE_URL_API } from "../config";

export default function useFetchToilet() {
  const getToiletsFetch = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${BASE_URL_API}/toilet`,
      });
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
      const response = await axios({
        method: "post",
        url: `${BASE_URL_API}/toilet`,
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
    addToiletFetch,
  };
}
