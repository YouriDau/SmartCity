import AsyncStorage from "@react-native-async-storage/async-storage";
import { createDrawerNavigator, DrawerContent } from "@react-navigation/drawer";
import { useEffect, useState } from "react";

import MenuConnected from "./MenuConnected";
import MenuDisconnected from "./MenuDisconnected";

import Maps from "../screens/Maps";

const Drawer = createDrawerNavigator();

const DrawerMenu = () => {
  const Drawer = createDrawerNavigator();
  const [isConnected, setIsConnected] = useState();

  useEffect(() => {
    AsyncStorage.getItem("token").then((token) => {
      token ? setIsConnected(true) : setIsConnected(false);
    });
  }, []);

  return (
    <Drawer.Navigator
      initialRouteName="Maps"
      // Pour l'ordre du retour en arrière
      backBehavior="history"
      screenOptions={{ drawerType: "slide", swipeEdgeWidth: 80 }}
      drawerContent={(props) => {
        if (isConnected) {
          return <MenuConnected {...props} />;
        } else {
          return <MenuDisconnected {...props} />;
        }
      }}
    >
      <Drawer.Screen key="Maps" name="Maps" component={Maps} />
    </Drawer.Navigator>
  );
};

export default DrawerMenu;
