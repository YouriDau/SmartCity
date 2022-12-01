import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";

import { Octicons } from "@expo/vector-icons";

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
      <View>
        <DrawerItem
          icon={() => <Octicons name="sign-in" size={30} color="black" />}
          label="Sign-in"
          onPress={handlePressLogin}
        />
        <DrawerItem
          icon={() => <Octicons name="pencil" size={30} color="black" />}
          label="Sign-up"
          onPress={handlePressRegister}
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
