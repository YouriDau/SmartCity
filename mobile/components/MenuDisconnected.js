import { createDrawerNavigator } from "@react-navigation/drawer";
import MenuDisconnectedCustom from "./MenuDisconnectedCustom";

import Maps from "../screens/Maps";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/actions/token";
import useFetchPerson from "../services/useFetchPerson";
import { Alert } from "react-native";
import { setUser } from "../redux/actions/account";

const MenuDisconnected = ({ navigation }) => {
  const Drawer = createDrawerNavigator();
  const { getCurrentUserFetch } = useFetchPerson();
  const dispatch = useDispatch();

  useEffect(() => {
    AsyncStorage.getItem("token").then((token) => {
      if (token !== null) {
        dispatch(setToken(token));
        getCurrentUserFetch(token)
          .then(({ status, user }) => {
            dispatch(
              setUser(
                user.id,
                user.pseudo,
                user.lastName,
                user.firstName,
                user.email
              )
            );
            navigation.navigate("MenuConnected");
          })
          .catch((error) => {
            dispatch.setToken("");
            AsyncStorage.removeItem("token").then(() => {
              Alert.alert(error.message);
            });
          });
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
