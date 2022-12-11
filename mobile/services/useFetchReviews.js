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
      console.log(response.data);
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
      switch (error.response.status) {
        case 401:
          Alert.alert("Error", "You need to be connected to delete reviews");
        case 403:
          Alert.alert(
            "Error",
            "You can't delete this review because you are not the owner"
          );
      }
      console.error("deleteReviewFetchError", error);
    }
  };

  const updateReviewFetch = async (id, note, comment) => {
    try {
      const response = await axios({
        method: "put", // put et pas patch car remplace pas le userId ni l'id
        url: `${BASE_URL_API}/review`,
        data: {
          id,
          note,
          comment,
        },
        headers: await authHeader(),
      });
      return response.status;
    } catch (error) {
      switch (error.response.status) {
        case 401:
          Alert.alert("Error", "You need to be connected to update reviews");
        case 403:
          Alert.alert(
            "Error",
            "You can't update this review because you are not the owner"
          );
      }
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
