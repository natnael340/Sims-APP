import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import {
  Text,
  Title,
  Drawer,
  Divider,
  Avatar,
  useTheme,
  Caption,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { Icon } from "react-native-elements";
import styles from "../components/Style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { set } from "../features/token/tokenSlice";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { PreferenseContext } from "./Prefernces";

export default function CustomDrawer(props) {
  const user = useAppSelector((state) => state.token.user);
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { toggleTheme, isThemeDark } = React.useContext(PreferenseContext);
  return (
    <SafeAreaView style={styles.drawerWrapper}>
      <DrawerContentScrollView {...props}>
        <View style={styles.userInfo}>
          {user?.image && user?.image !== "" ? (
            <Avatar.Image
              source={{
                uri: user?.image,
              }}
              size={120}
            />
          ) : (
            <Avatar.Text
              size={120}
              label={
                user?.fullName?.split(" ")[0][0] + user?.fullName?.split(" ")[1][0]
              }
            />
          )}

          <Title>{user?.fullName}</Title>
          <Caption>{user?.sid}</Caption>
        </View>
        <Drawer.Section {...props}>
          <DrawerItem
            {...props}
            icon={(color, size) => (
              <FontAwesome5 name="poll-h" size={24} color={theme.colors.text} />
            )}
            label="Status"
            onPress={() => props.navigation.navigate("Status")}
          />
          <Divider />
          <DrawerItem
            {...props}
            icon={(color, size) => (
              <FontAwesome5 name="book" size={24} color={theme.colors.text} />
            )}
            label="Courses"
            onPress={() => props.navigation.navigate("Courses")}
          />
          <Divider />
          <DrawerItem
            {...props}
            icon={(color, size) => (
              <FontAwesome5
                name="building"
                size={24}
                color={theme.colors.text}
              />
            )}
            label="Dormitary"
            onPress={() => props.navigation.navigate("Dormitary")}
          />
        </Drawer.Section>
        <Drawer.Section title="Prefernces">
          <DrawerItem
            {...props}
            icon={(color, size) => (
              <FontAwesome5 name="cog" size={24} color={theme.colors.text} />
            )}
            label="Settings"
            onPress={() => props.navigation.navigate("Settings")}
          />
          <Divider />
          <TouchableRipple onPress={() => toggleTheme()}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 17,
                paddingVertical: 8,
              }}
            >
              <Text>Dark Theme</Text>
              <View pointerEvents="none">
                <Switch value={isThemeDark} />
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section>
      </DrawerContentScrollView>
      <Drawer.Section
        style={{
          position: "absolute",
          bottom: -4,
          left: 0,
          right: 0,
          margin: 0,
        }}
      >
        <Divider />
        <DrawerItem
          {...props}
          icon={(color, size) => (
            <Ionicons
              name="exit"
              size={24}
              color={theme.colors.text}
              style={{ transform: [{ rotate: "180deg" }] }}
            />
          )}
          label="Logout"
          onPress={async () => {
            dispatch(set());
            await AsyncStorage.clear();
            props.navigation.replace("Login");
          }}
        />
      </Drawer.Section>
    </SafeAreaView>
  );
}
