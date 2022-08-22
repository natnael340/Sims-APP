import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  DefaultTheme as paperDefaultTheme,
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
} from "react-native-paper";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "./screen/Splash";
import Login from "./screen/Login";
import DrawerItems from "./components/DrawerItems";
import { PreferenseContext } from "./components/Prefernces";
import merge from "deepmerge";

const PDefaultTheme = {
  ...paperDefaultTheme,
  colors: {
    ...paperDefaultTheme.colors,
    primary: "#457E5A",
  },
};

const Stack = createNativeStackNavigator();
const CombineDefaultTheme = merge(DefaultTheme, PDefaultTheme);
const CombineDarkTheme = merge(DarkTheme, PaperDarkTheme);

export default function App() {
  const [isThemeDark, setIsThemeDark] = useState(false);

  let theme = isThemeDark ? CombineDarkTheme : CombineDefaultTheme;
  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preference = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark]
  );

  return (
    <SafeAreaProvider>
      <PreferenseContext.Provider value={preference}>
        <PaperProvider theme={theme}>
          <NavigationContainer theme={theme}>
            <Provider store={store}>
              <Stack.Navigator
                initialRouteName="Splash"
                screenOptions={{ headerShown: false }}
              >
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Home" component={DrawerItems} />
              </Stack.Navigator>
            </Provider>
          </NavigationContainer>
        </PaperProvider>
      </PreferenseContext.Provider>
    </SafeAreaProvider>
  );
}
