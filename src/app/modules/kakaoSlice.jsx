import axios from "axios";


// export const api = axios.create({
//   baseURL: "/api/accounts/auth/kakao/callback",
//   // withCredentials: false,
// });
// //1. axios 인터셉터 생성
// export const instances = axios.create({
//   baseURL: "URL",
// });

// //2. 요청 인터셉터
// api.interceptors.request.use(
//   //요청직전 호출
//   (config) => {
//     console.log("하")
//     const myToken = window.localStorage.getItem("token");
//     config.headers.Authorization = `Bearer ${myToken}`;
//     console.log(config)
//     return config;
//   }
//   //에러 전 호출
// );

// instances.interceptors.request.use(
//   //요청직전 호출
//   (config) => {
//     console.log("하하하하")
//     const myToken = window.localStorage.getItem("token");
//     // const tokens = Token.split('=')[1];
//     config.headers = {
//       "Content-Type": "multipart/form-data",
//       accept: "application/json",
//       Authorization: `Bearer ${myToken}`,
//     };
//     return config;
//   },
//   //에러 전 호출
//   (err) => {
//     console.error(err);
//   }
// );

// //3. 응답 인터셉터
// api.interceptors.response.use(
//   (success) => {
//     console.log("아아아아아앙")
//     const response = success.data;
//     if (response.statusCode === 200 && response.responseMessage === "조회 성공") {
//       return response.posts;
//     }

//     return success;
//   },
//   (error) => {
//     console.error(error);
//   }
// );
// export const TokenCheck = localStorage.getItem("token") ? true : false;
// kakao 연결용
const KAKAO_REDIRECT_URI = `${process.env.REACT_APP_KAKAO_URL}/accounts/auth/kakao/callback`;

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
