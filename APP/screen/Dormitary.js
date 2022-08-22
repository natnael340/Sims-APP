import React, { useEffect } from "react";
import { View, ScrollView, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import {
  Title,
  Caption,
  ActivityIndicator,
  useTheme,
} from "react-native-paper";
import { Icon } from "react-native-elements";
import styles from "../components/Style";
import { controller, getDorm } from "../components/Api";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { PreferenseContext } from "../components/Prefernces";

export default function Dormitary(props) {
  const [data, setData] = React.useState();
  const isMountedRef = React.useRef();
  const [refreshing, setRefreshing] = React.useState(false);
  const dorrm = useAppSelector((state) => state.status.dorm);
  const token = useAppSelector((state) => state.token.token);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { dorm } = controller(dispatch, dorm);
  const { isThemeDark } = React.useContext(PreferenseContext);
  useEffect(() => {
    isMountedRef.current = true;
    if (!dorrm) {
      (async () => {
        await dorm();
      })();
    } else {
      setD(dorrm);
    }
    return () => (isMountedRef.current = false);
  }, [dorrm, token]);
  React.useEffect(() => {
    if (token === "") {
      props.navigation.replace("Login");
      return;
    }
  }, [token]);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    dorm(true).then(() => setRefreshing(false));
  }, [refreshing]);
  const setD = (resdata) => {
    if (!isMountedRef) return;
    setData(resdata);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        navigation={props.navigation}
        callback={() => {}}
        refresh={getDorm}
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
          style={styles.dormitaryWrapper}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View>
            <View style={styles.dormContent}>
              <Icon
                color="#707070"
                name="graduation-cap"
                type="font-awesome-5"
              />
              <Title style={styles.mainTitle}>Campus</Title>
            </View>
            <Caption
              style={[
                styles.caption,
                { color: isThemeDark ? "white" : "black" },
              ]}
            >
              {data?.campus}
            </Caption>
          </View>
          <View>
            <View style={styles.dormContent}>
              <Icon color="#707070" name="numeric" type="material-community" />
              <Title style={styles.mainTitle}>Building Number</Title>
            </View>
            <Caption
              style={[
                styles.caption,
                { color: isThemeDark ? "white" : "black" },
              ]}
            >
              {data?.buildingNo}
            </Caption>
          </View>
          <View>
            <View style={styles.dormContent}>
              <Icon
                color="#707070"
                name="alphabetical"
                type="material-community"
              />
              <Title style={styles.mainTitle}>Building Name</Title>
            </View>
            <Caption
              style={[
                styles.caption,
                { color: isThemeDark ? "white" : "black" },
              ]}
            >
              {data?.buildingName}
            </Caption>
          </View>
          <View>
            <View style={styles.dormContent}>
              <Icon
                color="#707070"
                name="floor-plan"
                type="material-community"
              />
              <Title style={styles.mainTitle}>Floor</Title>
            </View>
            <Caption
              style={[
                styles.caption,
                { color: isThemeDark ? "white" : "black" },
              ]}
            >
              {data?.floor}
            </Caption>
          </View>
          <View>
            <View style={styles.dormContent}>
              <Icon color="#707070" name="home" type="material-community" />
              <Title style={styles.mainTitle}>Dorm</Title>
            </View>
            <Caption
              style={[
                styles.caption,
                { color: isThemeDark ? "white" : "black" },
              ]}
            >
              {data?.dorm}
            </Caption>
          </View>
          <View>
            <View style={styles.dormContent}>
              <Icon color="#707070" name="numeric" type="material-community" />
              <Title style={styles.mainTitle}>Bed Number</Title>
            </View>
            <Caption
              style={[
                styles.caption,
                { color: isThemeDark ? "white" : "black" },
              ]}
            >
              {data?.bedNo}
            </Caption>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
