import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { postMbtifetch } from "../../../app/modules/mbtiSlice";
import { tokenChecker, decodeMyTokenData } from "../../../utils/token";

const MbtiForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myCookie = decodeMyTokenData();
  const state = useSelector (state => state.mbti)

  if (tokenChecker() === false){
    navigate('/mypage')
  }

  //클라이언트에서 mbti 선택한 정보가 서버로 저장되었는지 확인후, 
  useEffect(()=> {
    if (state.message === "success")
      if (myCookie.mbti !== null )
        navigate('/')
  },[state])

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
    const selectedMbti = {mbti:myMbti} //!api 명세서 키값 확인
    dispatch(postMbtifetch(selectedMbti))
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
