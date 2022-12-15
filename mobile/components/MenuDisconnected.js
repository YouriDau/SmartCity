import { createDrawerNavigator } from "@react-navigation/drawer";
import MenuDisconnectedCustom from "./MenuDisconnectedCustom";

import Maps from "../screens/Maps";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/actions/token";
import useFetchPerson from "../services/useFetchPerson";

const MenuDisconnected = ({ navigation }) => {
  const Drawer = createDrawerNavigator();
  const dispatch = useDispatch();

  useEffect(() => {
    AsyncStorage.getItem("token").then((token) => {
      if (token) {
        dispatch(setToken(token));
        navigation.navigate("MenuConnected");
      }
    });
  }, []);

  return (
    <Drawer.Navigator
      initialRouteName="Maps"
      // Pour l'ordre du retour en arrière
      backBehavior="history"
      screenOptions={{ drawerType: "slide", swipeEdgeWidth: 80 }}
      drawerContent={(props) => <MenuDisconnectedCustom {...props} />}
    >
      <Drawer.Screen key="Maps" name="Maps" component={Maps} />
    </Drawer.Navigator>
  );
};

export default MenuDisconnected;
