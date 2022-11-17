import axios from "axios";

const BASE_URL_API = "http://192.168.1.53:3001/";

export default function useFetchToilet() {
  const getToilets = async (id) => {
    try {
      const response = await axios({
        method: "get",
        url: BASE_URL_API,
        params: { id },
      });
      return response.data;
    } catch (error) {
      console.error("getToiletsError", error);
    }
  };
}
