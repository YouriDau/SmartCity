import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";

import Maps from "../screens/Maps";

import { Alert, Pressable, View, Text, StyleSheet } from "react-native";
import Constants from "expo-constants";

const MenuDisconnectedCustom = (props) => {
  const navigation = props.navigation;

  const handlePressLogin = () => {
    navigation.navigate("Login");
  };

  const handlePressRegister = () => {
    navigation.navigate("Registration");
  };

  return (
    <View style={styles.container}>
      <View style={styles.account}>
        <Pressable style={styles.accountButton} onPress={handlePressLogin}>
          <Text style={styles.accountButtonText}>Login</Text>
        </Pressable>
        <Pressable style={styles.accountButton} onPress={handlePressRegister}>
          <Text style={styles.accountButtonText}>Register</Text>
        </Pressable>
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
  account: {
    paddingTop: 30,
    justifyContent: "space-around",
    flexDirection: "row",
  },
  accountButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
    width: 100,
    height: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "grey",
  },
  accountButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default MenuDisconnectedCustom;
