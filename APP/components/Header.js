import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "../components/Style";
import { FontAwesome5 } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Colors, useTheme } from "react-native-paper";

export default function Header(props) {
  const theme = useTheme();
  return (
    <View style={styles.navbar}>
      <StatusBar hidden={false} backgroundColor="#457E5A" />
      <TouchableOpacity
        style={styles.nabardra}
        onPress={() => props.navigation.openDrawer()}
      >
        <FontAwesome5 name="bars" color="white" size={20} />

        <Text style={[styles.duapp, { fontWeight: "bold" }]}>DUAPP</Text>
      </TouchableOpacity>
    </View>
  );
}
