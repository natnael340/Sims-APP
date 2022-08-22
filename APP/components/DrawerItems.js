import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { View, Text } from "react-native";
import Courses from "../screen/Courses";
import Dormitary from "../screen/Dormitary";
import Settings from "../screen/Settings";
import Stat from "../screen/Stat";
import Status from "../screen/Status";
import CustomDrawer from "./CustomDrawer";

const DrawerItems = ({ navigation }) => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      initialRouteName="Status"
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        activeTintColor: "#ffffff",
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Status" component={Status} />
      <Drawer.Screen name="StatusDetail" component={Stat} />
      <Drawer.Screen name="Courses" component={Courses} />
      <Drawer.Screen name="Dormitary" component={Dormitary} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
};

export default DrawerItems;
