import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Dimensions,
  RefreshControl,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { PieChart } from "react-native-chart-kit";
import { ActivityIndicator, DataTable, Title } from "react-native-paper";
import styles from "../components/Style";
import { controller, getCourses } from "../components/Api";
import {
  SortData,
  getCourses as gco,
  compare,
} from "../components/DataHandler";
import { useAppDispatch, useAppSelector } from "../app/hooks";

export default function Courses(props) {
  const [data, setData] = React.useState(null);
  const [piData, setPieData] = React.useState({ total: 100, taken: 50 });
  const isMountedRef = React.useRef(false);
  const [odata, setOdata] = React.useState();
  const [refreshing, setRefreshing] = React.useState(false);

  const cour = useAppSelector((state) => state.status.courses);
  const token = useAppSelector((state) => state.token.token);
  const dispatch = useAppDispatch();
  const { courses } = controller(dispatch, cour);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    courses(true).then(() => setRefreshing(false));
  }, [refreshing]);

  React.useEffect(() => {
    if (token === "") {
      props.navigation.replace("Login");
      return;
    }
  }, [token]);

  useEffect(() => {
    isMountedRef.current = true;
    if (cour.length === 0) {
      courses();
    } else {
      let d = [...cour];
      d = SortData(d);
      processData(d);
    }
    return () => (isMountedRef.current = false);
  }, [cour]);

  const processData = (resdata) => {
    if (!isMountedRef.current) return;
    setOdata(resdata);
    let [c, sgp, r] = gco(resdata);

    setData(c);
    setPieData(r);
  };

  const DATA = [
    {
      name: "Finished",
      amount: piData.taken,
      color: "#00693e",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Unfinished",
      amount: piData.total - piData.taken,
      color: "#d0f0c0",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  const chartConfig = {
    backgroundGradientFrom: "#E8E8E8",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#E8E8E8",
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `#457E5A`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 1,
    fillShadowGradient: "#457E5A",
    useShadowColorFromDataset: false, // optional
    fillShadowGradientOpacity: 1,
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        navigation={props.navigation}
        callback={() => {}}
        refresh={getCourses}
        token={props.token}
      />
      {data == null ? (
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
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={[styles.piechartWrapepr]}>
            <PieChart
              data={DATA}
              width={Dimensions.get("window").width - 20}
              height={220}
              chartConfig={chartConfig}
              accessor="amount"
              backgroundColor="transparent"
              paddingLeft="15"
            />
          </View>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Course Name</DataTable.Title>
              <DataTable.Title numeric>Year</DataTable.Title>
              <DataTable.Title numeric>Semester</DataTable.Title>
              <DataTable.Title numeric>CP</DataTable.Title>
            </DataTable.Header>

            {odata?.map((y, i) => (
              <DataTable.Row key={String(i)}>
                <DataTable.Cell>{y.courseName}</DataTable.Cell>
                <DataTable.Cell numeric>{y.year}</DataTable.Cell>
                <DataTable.Cell numeric>{y.semseter}</DataTable.Cell>
                <DataTable.Cell numeric>{y.cp}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
