import axios from "axios";
import { BASE_URL_API } from "../../config";

const getReviewsByToiletIdFetch = async (id) => {
  try {
    console.log(id);
    const response = await axios({
      method: "get",
      url: `${BASE_URL_API}/review/${id}`,
    });
    return response.data;
  } catch (error) {
    console.error("getReviewsByToiletIdFetchError", error);
  }
};

const addReviewFetch = async (comment) => {
  await axios({
    method: "post",
    url: `${BASE_URL_API}/review`,
    data: {
      note: 1,
      comment,
      toiletId: 1,
      userId: 1,
    },
  })
    .then((response) => {
      switch (response.status) {
        case 201:
          console.log("Insert Réussi!");
          break;
        default:
          console.log("Add review default switch");
      }
    })
    .catch((error) => {
      console.log(error.response.status);
    });
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
    console.error("deleteReviewFetchError", error);
  }
}

export { getReviewsByToiletIdFetch, addReviewFetch, deleteReviewFetch };
