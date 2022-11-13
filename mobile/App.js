import { Provider } from "react-redux";
import { store } from "./redux/store";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerMenu from "./components/DrawerMenu";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// Tableau d'objets reprenant toutes les informations
// concernant les écrans (sert à la navigation)

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="DrawerMenu" component={DrawerMenu} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
