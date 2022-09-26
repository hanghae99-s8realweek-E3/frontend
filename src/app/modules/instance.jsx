// axios 모듈을 가져온다.
import axios from "axios";

// 기지국을 세워야함 변수명을 instance해서 create를 이용해 기지국을 만들자 (다른거도 가능)
const instance = axios.create({
  // headers: {
  //   Authorization: `Bearer ${localStorage.getItem("token")}`
  // },
  baseURL: process.env.REACT_APP_API,
  withCredentials: true,
});

instance.interceptors.request.use(
  function (config) {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const preInstance = axios.create({
  baseURL: process.env.REACT_APP_API,
});

export default instance;
