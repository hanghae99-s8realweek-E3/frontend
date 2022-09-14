import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getSelectMBTITodoFetch } from "../../../app/modules/todolistsSlice";
import { decodeMyTokenData } from "../../../utils/token";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

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
      if (mbtiState.mbti === selectMBTI) return "gray";
      else return "#E8644C";
    } else if (Object.keys(mbtiState).length === 0) return "#ffffff";
    else if (mbtiList[index] === mbtiState.mbti) return "gray";
    else if (mbtiState[elem] === 5) return "#507DF1";
    else if (mbtiState[elem] === 1) return "#FFD600";
    else return "#ffffff";
  }

  // 선택한 MBTI을 필터링 대상으로 적용
  function selectMBTIFeed(event) {
    setSelectMBTI(event.target.value);
  }

  // 선택한 MBTI의 정보를 필터로 하여 피드를 보도록
  function moveToMBTIFeedPage() {
    navigate(`/todolists/${selectMBTI}`);
  }

  // 도움말 팝업창 상태 열고 닫기 적용
  function openToPopUpModal() {
    setOpenModal(!openModal);
  }

  return (
    <>
      <div style={{ marginTop: "80px" }}>
        <StGrid>
          {mbtiList.map((elem, index) => {
            return (
              <StButton
                key={index}
                background={buttonColorSet(elem, index)}
                border={
                  buttonColorSet(elem, index) === "#ffffff"
                    ? "1px solid #979797"
                    : "none"
                }
                color={
                  buttonColorSet(elem, index) === "#ffffff"
                    ? "#979797"
                    : "#ffffff"
                }
                onClick={
                  buttonColorSet(elem, index) === "gray" ? null : selectMBTIFeed
                }
                cursor={
                  buttonColorSet(elem, index) === "gray" ? "arrow" : "pointer"
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

  cursor: pointer;
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

const StSelectFilterBtn = styled.button`
  background: #ff6d53;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 22px;
  font-weight: 500;
  color: #ffffff;

  margin: 18vh 0 0 25px;
  border: none;
  border-radius: 6px;
  outline: none;

  width: 90%;
  height: 70px;
  cursor: pointer;
`;
