import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../features/api";
import { addCourses, addDorm, addStatus } from "../features/status/statusSlice";
import { set, user } from "../features/token/tokenSlice";

const ip = "10.221.18.176";

export const loginAsync = (username, password, respond) => {
  let url = `http://${ip}:5000/api/auth/login`;
  let data = {
    username: username,
    password: password,
  };
  let result = fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((res) => respond(res))
    .catch((error) => respond({ message: String(error) }));
};

export const getStatus = (token, respond) => {
  console.log("status api hit");
  let url = `http://${ip}:5000/api/student/status`;
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => {
      if (res.status == 200) return res.json();
      else if (res.status == 401) return { redirect: 1 };
      else return { error: 1, message: res.statusText };
    })
    .then((response) => respond(response))
    .catch((error) => respond({ error: 1, message: String(error) }));
};

export const getGrade = (token, data, respond) => {
  console.log("grade api hit");
  let url = `http://${ip}:5000/api/student/grade/?year=${data.year}&semseter=${data.semseter}`;
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => {
      if (res.status == 200) return res.json();
      else if (res.status == 401) return { redirect: 1 };
      else return { error: 1, message: String(res.statusText) };
    })
    .then((res) => respond(data.year, data.semseter, res))
    .catch((err) =>
      respond(data.year, data.semseter, { error: 1, message: String(err) })
    );
};

export const getCourses = (token, respond) => {
  let url = `http://${ip}:5000/api/student/courses/`;
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => {
      if (res.status == 200) return res.json();
      else if (res.status == 401) return { redirect: 1 };
      else return { error: 1, message: String(res.statusText) };
    })
    .then((res) => respond(res))
    .catch((err) => respond({ error: 1, message: String(err) }));
};

export const getProfile = (token, respond) => {
  let url = `http://${ip}:5000/api/student/`;
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => res.json())
    .then((res) => respond(res))
    .catch((err) => respond({ error: 1, message: String(err) }));
};
export const getDorm = (token, respond) => {
  let url = `http://${ip}:5000/api/student/dormitary/`;
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => {
      if (res.status == 200) return res.json();
      else if (res.status == 401) return { redirect: 1 };
      else return { error: 1, message: String(res.statusText) };
    })
    .then((res) => respond(res))
    .catch((err) => respond({ error: 1, message: String(err) }));
};

export const controller = (dispatch, store) => ({
  info: async (refresh) => {
    try {
      const rows = await AsyncStorage.getItem("token");
      if (!rows || !JSON.parse(rows).user || refresh) {
        try {
          const { data } = await api().info();
          let userrr = {
            user: {
              fullName: data.fullName,
              sid: data.sid,
              image: data.image,
            },
          };

          await AsyncStorage.mergeItem("token", JSON.stringify(userrr));

          dispatch(user(userrr.user));
        } catch (error) {
          throw Error("Connection Error" + error);
        }
      } else {
        dispatch(user(JSON.parse(rows).user));
      }
    } catch (error) {
      await AsyncStorage.removeItem("token");
      dispatch(set());
      console.log("error", error);
    }
  },
  status: async (refresh) => {
    try {
      const rows = await AsyncStorage.getItem("status");
      if (!rows || JSON.parse(rows).length === 0 || refresh) {
        try {
          const { data } = await api().status();
          await AsyncStorage.setItem("status", JSON.stringify(data));
          dispatch(addStatus(data));
        } catch (error) {
          throw Error("Connection Error" + error);
        }
      } else {
        dispatch(addStatus(JSON.parse(rows)));
      }
    } catch (error) {
      await AsyncStorage.removeItem("token");
      dispatch(set());
      console.log("error", error);
    }
  },
  courses: async (refresh) => {
    try {
      const rows = await AsyncStorage.getItem("courses");
      if (!rows || JSON.parse(rows).length === 0 || refresh) {
        try {
          const { data } = await api().courses();
          await AsyncStorage.setItem("courses", JSON.stringify(data));
          dispatch(addCourses(data));
        } catch (error) {
          throw Error("Connection Error" + error);
        }
      } else {
        dispatch(addCourses(JSON.parse(rows)));
      }
    } catch (error) {
      await AsyncStorage.removeItem("token");
      dispatch(set());
      console.log("error", error);
    }
  },
  dorm: async (refresh) => {
    try {
      const rows = await AsyncStorage.getItem("dorm");
      if (!rows || JSON.parse(rows).length === 0 || refresh) {
        try {
          const { data } = await api().dorm();
          await AsyncStorage.setItem("dorm", JSON.stringify(data));
          dispatch(addDorm(data));
        } catch (error) {
          throw Error("Connection Error" + error);
        }
      } else {
        dispatch(addDorm(JSON.parse(rows)));
      }
    } catch (error) {
      await AsyncStorage.removeItem("token");
      dispatch(set());
      console.log("error", error);
    }
  },
  updatePro: async (data) => {
    try {
      const { data } = await api().updateProfile(data);
      console.log(data);
    } catch (err) {
      console.log("error", err);
    }
  },
});
