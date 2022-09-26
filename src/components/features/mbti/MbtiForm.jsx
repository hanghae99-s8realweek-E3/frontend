import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import instance from "../../../app/modules/instance";
import { setCookie } from "../../../utils/cookie";
import { tokenChecker, decodeMyTokenData } from "../../../utils/token";

const MbtiForm = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const state = useSelector (state => state.mbti)
  const kakaoToken = new URL(window.location.href).searchParams.get("token");
  if (kakaoToken !== null) {
    window.localStorage.setItem("token", kakaoToken);
  }

  if (tokenChecker() === false) {
    navigate("/mypage");
  }
  //클라이언트에서 mbti 선택한 정보가 서버로 저장되었는지 확인후,
  const myToken = decodeMyTokenData();

  useEffect(() => {
    if (myToken !== undefined && myToken !== null) {
      if (myToken.mbti !== undefined) {
        navigate("/");
      }
    }
  }, []);

  const [myMbti, setMyMbti] = useState("");
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

  const onClickSetMbti = (e) => {
    e.preventDefault();
    setMyMbti(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //payload
    const selectedMbti = { mbti: myMbti }; //!api 명세서 키값 확인
    //post 만들기
    const postMbtifetch = async () => {
      try {
        const response = await instance.post("/accounts/mbti", selectedMbti);
        if (response.data.message === "success") {
          setCookie("firstLogin", "true", 300);
          window.localStorage.setItem("token", response.data.token);
          navigate("/");
        }
      } catch (error) {
        return alert(error.response.data.errorMessage);
      }
    };
    postMbtifetch();
    // dispatch(postMbtifetch(selectedMbti))
  };

  return (
    <StDiv>
      <form onSubmit={onSubmit}>
        <div>
          <StGrid>
            {mbtiList.map((elem, idx) => {
              return (
                <StMBTIBtn
                  key={idx}
                  color={myMbti === elem ? "#ffffff" : "#909090"}
                  background={myMbti === elem ? "#ff6d53" : "#ffffff"}
                  border={
                    myMbti === elem ? "1px solid #ff6d53" : "1px solid #979797"
                  }
                  onClick={onClickSetMbti}
                  value={elem}>
                  {elem}
                </StMBTIBtn>
              );
            })}
          </StGrid>
        </div>
        <StHelpButton>
          <FontAwesomeIcon icon={faQuestion} style={helpButton} />
          MBTI란?
        </StHelpButton>
        <StCommonButton type="submit">확인</StCommonButton>
      </form>
    </StDiv>
  );
};

export default MbtiForm;

const StDiv = styled.div`
  height: 100vh;
  overflow: scroll;
`;

const StGrid = styled.div`
  /* background-color: red; */
  display: grid;
  display: inline-grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 10px;
  margin-top: 70px;
  padding: 10px;
  @media only screen and (max-width: 500px) {
  }
`;
const StButton = styled.button`
  outline: none;
  border: none;
  color: white;
  border-radius: 10px;

  height: ${(props) => props.height || "80px"};
  width: 80px;
  font-size: 1rem;

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

const StMBTIBtn = styled.button`
  background: ${(props) => props.background};

  color: ${(props) => props.color};
  font-weight: 500;
  font-size: 18px;
  padding: auto;

  border: ${(props) => props.border || "1px solid #979797"};
  border-radius: 6px;

  height: 105px;
  width: 105px;
  box-sizing: border-box;
  cursor: pointer;
  @media only screen and (max-width: 500px) {
    height: 75px;
    width: 75px;
    margin: auto;
  }
  transition: ease 0.1s;
  &:hover {
    transform: scale(1.03);
  }
  @media only screen and (max-width: 500px) {
    font-size: 15px;
  }
`;

const StSlideDiv = styled.div`
  background: #e8e8e8;

  width: 42.67px;
  height: 5.33px;

  border-radius: 133.333px;
  margin: 21px auto 28px auto;
`;

const StElem = styled.div``;

const StCommonButton = styled.button`
  background: #ff6d53;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 22px;
  color: #ffffff;

  border-radius: 6px;
  margin: ${(props) => props.margin || "25px"};
  width: 450px;
  height: 70px;

  cursor: pointer;
  @media only screen and (max-width: 500px) {
    width: 330px;
    margin: 15px;
  }
  transition: ease 0.05s;
  &:hover {
    background: #ffa595;
  }
`;

const StHelpButton = styled.button`
  background: none;

  display: flex;
  align-items: center;

  font-size: 18px;
  color: #979797;
  font-weight: 500;

  border: none;
  outline: none;
  margin: 15px;
  margin-top: 0px;

  cursor: pointer;
  @media only screen and (max-width: 500px) {
  }
`;

const helpButton = {
  background: "gray",

  color: "white",

  borderRadius: "50%",
  margin: "0 10px 0 0",
  padding: "6px",

  height: "21px",
  width: "21px",
};
