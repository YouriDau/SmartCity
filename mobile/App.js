import { Provider } from "react-redux";
import { store } from "./redux/store";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MenuDisconnected from "./components/MenuDisconnected";
import MenuConnected from "./components/MenuConnected";

import Registration from "./screens/account/RegistrationForm";
import Login from "./screens/account/LoginForm";

import AddReview from "./screens/reviews/AddForm";
import ListReviews from "./screens/reviews/List";
import UpdateReview from "./screens/reviews/UpdateForm";
import DeleteReview from "./screens/reviews/DeleteForm";

import AddReport from "./screens/reports/AddForm";

import AddToilet from "./screens/toilets/AddForm";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

const App = () => {
  const [initialMenu, setInitialMenu] = useState();

  useEffect(() => {
    AsyncStorage.getItem("token").then((token) => {
      console.log(token !== undefined && token !== null);
      if (token) {
        setInitialMenu("MenuConnected");
      } else {
        setInitialMenu("MenuDisconnected");
      }
    });
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialMenu}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen
            key="MenuDisconnected"
            name="MenuDisconnected"
            component={MenuDisconnected}
          />
          <Stack.Screen
            key="MenuConnected"
            name="MenuConnected"
            component={MenuConnected}
          />
          <Stack.Screen
            key="Registration"
            name="Registration"
            component={Registration}
          />
          <Stack.Screen key="Login" name="Login" component={Login} />
          <Stack.Screen
            key="AddReview"
            name="AddReview"
            component={AddReview}
          />
          <Stack.Screen
            key="ListReviews"
            name="ListReviews"
            component={ListReviews}
          />
          <Stack.Screen
            key="UpdateReview"
            name="UpdateReview"
            component={UpdateReview}
          />
          <Stack.Screen
            key="DeleteReview"
            name="DeleteReview"
            component={DeleteReview}
          />
          <Stack.Screen
            key="AddReport"
            name="AddReport"
            component={AddReport}
          />
          <Stack.Screen
            key="AddToilet"
            name="AddToilet"
            component={AddToilet}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
