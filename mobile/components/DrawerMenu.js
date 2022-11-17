import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Maps from "../screens/Maps";

import Registration from "../screens/account/RegistrationForm";
import Login from "../screens/account/LoginForm";
import UpdateAccount from "../screens/account/UpdateForm";
import DeleteAccount from "../screens/account/DeleteForm";

import ListReview from "../screens/reviews/List";

const Drawer = createDrawerNavigator();

const DrawerMenu = () => {
  const screens = [
    {
      name: "Registration",
      component: Registration,
    },
    {
      name: "Login",
      component: Login,
    },
    {
      name: "DeleteAccount",
      component: DeleteAccount,
    },
    {
      name: "UpdateAccount",
      component: UpdateAccount,
    },
    {
      name: "ListReview",
      component: ListReview,
    },
    {
      name: "Maps",
      component: Maps,
    },
  ];

  return (
    <Drawer.Navigator
      initialRouteName="Register"
      // Pour l'ordre du retour en arrière
      backBehavior="history"
      screenOptions={{ drawerType: "slide", swipeEdgeWidth: 80 }}
    >
      {screens.map((screen) => (
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
