import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const ip = "192.168.43.43";
const customRequest = axios.create({
  baseURL: `http://${ip}:5000/api/`,
  headers: {
    "Content-Type": "application/json",
  },
});
const unintercepted = axios.create({
  baseURL: `http://${ip}:5000/api/`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});
customRequest.interceptors.request.use(
  async (config) => {
    let token = await AsyncStorage.getItem("token");
    if (!token) throw new axios.Cancel("no token");
    config.headers["Authorization"] = "Bearer " + JSON.parse(token).token;
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export const api = () => ({
  login: (data) => unintercepted.post("auth/login", data),
  info: () => customRequest.get("student/"),
  status: () => customRequest.get("student/status"),
  courses: () => customRequest.get("student/courses"),
  dorm: () => customRequest.get("student/dormitary"),
  updateInfo: (data) => customRequest.post("student/info", data),
  changePassword: (data) => customRequest.post("auth/changepassword", data),
  updateProfile: (data) =>
    customRequest.post("student/upload", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    }),
});
