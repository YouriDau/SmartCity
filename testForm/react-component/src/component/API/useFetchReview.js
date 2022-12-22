import axios from "axios";
import axiosRetry from "axios-retry";
import { BASE_URL_API } from "../../config";
import { errorMessage } from "../../utils/utils";

axiosRetry(axios, {
  retries: 3,
  retryDelay: (retryCount) => {
    return retryCount * 2000;
  },
  retryCondition: (error) => {
    return error.response.status === 500;
  },
});

const getReviewsByToiletIdFetch = async (id) => {
  try {
    const response = await axios({
      method: "get",
      url: `${BASE_URL_API}/review/toiletId/${id}`,
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

const getReviewFetch = async (id) => {
  try {
    const response = await axios({
      method: "get",
      url: `${BASE_URL_API}/review/reviewId/${id}`,
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

const addReviewFetch = async (token, toiletId, note, comment) => {
  try {
    const response = await axios({
      method: "post",
      url: `${BASE_URL_API}/review`,
      data: {
        note,
        comment,
        toiletId,
      },
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return { status: response.status, id: response.data };
  } catch (error) {
    const message = errorMessage(
      error.response.status,
      error.response.data,
      "Account"
    );
    throw new Error(message);
  }
};

const updateReviewFetch = async (token, id, note, comment) => {
  try {
    const response = await axios({
      method: "put",
      url: `${BASE_URL_API}/review`,
      data: {
        id,
        note,
        comment,
      },
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response.status;
  } catch (error) {
    const message = errorMessage(
      error.response.status,
      error.response.data,
      "Review"
    );
    throw new Error(message);
  }
};

const deleteReviewFetch = async (token, id) => {
  try {
    const response = await axios({
      method: "delete",
      url: `${BASE_URL_API}/review`,
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
      "Review"
    );
    throw new Error(message);
  }
};

export {
  getReviewsByToiletIdFetch,
  getReviewFetch,
  addReviewFetch,
  updateReviewFetch,
  deleteReviewFetch,
};
