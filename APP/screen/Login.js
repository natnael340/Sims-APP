import React, { useEffect, useState } from "react";
import { Text, View, Image, Alert } from "react-native";
import {
  Button,
  TextInput,
  ActivityIndicator,
  Colors,
  Modal,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../components/Style";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { api } from "../features/api";
import { controller } from "../components/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { set } from "../features/token/tokenSlice";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passSecure, setPassSecure] = useState(true);
  const [loading, setloading] = useState(false);
  const pass = React.useRef();
  const isMountedRef = React.useRef();

  const dispatch = useAppDispatch();
  const Gtoken = useAppSelector((state) => state.token.token);

  const { info } = controller(dispatch, Gtoken);

  const login = async () => {
    if (username === "" || password === "") {
      Alert.alert("Error", "All fileds must be filled");
      return;
    }
    setloading(true);
    try {
      const { data } = await api().login(
        JSON.stringify({ username, password })
      );
      let l = {
        token: data.token,
      };

      await AsyncStorage.setItem("token", JSON.stringify(l));

      dispatch(set(data.token));
    } catch (err) {
      Alert.alert("error", String(err));
    }
    setloading(false);
  };

  useEffect(() => {
    if (Gtoken != "") {
      info().then(() => props.navigation.replace("Home"));
    }
  }, [Gtoken]);

  return (
    <SafeAreaView style={styles.loginScreen}>
      <Modal visible={loading} transparent={true}>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 20,
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center",
              height: 80,
              borderRadius: 5,
              padding: 30,
            }}
          >
            <ActivityIndicator
              animating={loading}
              hidesWhenStopped={true}
              color={Colors.green200}
              size="large"
            />
          </View>
        </View>
      </Modal>
      <Image source={require("../images/logo.png")} style={styles.logo} />

      <Text style={styles.logoText}>Dilla University Student Portal</Text>
      <View style={styles.loginForm}>
        <TextInput
          autoCapitalize="none"
          theme={{ colors: { text: "white" } }}
          mode="outlined"
          label="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.textInput}
          onSubmitEditing={() => pass.current.focus()}
          returnKeyType="next"
        />
        <TextInput
          autoCapitalize="none"
          theme={{ colors: { text: "white" } }}
          mode="outlined"
          value={password}
          label="Password"
          textContentType="password"
          onChangeText={setPassword}
          style={styles.textInput}
          secureTextEntry={passSecure}
          onSubmitEditing={login}
          outlineColor="#457E5A"
          ref={pass}
          right={
            <TextInput.Icon
              name="eye"
              color="#707070"
              onPress={() => setPassSecure(!passSecure)}
            />
          }
        />
        <View style={styles.actionWrapper}>
          <Button
            mode="contained"
            onPress={login}
            style={styles.buttons}
            labelStyle={styles.btnText}
          >
            Login
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
