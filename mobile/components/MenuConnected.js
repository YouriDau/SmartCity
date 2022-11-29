import { createDrawerNavigator } from "@react-navigation/drawer";

import Maps from "../screens/Maps";

import UpdateAccount from "../screens/account/UpdateForm";
import DeleteAccount from "../screens/account/DeleteForm";

const DrawerMenu = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      initialRouteName="Maps"
      // Pour l'ordre du retour en arrière
      backBehavior="history"
      screenOptions={{ drawerType: "slide", swipeEdgeWidth: 80 }}
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
