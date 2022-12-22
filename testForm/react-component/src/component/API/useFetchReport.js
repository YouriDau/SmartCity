import axios from "axios";
import { BASE_URL_API } from "../../config";
import { errorMessage } from "../../utils/utils";

const getAllReportsFetch = async () => {
  try {
    const response = await axios.get(`${BASE_URL_API}/report/all`);
    return response.data;
  } catch (error) {
    const message = errorMessage(
      error.response.status,
      error.response.data,
      "Account"
    );
    throw new Error(message);
  }
};

const getNotDoneReportsFetch = async () => {
  try {
    const response = await axios.get(`${BASE_URL_API}/report/notDone`);
    return response.data;
  } catch (error) {
    const message = errorMessage(
      error.response.status,
      error.response.data,
      "Account"
    );
    throw new Error(message);
  }
};

const getReportByIdFetch = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL_API}/report/${id}`);
    return response.data;
  } catch (error) {
    const message = errorMessage(
      error.response.status,
      error.response.data,
      "Account"
    );
    throw new Error(message);
  }
};

const addReportFetch = async (token, reason, toiletId) => {
  try {
    const response = await axios({
      method: "post",
      url: `${BASE_URL_API}/report`,
      data: {
        reason,
        toiletId,
      },
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    const message = errorMessage(
      error.response.status,
      error.response.data,
      "Account"
    );
    throw new Error(message);
  }
};

const updateReportFetch = async (id, reason, isDone) => {
  try {
    await axios({
      method: "put",
      url: `${BASE_URL_API}/report`,
      data: {
        id,
        reason,
        isDone,
      },
    });
  } catch (error) {
    const message = errorMessage(
      error.response.status,
      error.response.data,
      "Report"
    );
    throw new Error(message);
  }
};

const deleteReportFetch = async (id) => {
  try {
    const response = await axios({
      method: "delete",
      url: `${BASE_URL_API}/report`,
      data: { id },
    });
    return response.status;
  } catch (error) {
    const message = errorMessage(
      error.response.status,
      error.response.data,
      "Account"
    );
    throw new Error(message);
  }
};

export {
  getAllReportsFetch,
  getNotDoneReportsFetch,
  getReportByIdFetch,
  addReportFetch,
  updateReportFetch,
  deleteReportFetch,
};
