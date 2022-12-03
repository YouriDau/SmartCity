import axios from "axios";
import { BASE_URL_API } from "../config";
import authHeader from "./authHeader";

export default function useFetchReport() {
  const addReportFetch = async (reason, toiletId) => {
    try {
      const response = await axios({
        method: "post",
        url: `${BASE_URL_API}/report`,
        data: {
          reason,
          toiletId,
        },
        headers: await authHeader(),
      });
      return response.status;
    } catch (error) {
      console.log("addReportFetchError", error);
    }
  };

  return addReportFetch;
}
