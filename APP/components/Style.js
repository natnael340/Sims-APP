import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  barStyle: {
    marginHorizontal: 10,
  },
  gpaWrapper: {
    paddingHorizontal: 20,
  },
  linearGrad: {
    width: "100%",
    height: 10,
    marginBottom: 10,
  },
  cgpaWrapper: {
    flexDirection: "row",
    position: "relative",
  },
  cgpa: {
    fontSize: 18,
    marginTop: 5,
    position: "absolute",
  },
  gradeYearWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  gradeSemesterWrapper: {
    paddingHorizontal: 20,
    flexDirection: "row",
    backgroundColor: "rgba(208,240,192, 0.1)",
    justifyContent: "space-between",
    paddingVertical: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderColor: "#355e3b",
    borderWidth: 1,
  },
  semesterTextLabel: {
    color: "white",
    fontSize: 16,
  },
  reverse: {
    transform: [{ rotateX: "0deg" }],
  },
  orginal: {
    transform: [{ rotateX: "180deg" }],
  },
  heightMax: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  heightMin: {
    height: 0,
  },
  courseGradeWrapper: {
    backgroundColor: "#3C704F",
  },
  courses: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  divider: {
    backgroundColor: "white",
  },
  scrollWrapper: {
    height: "100%",
  },
  navbar: {
    height: 50,
    width: "100%",
    backgroundColor: "#3C704F",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  nabardra: {
    flexDirection: "row",
    alignItems: "center",
  },
  duapp: {
    color: "white",
    fontSize: 21,
    marginHorizontal: 10,
  },
  loginScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3C704F",
    paddingHorizontal: 30,
  },
  logo: {
    width: 200,
    height: 200,
  },
  logoText: {
    color: "white",
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 17,
    color: "white",
    marginVertical: 10,
  },
  textInput: {
    borderRadius: 5,
    backgroundColor: "#3C704F",
    height: 45,
    paddingHorizontal: 10,
    color: "#fff",
    fontSize: 18,
    width: "100%",
    marginVertical: 5,
  },
  passfield: {
    position: "relative",
    width: "100%",
  },
  show: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  loginForm: {
    width: "100%",
    alignItems: "flex-start",
  },
  actionWrapper: {
    flexDirection: "row",
    marginTop: 30,
    paddingHorizontal: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    width: "100%",
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#457E5A",
    borderWidth: 1,
    borderColor: "#4FBC4B",
  },
  btnText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  container: {
    flex: 1,
  },
  dormitaryWrapper: {
    paddingHorizontal: 20,
  },
  caption: {
    marginLeft: 50,
    fontSize: 14,
    color: "black",
  },
  mainTitle: {
    color: "#707070",
    marginLeft: 10,
  },
  dormContent: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  drawerWrapper: {
    flex: 1,
  },
  userInfo: {
    alignItems: "center",
  },
  proImageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "white",
    marginBottom: 10,
  },
  username: {
    color: "white",
  },
  userid: {
    fontSize: 16,
    color: "white",
  },
  dividerStyle: {
    borderColor: "white",
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  white: {
    color: "white",
  },
  grow: {
    flexGrow: 1,
  },
  settingItem: {},
});

export default styles;
