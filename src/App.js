import jwtDecode from 'jwt-decode';
import React from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import accountsSlice from './app/modules/accountsSlice';
import Router from './router/router';
import { getCookie } from './utils/cookie';


function App() {
  // 새로고침 시, 로그인된 상태라면 리듀서에 유저 정보를 넣어주도록 함.
  // 쿠키 정보 획득
  const myCookie = getCookie("token");
  const dispatch = useDispatch();
  
  // 쿠키 정보가 존재한다면 jwtDecode를 통해 payload data를 가져옴
  // dispatch를 통해서 reducer에 원하는 값을 저장해서 하위 컴포넌트에서도 문제 없이 받아올 수 있도록 함.
  if (myCookie !== null && myCookie !== undefined) {
    const myData = jwtDecode(myCookie);
    dispatch(accountsSlice.actions.currentUsers({nickname:myData.nickname, mbti:myData.mbti, userId:myData.userId}))
  }
  
  return (
    <div className="App">
      <>
      <Router/>
      </>
    </div>
  );
}

export default App;
