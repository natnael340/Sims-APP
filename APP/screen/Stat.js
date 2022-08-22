import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useAppSelector } from "../app/hooks";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card, Colors, Paragraph, Surface } from "react-native-paper";
const Stat = (props) => {
  const [data, setData] = useState([]);
  const { year, semseter, cp, sgpa } = props.route.params;
  const courses = useAppSelector((state) => state.status.courses);
  useEffect(() => {
    let l = courses.filter((c) => c.year == year && c.semseter == semseter);
    setData(l);
  }, [year, semseter]);

  const ScrollItems = ({ item }) => {
    const scrollViewRef = useRef();
    const [currentOffset, setCurrentOffset] = useState(0);
    const handelScroll = (e) => {
      var c = e.nativeEvent.contentOffset.x;
      if (c > currentOffset) scrollViewRef.current.scrollToEnd();
      else
        scrollViewRef.current.scrollTo({
          x: 0,
        });
      setCurrentOffset(c);
    };
    return (
      <Surface
        style={{
          backgroundColor: "white",
          padding: 10,
          borderRadius: 5,
          marginVertical: 10,
        }}
        key={String(item.id)}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", maxWidth: "70%" }}>
            {item.courseName}
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.grade}</Text>
        </View>
        <View style={{ paddingHorizontal: 10, overflow: "hidden" }}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{
                backgroundColor: currentOffset == 0 ? Colors.grey300 : "white",
                padding: 3,
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
              }}
              onPress={() =>
                scrollViewRef.current.scrollTo({
                  x: 0,
                })
              }
            >
              <Text>Report</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: currentOffset != 0 ? Colors.grey300 : "white",
                padding: 3,
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
              }}
              onPress={() => scrollViewRef.current.scrollToEnd()}
            >
              <Text>Info</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal={true}
            ref={scrollViewRef}
            onScroll={handelScroll}
            showsHorizontalScrollIndicator={false}
          >
            <View
              style={{
                backgroundColor: Colors.grey300,
                padding: 5,
                width: 300,
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
                borderTopRightRadius: 5,
              }}
            >
              {item?.assess.map((ase, i) => (
                <Text key={String(i)}>
                  {`${ase.assesementTitle}: ${ase.result}/${ase.outof}`}
                </Text>
              ))}
            </View>
            <View
              style={{
                backgroundColor: Colors.grey300,
                padding: 5,
                width: 300,
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
                borderTopRightRadius: 5,
              }}
            >
              {item?.assess
                .filter((o, i) => o.instructor !== null && i == 0)
                .map((o, i) => (
                  <View key={String(i)}>
                    <Text>Teacher: {o.instructor.name}</Text>
                    <Text>Office: {o.instructor.officeNo}</Text>
                    <Text>Phone Number: {o.instructor.phoneNumber}</Text>
                  </View>
                ))}
            </View>
          </ScrollView>
        </View>
      </Surface>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header navigation={props.navigation} />
      <ScrollView style={{ overflow: "scroll", flex: 1 }}>
        <View
          style={{ width: "100%", alignItems: "center", marginVertical: 10 }}
        >
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              borderWidth: 3,
              borderColor: "black",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "black", fontSize: 36, fontWeight: "bold" }}>
              {sgpa}
            </Text>
          </View>
        </View>
        <View
          style={{
            position: "absolute",
            right: 0,
            top: 20,
            padding: 5,
            backgroundColor: "black",
            borderTopLeftRadius: 5,
            borderBottomStartRadius: 5,
          }}
        >
          <Text style={{ color: "white" }}>{cp} CP</Text>
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          {data.map((item, i) => (
            <ScrollItems item={item} key={String(item.id)} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Stat;

const styles = StyleSheet.create({});
