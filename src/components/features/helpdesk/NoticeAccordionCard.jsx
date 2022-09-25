import { useState } from "react";
import styled from "styled-components";

function NoticeAccordionCard({ title, date, content }) {
  const [openState, setOpenState] = useState(false);

  function toggleToAccordianCard() {
    setOpenState(!openState);
  }

  return (
    <>
      <StNoticeDiv onClick={toggleToAccordianCard}>
        <h3>{title}</h3>
        <p>{date}</p>
      </StNoticeDiv>
      <StNoticeAccordionBox
        display={openState === true ? "flex" : "none"}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </>
  );
}

export default NoticeAccordionCard;

const StNoticeDiv = styled.div`
  text-align: left;

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
