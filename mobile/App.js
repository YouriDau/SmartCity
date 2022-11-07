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
          tabBarStyle: { alignItems: "center", display:  },
          tabBarActiveTintColor: "#e91e63",
        }}
      >
        <Tab.Screen
          name="Registration"
          component={Registration}
          Header={Header}
          options={({ navigation }) => ({
            tabBarButton: () => (
              <Pressable
                style={styles.pressable}
                onPress={() => navigation.navigate("Registration")}
              >
                <Text style={styles.pressableText}>Register</Text>
              </Pressable>
            ),
          })}
        />
        <Tab.Screen
          name="Maps"
          component={Maps}
          Header={Header}
          options={({ navigation }) => ({
            tabBarButton: () => (
              <Pressable
                style={styles.pressable}
                onPress={() => navigation.navigate("Maps")}
              >
                <Text style={styles.pressableText}>Maps</Text>
              </Pressable>
            ),
          })}
        />
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
