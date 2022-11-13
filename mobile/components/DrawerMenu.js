import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Maps from "../screens/Maps";

import Registration from "../screens/account/RegistrationForm";
import Login from "../screens/account/LoginForm";
import UpdateAccount from "../screens/account/UpdateForm";
import DeleteAccount from "../screens/account/DeleteForm";

import AddReview from "../screens/reviews/AddForm";
import ListReview from "../screens/reviews/List";
import UpdateReview from "../screens/reviews/UpdateForm";
import DeleteReview from "../screens/reviews/DeleteForm";

import AddReport from "../screens/reports/AddForm";

import AddToilet from "../screens/toilets/AddForm";

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
      name: "AddReview",
      component: AddReview,
    },
    {
      name: "ListReview",
      component: ListReview,
    },
    {
      name: "UpdateReview",
      component: UpdateReview,
    },
    {
      name: "DeleteReview",
      component: DeleteReview,
    },
    {
      name: "AddReport",
      component: AddReport,
    },
    {
      name: "AddToilet",
      component: AddToilet,
    },
    {
      name: "Maps",
      component: Maps,
    },
  ];

  return (
    <Drawer.Navigator
      initialRouteName="Registration"
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
