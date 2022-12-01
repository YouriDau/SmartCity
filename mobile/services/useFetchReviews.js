import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";
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

  const addReviewFetch = async (note, comment, toiletId, userId = 1) => {
    const response = await axios({
      method: "post",
      url: `${BASE_URL_API}/review`,
      data: {
        note,
        comment,
        toiletId,
        userId,
      },
      headers: await authHeader(),
    });
    return { status: response.status, data: response.data };
  };

  const deleteReviewFetch = async (id) => {
    const response = await axios({
      method: "delete",
      url: `${BASE_URL_API}/review`,
      data: {
        id,
      },
      headers: await authHeader(),
    });
    return response.status;
  };

  return {
    getReviewsFetch,
    addReviewFetch,
    deleteReviewFetch,
  };
}
