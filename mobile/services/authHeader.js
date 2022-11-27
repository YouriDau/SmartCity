import AsyncStorage from "@react-native-async-storage/async-storage";

export default function authHeader() {
  const user = AsyncStorage.getItem("token");
  console.log("test");

  if (user && user.accessToken) {
    return { authorization: "Bearer " + user };
  } else {
    return {};
  }
}
