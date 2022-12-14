import { createDrawerNavigator } from "@react-navigation/drawer";

import Maps from "../screens/Maps";

import UpdatePerson from "../screens/account/UpdateForm";
import UpdatePassword from "../screens/account/UpdatePassword";
import DeletePerson from "../screens/account/DeleteForm";

import CustomMenu from "../components/MenuConnectedCustom";
import { useEffect } from "react";

import useFetchPerson from "../services/useFetchPerson";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/actions/account";
import { setToken } from "../redux/actions/token";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Drawer = createDrawerNavigator();

const MenuConnected = ({ navigation }) => {
  const dispatch = useDispatch();
  const { getCurrentUserFetch } = useFetchPerson();

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
        key="UpdatePassword"
        name="Update password"
        component={UpdatePassword}
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
