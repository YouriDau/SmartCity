import axios from "axios";

const BASE_URL_API = "http://192.168.1.53:3001/review";

export default function useFetchReviews() {
  const getReviewByToiletId = async (toiletId) => {
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

  const addReview = async (note, comment, user_id = 1, toilet_id = 1) => {
    try {
      await axios({
        method: "post",
        url: BASE_URL_API,
        params: { note, comment, user_id, toilet_id },
      });
    } catch (error) {
      console.error("addReviewError", error);
    }
  };

  const deleteReview = async (id) => {
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
    getReviewByToiletId,
    addReview,
    deleteReview,
  };
}
