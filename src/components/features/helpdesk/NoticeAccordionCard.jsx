import { useState } from "react";
import styled from "styled-components";
import { noticeList } from "../../../utils/helpList";

function NoticeAccordionCard({ title, date, content }) {
  const [openState, setOpenState] = useState(false);

  function toggleToAccordianCard() {
    setOpenState(!openState);
  }

  function moveToUpdatePage() {
    window.open(
      "https://develop-neoguri.notion.site/2022-10-02-3515887dc3d14e25a36b94c34b9e2835"
    );
  }

  return (
    <>
      <StNoticeDiv
        onClick={toggleToAccordianCard}
        aria-label={`${title}, ${content}`}>
        <h3>{title}</h3>
        <p>{date}</p>
      </StNoticeDiv>
      <StNoticeAccordionBox
        tapIndex="0"
        display={openState === true ? "flex" : "none"}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      {content === noticeList[1].content ? (
        <StMovePageButton
          display={openState === true ? "block" : "none"}
          onClick={moveToUpdatePage}
          tapIndex="0"
          aria-label="누르면 2022년 10월 3일 업데이트 안내 사항으로 이동합니다.">
          업데이트 사항 보기
        </StMovePageButton>
      ) : null}
    </>
  );
}

export default NoticeAccordionCard;

const StNoticeDiv = styled.button`
  background: none;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  text-align: left;

  outline: none;
  border: none;

  width: 100%;
  cursor: pointer;

  & > h3 {
    font-size: 20px;
    font-weight: 500;
    margin: 0;
    margin-top: 30px;
  }

  & > p {
    font-size: 16px;
    font-weight: 500;
    color: #979797;

    margin: 10px 0 20px 0;
  }
  transition: ease 0.1s;
  &:hover {
    background: #f4f4f4;
  }
  @media screen and (max-width: 500px) {
    margin: 0;
    & > h3 {
      font-size: 16px;
    }

    & > p {
      font-size: 14px;
      margin: 10px 0 14px 0;
    }
  }
`;

const StNoticeAccordionBox = styled.div`
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

const StMovePageButton = styled.button`
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
