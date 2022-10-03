import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fqaList } from "../../../utils/helpList";

function FQAAccordionCard({ title, content }) {
  const [openState, setOpenState] = useState(false);
  const navigate = useNavigate();

  function toggleToAccordianCard() {
    setOpenState(!openState);
  }

  function moveToWithdrawPage() {
    navigate("/withdraw");
  }

  return (
    <>
      <StFAQAccordTitle
        onClick={toggleToAccordianCard}
        aria-label={`${title}, 누르면 해당 내용을 펼칠 수 있습니다.`}>
        {title}
        <StArrowIcon
          src={process.env.PUBLIC_URL + `/images/Toggle.png`}
          transform={openState === true ? "rotateZ(180deg)" : "rotateZ(0deg)"}
          aria-hidden={true}
        />
      </StFAQAccordTitle>
      <StFQAAccordionBox
        display={openState === true ? "flex" : "none"}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      {content === fqaList[2].content ? (
        <StWithdrawButton
          display={openState === true ? "block" : "none"}
          onClick={moveToWithdrawPage}
          aria-label="누르면 회원 탈퇴 화면으로 이동합니다.">
          탈퇴하기
        </StWithdrawButton>
      ) : null}
    </>
  );
}

export default FQAAccordionCard;

const StFAQAccordTitle = styled.button`
  background: none;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  font-size: 20px;
  font-weight: 500;

  border: none;
  outline: none;
  margin: 20px 0;

  width: 100%;
  cursor: pointer;
  @media screen and (max-width: 500px) {
    font-size: 16px;
    margin: 14px 0;
  }
`;

const StFQAAccordionBox = styled.div`
  display: ${(props) => props.display || "none"};
  flex-direction: column;
  justify-content: flex-start;

  text-align: left;
  font-size: 16px;
  color: #979797;

  margin: 0 auto 20px 5px;

  width: 100%;
  @media screen and (max-width: 500px) {
    font-size: 12px;
  }
`;

const StArrowIcon = styled.img`
  height: 6px;

  margin-left: auto;

  transform: ${(props) => props.transform};
  transition: ease 0.2s;
  @media screen and (max-width: 500px) {
    height: 4px;
  }
`;

const StWithdrawButton = styled.button`
  background: none;

  display: ${(props) => props.display || "none"};

  font-size: 16px;
  font-weight: 500;
  text-decoration: underline;

  border: none;
  outline: none;
  margin-bottom: 20px;

  cursor: pointer;
  transition: ease 0.1s;
  &:hover {
    color: #8e8e8e;
  }
  @media screen and (max-width: 500px) {
    font-size: 12px;
  }
`;
