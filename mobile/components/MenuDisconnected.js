import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";

import Maps from "../screens/Maps";

import Registration from "../screens/account/RegistrationForm";
import Login from "../screens/account/LoginForm";

const DrawerMenu = () => {
  const Drawer = createDrawerNavigator();
  const navigation = useNavigation();

  return (
    <Drawer.Navigator
      initialRouteName="Maps"
      // Pour l'ordre du retour en arrière
      backBehavior="history"
      screenOptions={{ drawerType: "slide", swipeEdgeWidth: 80 }}
    >
      <Drawer.Screen
        key="Registration"
        name="Registration"
        component={Registration}
      />
      <Drawer.Screen key="Login" name="Login" component={Login} />
      <Drawer.Screen key="Maps" name="Maps" component={Maps} />
    </Drawer.Navigator>
  );
};

export default DrawerMenu;
