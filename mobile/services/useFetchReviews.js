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
    try {
      const response = await axios({
        method: "post",
        url: `${BASE_URL_API}/review`,
        data: {
          note,
          comment,
          toiletId,
          userId,
        },
      });
      switch (response.status) {
        case 200:
          Alert.alert("Success", "The review was created !");
      }
    } catch (error) {
      console.error("addReviewError", error);
    }
  };

  const deleteReviewFetch = async (id) => {
    const response = await axios({
      method: "delete",
      url: `${BASE_URL_API}/review`,
      data: {
        id,
      },
      headers: authHeader(),
    });
  };

  return {
    getReviewsFetch,
    addReviewFetch,
    deleteReviewFetch,
  };
}
