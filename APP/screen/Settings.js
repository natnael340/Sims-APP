import React, { useState } from "react";
import { View, Text, Alert, TouchableWithoutFeedback } from "react-native";
import {
  Avatar,
  Badge,
  Banner,
  Caption,
  Colors,
  Divider,
  List,
  Surface,
  Title,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import ChangePassword from "../components/ChangePassword";
import Header from "../components/Header";
import styles from "../components/Style";
import * as ImagePicker from "expo-image-picker";
import { api } from "../features/api";
import { controller } from "../components/Api";

const Settings = (props) => {
  const [settingModal, setSettingModal] = useState({
    cp: false,
    ct: false,
    reg: false,
    dr: false,
  });
  const user = useAppSelector((state) => state.token.user);
  const token = useAppSelector((state) => state.token.token);
  const dispatch = useAppDispatch();
  const { info } = controller(dispatch, user);
  const uploadImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "ERROR",
        "Access to file permission is required for uploading image"
      );
    }
    if (status === "granted") {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });
      if (!result.cancelled) {
        let formdata = new FormData();
        let localUri = result.uri;
        let filename = localUri.split("/").pop();

        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        formdata.append("photo", {
          uri: result.uri,
          type,
          name: `photo.${type}`,
        });
        try {
          await api().updateProfile(formdata);
          info(true);
        } catch (error) {
          Alert.alert("ERROR", String(error));
        }
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={props.navigation} />
      <Banner
        visible={settingModal.reg}
        actions={[
          {
            label: "close",
            onPress: () => setSettingModal({ ...settingModal, reg: false }),
          },
        ]}
        icon={({ size }) => <Avatar.Icon size={42} icon="information" />}
      >
        <Title>Your Service Request is Submitted.</Title>
      </Banner>
      <ChangePassword
        visible={settingModal.cp}
        ondismiss={() => setSettingModal({ ...settingModal, cp: false })}
      />

      <View
        style={{
          flexDirection: "row",
          padding: 20,
        }}
      >
        <View style={{ position: "relative" }}>
          {user.image && user.image !== "" ? (
            <Avatar.Image
              source={{
                uri: user.image,
              }}
              size={100}
            />
          ) : (
            <Avatar.Text
              size={100}
              label={
                user.fullName.split(" ")[0][0] + user.fullName.split(" ")[1][0]
              }
            />
          )}
          <TouchableWithoutFeedback onPress={uploadImage}>
            <Avatar.Icon
              size={30}
              icon="pencil"
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                backgroundColor: Colors.green500,
              }}
            />
          </TouchableWithoutFeedback>
        </View>

        <View style={{ marginHorizontal: 20 }}>
          <Title>{user.fullName}</Title>
          <Caption>{user.sid}</Caption>
          <Caption>Computer Eng.</Caption>
        </View>
      </View>
      <Surface>
        <List.Section title="Setting">
          <Divider />
          <List.Item
            title="Change Password"
            onPress={() => setSettingModal({ ...settingModal, cp: true })}
          />
          <Divider />
        </List.Section>
        <List.Section title="Services">
          <Divider />
          <List.Item
            title="Register"
            onPress={() => setSettingModal({ ...settingModal, reg: true })}
          />
          <Divider />
        </List.Section>
      </Surface>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Developed by @malik</Text>
      </View>
    </SafeAreaView>
  );
};

export default Settings;
