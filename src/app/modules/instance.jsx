// axios 모듈을 가져온다.
import axios from "axios";

const myToken = localStorage.getItem("token")
// 기지국을 세워야함 변수명을 instance해서 create를 이용해 기지국을 만들자 (다른거도 가능)
const instance = axios.create({
  headers: {
    Authorization: `Bearer ${myToken}`
  },
  baseURL: process.env.REACT_APP_API,
  withCredentials:true,
});

export const preInstance = axios.create({
  // headers: {
  //   Authorization: `Bearer ${myToken}`
  // },
  baseURL: process.env.REACT_APP_API,
  // withCredentials:true,
});

export default instance;