import { Provider } from "react-redux";
import { store } from "./redux/store";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerMenu from "./components/DrawerMenu";

import AddReview from "./screens/reviews/AddForm";
import UpdateReview from "./screens/reviews/UpdateForm";
import DeleteReview from "./screens/reviews/DeleteForm";

import AddReport from "./screens/reports/AddForm";

import AddToilet from "./screens/toilets/AddForm";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// Tableau d'objets reprenant toutes les informations
// concernant les écrans (sert à la navigation)

const App = () => {
  const navigationScreens = [
    {
      name: "DrawerMenu",
      component: DrawerMenu,
    },
    {
      name: "AddReview",
      component: AddReview,
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
  ];
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {navigationScreens.map((screen) => (
            <Drawer.Screen
              key={screen.name}
              name={screen.name}
              component={screen.component}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
