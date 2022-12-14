import axios from "axios";
import { BASE_URL_API } from "../../config";

const getAllReportsFetch = async () => {
    try {
        const response = await axios.get(`${BASE_URL_API}/report/all`);
        return response.data;
    } catch (error) {
        console.error("getAllReportsFetchError", error);
    }
}

const getNotDoneReportsFetch = async () => {
    try {
        const response = await axios.get(`${BASE_URL_API}/report/notDone`);
        return response.data;
    } catch (error) {
        console.error("getNotDoneReportsFetchError", error);
    }
}

const getReportByIdFetch = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL_API}/report/${id}`);
        return response.data;
    } catch (error) {
        console.error("getReportByIdFetchError", error);
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

const updateReportFetch = async (reason, isDone) => {
    await axios({
        method: "put",
        url: `${BASE_URL_API}/report`,
        data: {
            reason,
            isDone,
        }
    });
}

const deleteReportFetch = async (id) => {
    try {
        const response = await axios({
            method: "delete",
            url: `${BASE_URL_API}/report`,
            data: { id },
        });
        return response.status;
    } catch (error) {
        console.error("deleteReportFetchError", error);
    }
}

export { getAllReportsFetch, getNotDoneReportsFetch, getReportByIdFetch, addReportFetch, updateReportFetch, deleteReportFetch };