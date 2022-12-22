import axios from "axios";
import { BASE_URL_API } from "../../config";
import { errorMessage } from "../../utils/utils";

const getAllToiletsFetch = async () => {
  try {
    const response = await axios.get(`${BASE_URL_API}/toilet`);
    return { status: response.status, data: response.data };
  } catch (error) {
    const message = errorMessage(
      error.response.status,
      error.response.data,
      "Account"
    );
    throw new Error(message);
  }
};

const deleteToiletFetch = async (token, id) => {
  try {
    const response = await axios({
      method: "delete",
      url: `${BASE_URL_API}/toilet`,
      data: { id },
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response.status;
  } catch (error) {
    const message = errorMessage(
      error.response.status,
      error.response.data,
      "Account"
    );
    throw new Error(message);
  }
};

const addToiletFetch = async (
  token,
  latitude,
  longitude,
  isReducedMobility,
  isPaid
) => {
  try {
    const response = await axios({
      method: "post",
      url: `${BASE_URL_API}/toilet`,
      data: { latitude, longitude, isReducedMobility, isPaid },
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return { status: response.status, toiletId: response.data };
  } catch (error) {
    const message = errorMessage(
      error.response.status,
      error.response.data,
      "Account"
    );
    throw new Error(message);
  }
};

export { getAllToiletsFetch, deleteToiletFetch, addToiletFetch };
