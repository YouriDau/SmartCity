import axios from "axios";
import { useSelector } from "react-redux";
import { BASE_URL_API } from "../config";
import { getToken } from "../redux/selectors";
import authHeader from "./authHeader";

export default function useFetchReport() {
  const token = useSelector(getToken);

  const addReportFetch = async (reason, toiletId) => {
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
      return response.status;
    } catch (error) {
      const message = errorMessage(
        error.response.status,
        error.response.data,
        "Report"
      );
      throw new Error(message);
    }
  };

  return addReportFetch;
}
