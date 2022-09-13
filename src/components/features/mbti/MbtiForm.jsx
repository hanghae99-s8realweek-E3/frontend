import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import instance from "../../../app/modules/instance";
import { setCookie } from "../../../utils/cookie";
import { tokenChecker, decodeMyTokenData } from "../../../utils/token";

const MbtiForm = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const myToken = decodeMyTokenData();
  // const state = useSelector (state => state.mbti)
  const kakaoToken = new URL(window.location.href).searchParams.get("token");
  if (kakaoToken !== null ) {
    window.localStorage.setItem("token", kakaoToken)
  }

  if (tokenChecker() === false){
    navigate('/mypage')
  }
  console.log(myToken,kakaoToken)
  //클라이언트에서 mbti 선택한 정보가 서버로 저장되었는지 확인후, 
  useEffect(()=> {
    if (myToken !== undefined && myToken !== null) {
      if (myToken.mbti !== null) {
        navigate('/')
      }
    }
    if (kakaoToken !== undefined && kakaoToken !== null) {
      if (kakaoToken.mbti !== null) {
        navigate('/')
      }
    }
      },[])

  const [myMbti, setMyMbti] = useState(false);
  const mbtiList = [
    "ISTJ","ISFJ","INFJ","INTJ","ISTP","ISFP","INFP","INTP","ESTP","ESFP","ENFP","ENTP","ESTJ","ESFJ","ENFJ","ENTJ",
  ];
  
  const onClickSetMbti = (e) => {
    e.preventDefault();
    setMyMbti(e.target.value)
  }
  
  const onSubmit = (e) => {
    e.preventDefault();
    //payload
    const selectedMbti = {mbti:myMbti} //!api 명세서 키값 확인
    //post 만들기
    const postMbtifetch = async ()=> {
      const response = await instance.post("/accounts/mbti", selectedMbti);
      if (response.data.message === "success") {
        setCookie("firstLogin", "true", 300);
        window.localStorage.setItem("token", response.data.token)
        window.location.assign('/') //윈도우 어싸인과 네이게이터의 차이: 네이게이터는 리액트라우터돔과 관련,(현재 토큰갱신 문제때문에 윈도우어싸인을 사용하고있지만 해결중...)
      } else {
        return alert(response.response.data.errorMessage)
      }
    }
    postMbtifetch();
    // dispatch(postMbtifetch(selectedMbti))
  }
  

  return (
    <StDiv>
      <form onSubmit={onSubmit}>
          <div>
              <p>선택한 MBTI: </p>
              <h2>{myMbti}</h2>
            <StGrid>
              {mbtiList.map((x, index) => {
                return (
                  <StButton color={(mbtiList[index] !== setMyMbti ? "gray":"")}  key={index} value={mbtiList[index]} onClick={onClickSetMbti}> 
                  {mbtiList[index]}  
                  </StButton>);
                })}
            </StGrid>
          </div>
              <StButton  color="black" height="50px" type="submit"  >설정완료</StButton>
      </form>
    </StDiv>
  );
};

export default MbtiForm;

const StDiv = styled.div`
  height:100%;
  overflow:scroll;
`;

const StGrid = styled.div`
  display: grid;
  display: inline-grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 10px;
  row-gap: 10px;
  margin: auto;
  padding: 10px;
`;
const StButton = styled.button`
  outline: none;
  border: none;
  color: white;
  border-radius: 10px;

  height: ${(props) => props.height || "80px"};
  width: 80px;
  font-size: 0.8rem;

  cursor: pointer;

  background: ${(props) => props.color || "#228be6"};

  &:hover {
    background: #fff;
    color: black;
  }

  &:active {
    background: black;
    color: white;
  }
`;
