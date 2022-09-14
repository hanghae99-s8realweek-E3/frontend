//대연 카카오 test용 소스

// import React, { useEffect } from "react";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";

// const KakaoOauth = (props) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const code = new URL(window.location.href).searchParams.get("code");

//   console.log(code);
//   console.log("하..")
//   console.log(props)
//   useEffect(() => {
//     if (code) {
//       console.log("통신해보자")
//       axios
//         .get(`${process.env.REACT_APP_API}/accounts/auth/kakao/callback?code=${code}`)
//         .then((response) => {
//           console.log("흑흑")
//           window.localStorage.setItem("token", response.data.token);
//           navigate("/");
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     }
//   }, [code]);
//   console.log("유스이펙트아래다이거!!!!!!!!")
//   return <></>;
// };

// export default KakaoOauth;