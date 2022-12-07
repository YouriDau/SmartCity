import axios from "axios";
import { BASE_URL_API } from "../../config";

const getAllToiletsFetch = async () => {
  try {
    const response = await axios.get(`${BASE_URL_API}/toilet`);
    return { status: response.status, data: response.data };
  } catch (error) {
    console.error("getAllPersonsFetchError", error);
  }
};

export { getAllToiletsFetch };
