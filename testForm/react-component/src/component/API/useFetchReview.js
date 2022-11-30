import axios from "axios";
import { BASE_URL_API } from "../../config";

const addReviewFetch = async (comment) => {
    await axios({
        method: "post",
        url: `${BASE_URL_API}/review`,
        data: {
            note: 1,
            comment,
            toiletId: 1,
            userId: 1
        }
    }).then((response) => {
        switch (response.status) {
          case 201:
            console.log("Insert Réussi!");
            break;
          default:
            console.log("Add user default switch");
        }
    }).catch((error) => {
        console.log(error.response.status);
    });
}

export { addReviewFetch };