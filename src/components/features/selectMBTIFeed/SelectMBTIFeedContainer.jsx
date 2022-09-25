import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getSelectMBTITodoFetch } from "../../../app/modules/todolistsSlice";
import { decodeMyTokenData } from "../../../utils/token";
import { faQuestion, faXmark } from "@fortawesome/free-solid-svg-icons";
import { StShadowBackgroundDiv } from "../../interface/styledCommon";

function SelectMBTIFeedContainer() {
  const MyData = decodeMyTokenData();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mbtiList = [
    "ISFJ",
    "ISTJ",
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
  const [selectMBTI, setSelectMBTI] = useState(
    MyData === undefined || MyData.mbti === null ? "" : MyData.mbti
  );
  const [openModal, setOpenModal] = useState(false);
  const mbtiState = useSelector((state) => state.todolists.mbtiData);

  // 로그인되어 있고 mbti가 설정되어 있을 경우에만 상성 정보를 받아오도록 설정
  useEffect(() => {
    if (MyData !== undefined)
      if (MyData.mbti !== "" && MyData.mbti !== null)
        dispatch(getSelectMBTITodoFetch());
  }, []);

  // mbti 상성이나 로그인 상태에 따라 나타나는 색상을 다르게 적용.
  function buttonColorSet(elem, index) {
    if (mbtiList[index] === selectMBTI) {
      if (mbtiState.mbti === selectMBTI) return "#919191";
      else return "#E8644C";
    } else if (Object.keys(mbtiState).length === 0) return "#ffffff";
    else if (mbtiList[index] === mbtiState.mbti) return "#919191";
    else if (mbtiState[elem] === 5) return "#569AFF";
    else if (mbtiState[elem] === 1) return "#FF3A3A";
    else return "#ffffff";
  }

  // 선택한 MBTI을 필터링 대상으로 적용
  function selectMBTIFeed(event) {
    setSelectMBTI(event.target.value);
  }

  // 선택한 MBTI의 정보를 필터로 하여 피드를 보도록
  function moveToMBTIFeedPage() {
    if (selectMBTI === "") {
      navigate(`/todolists`);
    } else {
      navigate(`/todolists/${selectMBTI}`);
    }
  }

  // 도움말 팝업창 상태 열고 닫기 적용
  function openToPopUpModal() {
    setOpenModal(!openModal);
  }

  return (
    <>
      {openModal === true ? (
        <StShadowBackgroundDiv>
          {/* //e.stopPropagation() 는 배경만 눌렀을때 모달이 꺼지게한다 (모달창눌럿을때는 변화없음) */}
          <StModalContainer onClick={(e) => e.stopPropagation()}>
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
              <h2>색상이 다른 이유는 무엇인가요?</h2>
              <StText>
                MBTI 사이에서도 상성이 있다는 거, 알고 계세요?
                <div style={{ height: "7px" }}></div>
                미믹을 이용하시는 여러분들의 MBTI를 기준으로
                <br />
                자신의 MBTI와 다른 MBTI와의 상성을 색으로 표현해봤어요!
                <div style={{ height: "7px" }}></div>
                <span style={{ color: "#569AFF" }}>푸른색</span>은 나와 상성이{" "}
                <span style={{ color: "#569AFF" }}>정말 잘 맞는 MBTI</span>,
                <br />
                <span style={{ color: "#FF3A3A" }}>붉은색</span>은 나와 상성이{" "}
                <span style={{ color: "#FF3A3A" }}>정말 안 맞는 MBTI</span>를
                가리킵니다.
                <div style={{ height: "7px" }}></div>
                색상이 표시되지 않는다고요?
                <br />
                그건 자신의 MBTI의 상성이 다른 MBTI들과
                <br />
                골고루 잘 맞는다는 이야기랍니다.
              </StText>
              <p className="alertMsg">
                ※색상은 로그인한 유저만 노출되니 참고 부탁드립니다.
              </p>
              <img
                src={process.env.PUBLIC_URL + `/images/selectMBTIHelp.jpg`}
                alt="MBTI matching List Images"
              />
            </StContent>
          </StModalContainer>
        </StShadowBackgroundDiv>
      ) : (
        <></>
      )}
      <div style={{ marginTop: "70px" }}>
        <StGrid>
          {mbtiList.map((elem, index) => {
            return (
              <StButton
                key={index}
                background={
                  buttonColorSet(elem, index) === "#919191"
                    ? "gray"
                    : buttonColorSet(elem, index) === "#E8644C"
                    ? "#E8644C"
                    : "#ffffff"
                }
                border={
                  buttonColorSet(elem, index) === "#FF3A3A"
                    ? "1px solid #FF3A3A"
                    : buttonColorSet(elem, index) === "#569AFF"
                    ? "1px solid #569AFF"
                    : buttonColorSet(elem, index) === "#E8644C"
                    ? "1px solid #E8644C"
                    : "1px solid #979797"
                }
                color={
                  buttonColorSet(elem, index) === "#FF3A3A"
                    ? "#FF3A3A"
                    : buttonColorSet(elem, index) === "#569AFF"
                    ? "#569AFF"
                    : buttonColorSet(elem, index) === "#E8644C"
                    ? "#ffffff"
                    : buttonColorSet(elem, index) === "#919191"
                    ? "#ffffff"
                    : "#909090"
                }
                onClick={
                  buttonColorSet(elem, index) === "#919191"
                    ? null
                    : selectMBTIFeed
                }
                cursor={
                  buttonColorSet(elem, index) === "#919191"
                    ? "arrow"
                    : "pointer"
                }
                value={mbtiList[index]}>
                {mbtiList[index]}
              </StButton>
            );
          })}
        </StGrid>
      </div>
      <StHelpButton onClick={openToPopUpModal}>
        <FontAwesomeIcon icon={faQuestion} style={helpButton} /> 색상이 다른
        이유는 무엇인가요?
      </StHelpButton>
      <StSelectFilterBtn onClick={moveToMBTIFeedPage}>확인</StSelectFilterBtn>
    </>
  );
}

export default SelectMBTIFeedContainer;

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
  background: ${(props) => props.background};

  color: ${(props) => props.color};
  font-size: 20px;
  font-weight: 500;

  border: ${(props) => props.border};
  border-radius: 10px;
  outline: none;

  height: 105px;
  width: 105px;
  cursor: ${(props) => props.cursor};

  transition: ease 0.1s;
  &:hover {
    transform: scale(1.03);
  }

  @media screen and (max-width: 500px) {
    height: 77px;
    width: 77px;
    font-size: 14px;
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
  margin: 25px;
  margin-top: 0;
  & svg {
    height: 21px;
    width: 21px;
  }

  cursor: pointer;
  @media screen and (max-width: 500px) {
    font-size: 14px;
    margin: 10px;
    margin-top: 0;
    & svg {
      height: 14px;
      width: 14px;
    }
  }
`;

const helpButton = {
  background: "gray",

  color: "white",

  borderRadius: "50%",
  margin: "0 10px 0 0",
  padding: "6px",
};

const StSelectFilterBtn = styled.button`
  background: #ff6d53;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 22px;
  font-weight: 500;
  color: #ffffff;

  margin: 10px 5% 80px 5%;
  border: none;
  border-radius: 6px;
  outline: none;

  width: 90%;
  height: 70px;
  cursor: pointer;

  transition: ease 0.1s;
  &:hover {
    background: #ffa595;
  }
  @media screen and (max-width: 500px) {
    font-size: 18px;
    height: 50px;
  }
`;

const StModalContainer = styled.div`
  background: #ffffff;

  border-radius: 6px;
  padding: 25px;
  margin: 5vh auto;

  width: 90%;
  height: 660px;

  box-sizing: border-box;
  @media screen and (max-width: 500px) {
    height: 500px;
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

  & > img {
    width: 150px;
    margin: 5px 0;
  }

  .alertMsg {
    margin-bottom: 42px;
    text-align: center;
    font-size: 12px;
    font-weight: 400;
    color: #ff6d53;
  }

  @media screen and (max-width: 500px) {
    & > h2 {
      font-size: 20px;
      line-height: 28px;
      font-weight: 700;
      color: #313131;
      margin: 15px auto;
    }
    .alertMsg {
      margin-bottom: 20px;
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
