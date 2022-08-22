import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import {
  Avatar,
  Badge,
  Button,
  Surface,
  TextInput,
  Title,
} from "react-native-paper";
import { api } from "../features/api";

const ChangePassword = ({ visible, ondismiss }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setCPassword] = useState("");
  const [oldPassword, setOPassword] = useState("");
  const [passError, setPassError] = useState([]);
  const [showPasserror, setShowpasserror] = useState(true);
  const parrer = [
    "is too Short",
    "must contain lower case",
    "must contain uppercase",
    "must contain numbers",
    "must contain non alpha numeric character",
    "do not match",
  ];
  const updatePassword = async () => {
    if (
      password !== "" &&
      confirmPassword == password &&
      oldPassword !== "" &&
      passError.length === 0
    ) {
      try {
        const data = await api().changePassword(
          JSON.stringify({
            oldPassword: oldPassword,
            newPassword: password,
          })
        );
        if (data) {
          Alert.alert("SUCCESS", "Password Changed");
          ondismiss();
        }
      } catch (err) {
        Alert.alert("INPUT ERROR", String(err));
      }
    } else {
      Alert.alert("INPUT ERROR", "Check your errors");
    }
  };
  const setPasswd = (text) => {
    setPassword(text);
    let r = [
      /(?=.{8,})/,
      /(?=.*[a-z])/,
      /(?=.*[A-Z])/,
      /(?=.*[0-9])/,
      /(?=.*[!@#\$%\^&\*\(\)])/,
    ];
    let x = [];
    for (let i in r) {
      if (!r[i].test(text)) x.push(i);
    }
    if (confirmPassword !== "" && confirmPassword != password) x.push(5);
    setPassError(x);
  };
  const confirmPass = (text) => {
    setCPassword(text);
    let l = passError.filter((p) => p !== 5);
    if (password != text) setPassError([...l, 5]);
    else {
      setPassError(l);
    }
  };
  return (
    <Modal visible={visible} transparent={true}>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.6)",
          justifyContent: "center",
        }}
      >
        <Surface
          style={{
            borderRadius: 10,
            padding: 30,
            marginHorizontal: "10%",
          }}
        >
          <Title style={{ textAlign: "center" }}>Update Password</Title>
          <TextInput
            mode="outlined"
            label="Old Password"
            textContentType="password"
            value={oldPassword}
            onChangeText={setOPassword}
            theme={{ colors: { placeholder: "#004225", primary: "#004225" } }}
          />

          <TextInput
            mode="outlined"
            label="New Password"
            textContentType="password"
            value={password}
            onChangeText={setPasswd}
            theme={{ colors: { placeholder: "#004225", primary: "#004225" } }}
          />

          <TextInput
            mode="outlined"
            label="Confirm Password"
            textContentType="newPassword"
            value={confirmPassword}
            theme={{ colors: { placeholder: "#004225", primary: "#004225" } }}
            onChangeText={confirmPass}
          />
          {password != "" ? (
            <View style={{ flexGrow: 1, paddingVertical: 10 }}>
              <TouchableWithoutFeedback
                onPress={() => setShowpasserror(!showPasserror)}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      color: passError.length == 0 ? "green" : "red",
                      fontSize: 18,
                    }}
                  >
                    Valid
                  </Text>
                  <Badge
                    style={{
                      backgroundColor: passError.length == 0 ? "green" : "red",
                    }}
                  >
                    {passError.length}
                  </Badge>
                </View>
              </TouchableWithoutFeedback>
              {showPasserror ? (
                <View>
                  <Text>Password: </Text>
                  <View style={{ marginLeft: 15 }}>
                    {parrer.map((e, i) => (
                      <Text
                        key={String(i)}
                        style={{
                          color:
                            passError.find((p) => p == i) !== undefined
                              ? "red"
                              : "green",
                        }}
                      >
                        {i == 5 && confirmPassword == "" ? null : e}
                      </Text>
                    ))}
                  </View>
                </View>
              ) : null}
            </View>
          ) : null}

          <Button
            mode="contained"
            onPress={updatePassword}
            style={{ marginVertical: 5 }}
          >
            Save
          </Button>
          <TouchableWithoutFeedback onPress={ondismiss}>
            <Avatar.Icon
              size={24}
              icon="close"
              style={{
                position: "absolute",
                top: -1,
                right: -1,
                backgroundColor: "red",
              }}
            />
          </TouchableWithoutFeedback>
        </Surface>
      </View>
    </Modal>
  );
};

export default ChangePassword;
