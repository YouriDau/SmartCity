import axios from "axios";
import { BASE_URL_API } from "../../config";

const addReportFetch = async (reason) => {
    await axios({
        method: "post",
        url: `${BASE_URL_API}/report`,
        data: {
            reason,
            userId: 1,
            toiletId: 1
        }
    });
}

export { addReportFetch };