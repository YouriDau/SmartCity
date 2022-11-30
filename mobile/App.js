import { Provider } from "react-redux";
import { store } from "./redux/store";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerMenu from "./components/DrawerMenu";

import AddReview from "./screens/reviews/AddForm";
import ListReviews from "./screens/reviews/List";
import UpdateReview from "./screens/reviews/UpdateForm";
import DeleteReview from "./screens/reviews/DeleteForm";

import AddReport from "./screens/reports/AddForm";

import AddToilet from "./screens/toilets/AddForm";

import AddPerson from "./screens/account/RegistrationForm";

import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={"DrawerMenu"}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen
            key="DrawerMenu"
            name="DrawerMenu"
            component={DrawerMenu}
          />
          <Stack.Screen
            key="AddPerson"
            name="AddPerson"
            component={AddPerson}
          />
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
