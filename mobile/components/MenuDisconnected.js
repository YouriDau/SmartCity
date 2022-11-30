import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";

import Maps from "../screens/Maps";
import AddPerson from "../screens/account/RegistrationForm";

import Registration from "../screens/account/RegistrationForm";
import Login from "../screens/account/LoginForm";
import { Drawer } from "react-native-paper";

const MenuDisconnected = (props) => {
  const navigation = props.navigation;

  return (
    <View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <DrawerItem
        label="Login"
        onPress={() => {
          Alert.alert("You are connected");
        }}
      />
    </View>
  );
};

export default MenuDisconnected;
