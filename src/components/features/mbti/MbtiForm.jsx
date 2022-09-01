import React, { useState } from "react";
import styled from "styled-components";

const MbtiForm = () => {
  const [myMbti, setMyMbti] = useState();
  const mbtiList = [
    "ISTJ",
    "ISFJ",
    "INFJ",
    "INTJ",
    "ISTP",
    "ISFP",
    "INFP",
    "INTP",
    "ESTP",
    "ESFP",
    "ENFP",
    "ENTP",
    "ESTJ",
    "ESFJ",
    "ENFJ",
    "ENTJ",
  ];

  const onSetMbti = (e) => {
    e.preventDefault();
  };

  // const onSubmit = () => {
  // }

  return (
    <StDiv>
    {/* <form >
    <input
        type="text"
    />
    <button>저장(테스트)</button>
    </form>
    <hr></hr> */}
        <div>
            <p>선택한 MBTI: <h2>{myMbti}</h2></p>
            <StGrid>
            {mbtiList.map((x, index) => {
                return (<StButton key={index} value={mbtiList[index]} onClick={(e) => setMyMbti(e.target.value)}> {mbtiList[index]}</StButton>);
                })}
            </StGrid>
        </div>
        <StButton color="#87cefa" height="50px" type="submit" onClick={onSetMbti}>MBTI 설정</StButton>
    </StDiv>
    );

    {
    /* <button onClick={(e)=>setMbtiList(e.target.value)} value="ISTJ" >ISTJ</button>
    <button onClick={(e)=>setMbtiList(e.target.value)} value="ISFJ" >ISFJ</button>
    <button onClick={(e)=>setMbtiList(e.target.value)} value="INFJ" >INFJ</button>
    <button onClick={(e)=>setMbtiList(e.target.value)} value="INTJ" >INTJ</button>
    <button onClick={(e)=>setMbtiList(e.target.value)} value="ISTP" >ISTP</button>
    <button onClick={(e)=>setMbtiList(e.target.value)} value="ISFP" >ISFP</button>
    <button onClick={(e)=>setMbtiList(e.target.value)} value="INFP" >INFP</button>
    <button onClick={(e)=>setMbtiList(e.target.value)} value="INTP" >INTP</button>
    <button onClick={(e)=>setMbtiList(e.target.value)} value="ESTP" >ESTP</button>
    <button onClick={(e)=>setMbtiList(e.target.value)} value="ESFP" >ESFP</button>
    <button onClick={(e)=>setMbtiList(e.target.value)} value="ENFP" >ENFP</button>
    <button onClick={(e)=>setMbtiList(e.target.value)} value="ENTP" >ENTP</button>
    <button onClick={(e)=>setMbtiList(e.target.value)} value="ESTJ" >ESTJ</button>
    <button onClick={(e)=>setMbtiList(e.target.value)} value="ESFJ" >ESFJ</button>
    <button onClick={(e)=>setMbtiList(e.target.value)} value="ENFJ" >ENFJ</button>
    <button onClick={(e)=>setMbtiList(e.target.value)} value="ENTJ" >ENTJ</button> */
  }
};

export default MbtiForm;

const StDiv = styled.div`
  margin-top: 100px;
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

  height: ${(props) => props.height || "100px"};
  width: 100px;
  font-size: 1rem;

  cursor: pointer;

  background: ${(props) => props.color || "#228be6"};

  &:hover {
    background: #fff;
    color: black;
  }

  &:active {
    background: ${(props) => props.color || "#228be6"};
    color: white;
  }
`;
