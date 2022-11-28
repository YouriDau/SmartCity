import axios from "axios";
import { BASE_URL_API } from "../../config";

const addReportFetch = async (reason) => {
    await axios({
        method: "post",
        url: `${BASE_URL_API}/report`,
        data: {
            reason,
            date: new Date(),
            is_done: false,
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

export { addReportFetch };