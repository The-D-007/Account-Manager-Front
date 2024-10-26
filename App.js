import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Dashboard from "./screens/Dashboard";
import Accounts from "./screens/Accounts";
import Help from "./screens/Help";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerType="slide"
        screenOptions={{
          drawerActiveBackgroundColor: "#f2f4f7",
          drawerInactiveBackgroundColor: "#fff",
          drawerActiveTintColor: "#333",
          drawerInactiveTintColor: "#666",
          drawerStyle: {
            backgroundColor: "#fff",
            width: 260,
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 3,
          },
        }}
      >
        <Drawer.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="home-outline" size={25} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Account"
          component={Accounts}
          options={{
            drawerIcon: ({ color }) => (
              <MaterialIcons name="account-circle" size={25} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Help"
          component={Help}
          options={{
            drawerIcon: ({ color }) => (
              <MaterialIcons name="help-outline" size={25} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
