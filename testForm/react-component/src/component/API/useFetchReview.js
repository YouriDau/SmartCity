import axios from "axios";
import { BASE_URL_API } from "../../config";
import { errorMessage } from "../../utils/utils";

const getReviewsByToiletIdFetch = async (id) => {
  try {
    console.log(id);
    const response = await axios({
      method: "get",
      url: `${BASE_URL_API}/review/${id}`,
    });
    return response.data;
  } catch (error) {
    const message = errorMessage(
      error.response.status,
      error.response.data,
      "Account"
    );
    throw new Error(message);
  }
};

const addReviewFetch = async (note, comment, toiletId) => {
  try {
    const response = await axios({
      method: "post",
      url: `${BASE_URL_API}/review`,
      data: {
        note,
        comment,
        toiletId,
        userId: 1,
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

const deleteReviewFetch = async (id) => {
  try {
    const response = await axios({
      method: "delete",
      url: `${BASE_URL_API}/review`,
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

export { getReviewsByToiletIdFetch, addReviewFetch, deleteReviewFetch };
