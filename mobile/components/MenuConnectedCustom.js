import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";

import Maps from "../screens/Maps";

import UpdateAccount from "../screens/account/UpdateForm";
import DeleteAccount from "../screens/account/DeleteForm";
import { Alert, Pressable, View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MenuConnectedCustom = (props) => {
  const navigation = props.navigation;

  const handlePressLogout = () => {
    AsyncStorage.removeItem("token");
    Alert.alert("You are Disconnected");
    navigation.navigate("MenuDisconnected");
  };

  return (
    <View style={styles.container}>
      <DrawerItem
        style={styles.logout}
        label="Logout"
        onPress={handlePressLogout}
      />
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
  logout: {
    height: 50,
  },
});

export default MenuConnectedCustom;
