import axios from "axios";
import { BASE_URL_API } from "../../config";

const addReviewFetch = async (comment) => {
    await axios({
        method: "post",
        url: `${BASE_URL_API}/report`,
        data: {
            note: 4,
            comment,
            toilet_id: 1,
            user_id: 1
        }
    }).then((response) => {
        switch (response.status) {
          case 201:
            console.log("Insert Réussi!");
            break;
          default:
            console.log("Add user default switch");
        }
    });
}

export { addReviewFetch };