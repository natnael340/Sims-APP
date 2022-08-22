import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { BarChart } from "react-native-chart-kit";
import { Title, ActivityIndicator, Text, useTheme } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../components/Style";
import { controller, getStatus } from "../components/Api";
import { Sectioned, status as Statu } from "../components/DataHandler";
import { useAppDispatch, useAppSelector } from "../app/hooks";

export default function Status(props) {
  const [data, setData] = useState();
  const [bars, setBars] = useState();
  const [gpa, setGpa] = useState(0);
  const isMountedRef = useRef();
  const [refreshing, setRefreshing] = useState(false);
  const token = useAppSelector((state) => state.token.token);
  const stat = useAppSelector((state) => state.status.status);
  const cour = useAppSelector((state) => state.status.courses);
  const them = useTheme();
  const dispatch = useAppDispatch();
  const { info, status, courses } = controller(dispatch, status);

  useEffect(() => {
    isMountedRef.current = true;
    courses();
    if (stat.length === 0 && cour.length === 0) {
      info();
      status();
      courses();
    } else {
      cleanData(stat);
    }
    return () => (isMountedRef.current = false);
  }, [stat]);

  const cleanData = (resdata) => {
    if (!isMountedRef.current) return;
    const [bar, gp] = Statu(resdata);
    setBars(bar);
    setGpa(gp);
    setData(Sectioned(resdata, "year"));
  };
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    status(true).then(() => setRefreshing(false));
  }, [refreshing]);
  const chartConfig = {
    backgroundGradientFrom: them.colors.background,
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: them.colors.background,
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `#457E5A`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 1,
    fillShadowGradient: "#457E5A",
    useShadowColorFromDataset: false, // optional
    fillShadowGradientOpacity: 1,
  };

  useEffect(() => {
    if (token === "") {
      props.navigation.replace("Login");
      return;
    }
  }, [token]);
  return (
    <SafeAreaView style={styles.container}>
      <Header
        navigation={props.navigation}
        callback={() => {}}
        refresh={getStatus}
        token={token}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {bars == null ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator
              animating={true}
              color="#4FBC4B"
              size="large"
              hidesWhenStopped={true}
            />
          </View>
        ) : (
          <>
            <BarChart
              chartConfig={chartConfig}
              width={Dimensions.get("window").width - 20}
              height={220}
              data={bars}
              fromZero={true}
              style={styles.barStyle}
              yAxisInterval={1}
            />

            <View style={styles.gpaWrapper}>
              <View style={styles.cgpaWrapper}>
                <Title>CGPA</Title>
                <Text
                  style={{
                    ...styles.cgpa,
                    left: ((Dimensions.get("window").width - 65) / 4) * gpa,
                  }}
                >
                  {gpa}
                </Text>
              </View>
              <LinearGradient
                colors={["red", "yellow", "green"]}
                style={styles.linearGrad}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                locations={[0.1, 0.5, 1]}
              ></LinearGradient>
            </View>
            {data.map((d, i) => (
              <View key={String(i)}>
                <View style={styles.gradeYearWrapper}>
                  <Title>Year</Title>
                  <Title>{d.title}</Title>
                </View>
                {d.data.map((o, j) => (
                  <TouchableOpacity
                    style={styles.gradeSemesterWrapper}
                    key={String(j)}
                    onPress={() =>
                      props.navigation.navigate("StatusDetail", {
                        year: d.title,
                        semseter: o.semseter,
                        cp: o.cp,
                        sgpa: o.sgpa,
                      })
                    }
                  >
                    <Text
                      style={[styles.semesterTextLabel, { color: "#21421e" }]}
                    >
                      {o.semseter == 1
                        ? o.semseter + "st "
                        : o.semseter + "nd "}
                      Semester
                    </Text>
                    <Text
                      style={[styles.semesterTextLabel, { color: "#21421e" }]}
                    >
                      {o.cp}
                    </Text>
                    <Text
                      style={[styles.semesterTextLabel, { color: "#21421e" }]}
                    >
                      {o.sgpa}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
