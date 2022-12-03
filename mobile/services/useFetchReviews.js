import axios from "axios";
import { BASE_URL_API } from "../config";
import authHeader from "./authHeader";

export default function useFetchReviews() {
  const getReviewsFetch = async (toiletId) => {
    try {
      const response = await axios({
        method: "get",
        url: `${BASE_URL_API}/review/${toiletId}`,
      });
      return response.data;
    } catch (error) {
      console.error("getReviewsError", error);
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
        },
        headers: await authHeader(),
      });
      return { status: response.status, data: response.data };
    } catch (error) {
      console.error("addReviewFetchError", error);
    }
  };

  const deleteReviewFetch = async (id) => {
    try {
      const response = await axios({
        method: "delete",
        url: `${BASE_URL_API}/review`,
        data: {
          id,
        },
        headers: await authHeader(),
      });
      return response.status;
    } catch (error) {
      console.error("deleteReviewFetchError", error);
    }
  };

  const updateReviewFetch = async (id, note, comment) => {
    try {
      const response = await axios({
        method: "put", // put et pas patch car remplace pas le userId ni l'id
        url: `${BASE_URL_API}/review`,
        date: {
          id,
          note,
          comment,
        },
        headers: await authHeader(),
      });
      return response.status;
    } catch (error) {
      console.error("updateReviewFetchError", error);
    }
  };

  return {
    getReviewsFetch,
    addReviewFetch,
    deleteReviewFetch,
    updateReviewFetch,
  };
}
