import axios from "axios";
import { BASE_URL_API } from "../../config";

const getAllReportsFetch = async () => {
    try {
        const response = await axios.get(`${BASE_URL_API}/report`);
        return response.data;
    } catch (error) {
        console.error("getAllReportsFetchError", error);
    }
}

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

export { getAllReportsFetch, addReportFetch };