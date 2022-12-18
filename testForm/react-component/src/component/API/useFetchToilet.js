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

const deleteToiletFetch = async (id) => {
  try {
    const response = await axios({
      method: "delete",
      url: `${BASE_URL_API}/toilet`,
      data: { id },
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

export { getAllToiletsFetch, deleteToiletFetch };
