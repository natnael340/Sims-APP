import React, { useEffect, useRef, useState } from "react";
import { StatusBar, Animated, Dimensions } from "react-native";
import { controller } from "../components/Api";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { set } from "../features/token/tokenSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Splash = (props) => {
  const logoAnimate = React.useRef(new Animated.Value(0)).current;
  const { width } = Dimensions.get("window");
  const isMountedRef = React.useRef();
  const [animationEnd, setAnimationEnd] = React.useState(false);
  const [fetchingData, setFetchingData] = React.useState(true);
  //data
  const token = useAppSelector((state) => state.token.token);
  const dispatch = useAppDispatch();

  //login code end

  //animation code
  const ITEM_HEIGHT = width * 0.6;

  const scale = logoAnimate.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  React.useEffect(() => {
    isMountedRef.current = true;
    Animated.spring(logoAnimate, {
      toValue: 1,
      friction: 1,
      useNativeDriver: true,
    }).start(() => setAnimationEnd(true));
    return () => (isMountedRef.current = false);
  }, []);
  //animation end

  React.useEffect(() => {
    if (animationEnd && token !== "") {
      props.navigation.navigate("Home");
    } else if (animationEnd && !fetchingData)
      props.navigation.navigate("Login");
  }, [animationEnd, token, fetchingData]);

  const { info, status } = controller(dispatch, token);

  React.useEffect(() => {
    (async () => {
      const t = await AsyncStorage.getItem("token");
      if (t && JSON.parse(t).token !== "") {
        status();
        info();
        dispatch(set(JSON.parse(t).token));
      }
      setFetchingData(false);
    })();
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3C704F",
      }}
    >
      <StatusBar hidden />

      <Animated.Image
        source={require("../images/logo.png")}
        style={{
          width: ITEM_HEIGHT,
          height: ITEM_HEIGHT,
          transform: [
            {
              scale,
            },
          ],
        }}
      />
    </SafeAreaView>
  );
};

export default Splash;
