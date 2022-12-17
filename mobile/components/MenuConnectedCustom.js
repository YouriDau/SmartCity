import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";

import { Octicons } from "@expo/vector-icons";
import { Alert, View, StyleSheet, Text } from "react-native";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../redux/actions/token";
import { getUser } from "../redux/selectors";

const MenuConnectedCustom = (props) => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const navigation = props.navigation;

  const handlePressLogout = () => {
    AsyncStorage.removeItem("token");
    dispatch(setToken(""));
    Alert.alert("You are Disconnected");
    navigation.navigate("MenuDisconnected");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome {user.pseudo}</Text>
      <View>
        <DrawerItem
          icon={() => <Octicons name="sign-out" size={30} color="black" />}
          style={styles.logout}
          label="Logout"
          onPress={handlePressLogout}
        />
      </View>
      <DrawerContentScrollView style={{ flex: 1 }} {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  welcome: {
    marginTop: 10,
    textAlign: "center",
    borderBottomColor: "lightgrey",
    fontStyle: "italic",
    borderBottomWidth: 1,
    paddingBottom: 10,
    fontSize: 23,
  },
  logout: {
    height: 50,
  },
});

export default MenuConnectedCustom;
