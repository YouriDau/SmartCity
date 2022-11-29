import AsyncStorage from "@react-native-async-storage/async-storage";

export default function authHeader() {
  AsyncStorage.getItem("token").then((item) => {
    if (item !== undefined) {
      return { authorization: `Bearer ${item}` };
    } else {
      return {};
    }
  });
}
