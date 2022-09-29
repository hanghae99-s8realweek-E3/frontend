import { faQuestion, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import instance from "../../../app/modules/instance";
import { tokenChecker, decodeMyTokenData } from "../../../utils/token";
import {
  StBackGroundCloseDiv,
  StShadowBackgroundDiv,
} from "../../interface/styledCommon";

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
      if (myToken.provider === undefined) {
        alert("카카오 약관에 동의해주지 않아 메인페이지로 돌아갑니다.");
        window.localStorage.removeItem("token");
        navigate("/");
      }
    }
  }, []);

  useEffect(() => {
    if (myToken !== undefined && myToken !== null) {
      if (myToken.mbti !== undefined && myToken.mbti !== null) {
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

  const [openModal, setOpenModal] = useState(false);

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
          window.localStorage.setItem("firstLogin", true);
          window.localStorage.setItem("token", response.data.token);
          navigate("/");
        }
      } catch (error) {
        return alert("MBTI 를 선택해주세요");
      }
    };
    postMbtifetch();
    // dispatch(postMbtifetch(selectedMbti))
  };

  function openToPopUpModal() {
    setOpenModal(!openModal);
  }

  function openToMBTISite() {
    window.open(
      "https://www.16personalities.com/ko/%EB%AC%B4%EB%A3%8C-%EC%84%B1%EA%B2%A9-%EC%9C%A0%ED%98%95-%EA%B2%80%EC%82%AC"
    );
  }
  return (
    <StDiv>
      {openModal === true ? (
        <StShadowBackgroundDiv>
          {/* //e.stopPropagation() 는 배경만 눌렀을때 모달이 꺼지게한다 (모달창눌럿을때는 변화없음) */}
          <StBackGroundCloseDiv onClick={openToPopUpModal} />
          <StModalContainer>
            <StCloseButton type="button" onClick={openToPopUpModal}>
              <FontAwesomeIcon
                icon={faXmark}
                style={{
                  fontSize: "24px",
                  color: "#151522",
                  pointerEvents: "none",
                }}
              />
            </StCloseButton>
            <StContent>
              <h2>MBTI란?</h2>
              <StText>
                MBTI는 1900년대 미국의 이사벨 마이어스와 브릭스가
                <br />
                고안한 자기 보고식 성격유형 검사입니다.
                <br />
                <br />
                두 모녀가 칼 구스타프 융의 '심리 유형론'을 바탕으로
                <br />
                만들었으며 '사람들이 왜 이렇게 다를까'라는 궁금증으로
                <br />
                시작되었다고 합니다.
                <br />
                <br />
                내가 무엇을 가장 좋아하고 편안한지에 대한 것을
                <br />
                문항화 시켜서 그것을 바탕으로 개인의 성격, 성향을
                <br />
                분류하는 검사를 말합니다.
                <br />
                더 쉽게 말해보면 '인간의 심리와 성격을 이해하기 위한
                <br />
                검사'라고 생각하시면 이해가 쉬울 것 같아요.
                <br />
                <br />
                자신의 MBTI가 뭔지 궁금하다면 정식 검사는 아니지만
                <br />
                많은 사람들이 자주 검사하는 아래의 사이트를 통해서
                <br />
                검사해보시는 건 어떠실까요?
                <br />
              </StText>
              <StMbtiLinkBtn onClick={openToMBTISite}>
                MBTI 검사하러 가보기
              </StMbtiLinkBtn>
            </StContent>
          </StModalContainer>
        </StShadowBackgroundDiv>
      ) : (
        <></>
      )}
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
        <StHelpButton type="button" onClick={openToPopUpModal}>
          <FontAwesomeIcon icon={faQuestion} />
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
  margin: 0 auto 25px 25px;

  & svg {
    background: gray;

    color: white;

    border-radius: 50%;
    margin: 0 10px 0 0;
    padding: 6px;

    height: 14px;
    width: 14px;
    pointer-events: none;
  }

  cursor: pointer;
  @media screen and (max-width: 500px) {
    font-size: 14px;
    margin: 0 auto 10px 10px;
    & svg {
      margin-right: 5px;
      height: 10px;
      width: 10px;
    }
  }
`;

const StModalContainer = styled.div`
  background: #ffffff;
  position: absolute;
  border-radius: 6px;
  padding: 25px;
  margin: 10vh 5%;

  width: 90%;
  height: 600px;
  box-sizing: border-box;
  z-index: 11;
  @media screen and (max-width: 500px) {
    height: 470px;
  }
`;

const StContent = styled.div`
  color: #ffffff;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  text-align: left;

  bottom: 0;
  height: 90%;
  box-sizing: border-box;

  & > h2 {
    font-size: 28px;
    line-height: 34px;
    font-weight: 700;
    color: #313131;
    margin: 17px auto;
  }

  @media screen and (max-width: 500px) {
    & > h2 {
      font-size: 20px;
      line-height: 28px;
      font-weight: 700;
      color: #313131;
      margin: 15px auto;
    }
  }
`;

const StText = styled.p`
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  color: #919191;

  margin: 0;
  @media screen and (max-width: 500px) {
    font-size: 11px;
  }
`;

const StCloseButton = styled.button`
  background: none;

  display: block;

  border: none;
  border-radius: none;
  margin: 0;
  margin-left: auto;
  padding: 0;

  cursor: pointer;
`;

const StMbtiLinkBtn = styled.button`
  background: none;
  display: block;

  font-size: 28px;
  line-height: 34px;
  font-weight: 700;
  color: #ff6d53;

  border: none;
  outline: none;
  margin: 20px auto;
  padding: 0;

  cursor: pointer;
  @media screen and (max-width: 500px) {
    font-size: 18px;
  }
`;
