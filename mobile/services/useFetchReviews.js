import axios from "axios";
import { useSelector } from "react-redux";
import { BASE_URL_API } from "../config";
import { getToken } from "../redux/selectors";
import { errorMessage } from "../utils/utils";

export default function useFetchReviews() {
  const getReviewsFetch = async (toiletId) => {
    try {
      const response = await axios({
        method: "get",
        url: `${BASE_URL_API}/review/toiletId/${toiletId}`,
      });
      return response.data;
    } catch (error) {
      const message = errorMessage(
        error.response.status,
        error.response.data,
        "Reviews"
      );
      throw new Error(message);
    }
  };

  const addReviewFetch = async (token, note, comment, toiletId) => {
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
      return { status: response.status, data: response.data };
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
        data: {
          id,
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

  const updateReviewFetch = async (token, id, note, comment) => {
    try {
      const response = await axios({
        method: "put", // put et pas patch car remplace pas le userId ni l'id
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

  return {
    getReviewsFetch,
    addReviewFetch,
    deleteReviewFetch,
    updateReviewFetch,
  };
}
