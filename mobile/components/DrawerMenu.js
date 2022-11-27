import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Maps from "../screens/Maps";

import Registration from "../screens/account/RegistrationForm";
import Login from "../screens/account/LoginForm";
import UpdateAccount from "../screens/account/UpdateForm";
import DeleteAccount from "../screens/account/DeleteForm";

import ListReview from "../screens/reviews/List";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Drawer = createDrawerNavigator();

const DrawerMenu = () => {
  const screensNotConnected = [
    {
      name: "Registration",
      component: Registration,
    },
    {
      name: "Login",
      component: Login,
    },
    {
      name: "Maps",
      component: Maps,
    },
  ];

  const screensConnected = [
    {
      name: "DeleteAccount",
      component: DeleteAccount,
    },
    {
      name: "UpdateAccount",
      component: UpdateAccount,
    },
    {
      name: "Maps",
      component: Maps,
    },
  ];

  return (
    <Drawer.Navigator
      initialRouteName="Maps"
      // Pour l'ordre du retour en arrière
      backBehavior="history"
      screenOptions={{ drawerType: "slide", swipeEdgeWidth: 80 }}
    >
      {screensNotConnected.map((screen) => (
        <Drawer.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
        />
      ))}
    </Drawer.Navigator>
  );
};

export default DrawerMenu;
