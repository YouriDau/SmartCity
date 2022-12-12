import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";

import { Octicons } from "@expo/vector-icons";
import { Alert, View, StyleSheet } from "react-native";
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
  logout: {
    height: 50,
  },
});

export default MenuConnectedCustom;
