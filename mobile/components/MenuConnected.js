import { createDrawerNavigator } from "@react-navigation/drawer";

import Maps from "../screens/Maps";

import UpdatePerson from "../screens/account/UpdateForm";
import DeletePerson from "../screens/account/DeleteForm";

import CustomMenu from "../components/MenuConnectedCustom";

const Drawer = createDrawerNavigator();

const MenuConnected = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Maps"
      // Pour l'ordre du retour en arrière
      backBehavior="history"
      screenOptions={{ drawerType: "slide", swipeEdgeWidth: 80 }}
      drawerContent={(props) => <CustomMenu {...props} />}
    >
      <Drawer.Screen key="Maps" name="Maps" component={Maps} />

      <Drawer.Screen
        key="UpdatePerson"
        name="Update account"
        component={UpdatePerson}
      />
      <Drawer.Screen
        key="DeletePerson"
        name="Delete account"
        component={DeletePerson}
      />
    </Drawer.Navigator>
  );
};

export default MenuConnected;
