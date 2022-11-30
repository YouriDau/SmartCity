import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";

import Maps from "../screens/Maps";

import UpdateAccount from "../screens/account/UpdateForm";
import DeleteAccount from "../screens/account/DeleteForm";
import { Alert, Pressable, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

const MenuConnected = (props) => {
  const navigation = props.navigation;

  return (
    <View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="AddPerson"
          onPress={() => {
            navigation.navigate("AddPerson");
          }}
        />
      </DrawerContentScrollView>
      <DrawerItem
        label="Logout"
        onPress={() => {
          Alert.alert("You are disconnected");
          navigation.navigate("MenuDisconnected");
        }}
      />
    </View>
  );
};

export default MenuConnected;
