import { Pressable, StyleSheet, Text, View } from "react-native";

import Header from "./components/Header";
import Maps from "./screens/Maps";

import Registration from "./screens/account/RegistrationForm";
import Login from "./screens/account/LoginForm";
import UpdateAccount from "./screens/account/UpdateForm";
import DeleteAccount from "./screens/account/DeleteForm";

import AddReview from "./screens/reviews/AddForm";
import ListReview from "./screens/reviews/List";
import UpdateReview from "./screens/reviews/UpdateForm";
import DeleteReview from "./screens/reviews/DeleteForm";

import AddReport from "./screens/reports/AddForm";

import AddToilet from "./screens/toilets/AddForm";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Button from "./components/Button";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        initialRouteName="Registration"
        screenOptions={{
          tabBarStyle: { alignItems: "center", display: "none" },
          tabBarActiveTintColor: "#e91e63",
          headerShown: false,
        }}
      >
        <Tab.Screen name="Registration" component={Registration} />
        <Tab.Screen name="Login" component={Login} />
        <Tab.Screen name="DeleteAccount" component={DeleteAccount} />
        <Tab.Screen name="UpdateAccount" component={UpdateAccount} />

        <Tab.Screen name="Maps" component={Maps} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "space-evenly",
  },
  pressable: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 8,
    width: 140,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    marginHorizontal: 20,
  },
  pressableText: {
    fontSize: 18,
  },
});

export default App;
