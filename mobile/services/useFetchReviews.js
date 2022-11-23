import axios from "axios";
import { Alert } from "react-native";

const BASE_URL_API = "http://192.168.1.53:3001/review";

export default function useFetchReviews() {
  const getReviewsFetch = async (toiletId) => {
    try {
      const response = await axios({
        method: "get",
        url: BASE_URL_API,
        params: { toiletId },
      });
      return response.data;
    } catch (error) {
      console.error("getReviewError", error);
    }
  };

  const addReviewFetch = async (note, comment, toiletId, userId = 1) => {
    try {
      const response = await axios({
        method: "post",
        url: BASE_URL_API,
        data: {
          note,
          comment,
          toilet_id: toiletId,
          user_id: userId,
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
    try {
      console.log(id);
      await axios({
        method: "delete",
        url: BASE_URL_API,
        data: {
          id,
        },
      });
    } catch (error) {
      console.error("deleteReviewError", e);
    }
  };

  return {
    getReviewsFetch,
    addReviewFetch,
    deleteReviewFetch,
  };
}
