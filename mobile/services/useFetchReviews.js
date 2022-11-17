import axios from "axios";

const BASE_URL_API = "http://192.168.1.53:3001/review";

export default function useFetchReviews() {
  const getReviewByToiletId = async (idToilet) => {
    try {
      const response = await axios.get(BASE_URL_API, {
        params: { toiletId: idToilet },
      });
      return response.data;
    } catch (error) {
      console.error("getReviewError", e);
    }
  };

  const deleteReview = async (id) => {
    try {
      console.log(id);
      const response = await axios({
        method: "delete",
        url: BASE_URL_API,
        data: {
          id: id,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error("deleteReviewError", e);
    }
  };

  return {
    getReviewByToiletId,
    deleteReview,
  };
}
