import {
  createDrawerNavigator,
  DrawerContent,
  DrawerItem,
} from "@react-navigation/drawer";

import Maps from "../screens/Maps";

import UpdateAccount from "../screens/account/UpdateForm";
import DeleteAccount from "../screens/account/DeleteForm";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const DrawerMenu = () => {
  const Drawer = createDrawerNavigator();
  const navigation = useNavigation();

  return (
    <Drawer.Navigator
      initialRouteName="Maps"
      // Pour l'ordre du retour en arrière
      backBehavior="history"
      screenOptions={{ drawerType: "slide", swipeEdgeWidth: 80 }}
      drawerContent={() => {
        return (
          <DrawerItem
            label="Logout"
            onPress={() => {
              Alert.alert("You are disconnected");
              navigation.navigate("MenuDisconnected");
            }}
          />
        );
      }}
    >
      <Drawer.Screen
        key="DeleteAccount"
        name="DeleteAccount"
        component={DeleteAccount}
      />
      <Drawer.Screen
        key="UpdateAccount"
        name="UpdateAccount"
        component={UpdateAccount}
      />
      <Drawer.Screen key="Maps" name="Maps" component={Maps} />
    </Drawer.Navigator>
  );
};

export default DrawerMenu;
