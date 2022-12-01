import { createDrawerNavigator } from "@react-navigation/drawer";
import MenuDisconnectedCustom from "./MenuDisconnectedCustom";

import Maps from "../screens/Maps";

const MenuDisconnected = () => {
  const Drawer = createDrawerNavigator();

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
