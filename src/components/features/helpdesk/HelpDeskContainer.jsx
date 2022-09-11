import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fqaList, noticeList } from "../../../utils/helpList";
import { StCommonBorder } from "../../interface/styledCommon";
import FQAAccordionCard from "./FQAAccordionCard";
import NoticeAccordionCard from "./NoticeAccordionCard";

function HelpDeskContainer () {
  const [selectTab, setSelectTab] = useState("notice");
  const navigate = useNavigate();

  function selectTabMenu (event) {
    if (event.target.value === "notice")
      setSelectTab("notice")
    else if (event.target.value === "faq")
      setSelectTab("faq")
  }

  function notifyNowMaking () {
    
  }

  function moveToGoogleFormPage () {

  }

  return (
    <StContainer>
      <div>
        
        {selectTab === "notice" ?
          <>
            <StTapBox>
              <StActiveTapButton value="notice" onClick={selectTabMenu}>공지사항</StActiveTapButton>
              <StTapButton value="faq" onClick={selectTabMenu}>FAQ</StTapButton>
            </StTapBox>

            <div>
              <NoticeAccordionCard title={noticeList[0].title} date={noticeList[0].date} content={noticeList[0].content} />
              <StCommonBorder />

            </div>
          </>
        : selectTab === "faq" ?
          <>
            <StTapBox>
              <StTapButton value="notice" onClick={selectTabMenu}>공지사항</StTapButton>
              <StActiveTapButton value="faq" onClick={selectTabMenu}>FAQ</StActiveTapButton>
            </StTapBox>

            <div>
              <StFAQTitleBox>
                <h2>자주 묻는 질문 TOP 3</h2>
                <button type="button" onClick={notifyNowMaking}>더보기</button>
              </StFAQTitleBox>

              <StFAQAccordionList>
                <FQAAccordionCard title={fqaList[0].title} content={fqaList[0].content} />
                <StCommonBorder />

                <FQAAccordionCard title={fqaList[1].title} content={fqaList[1].content}/>
                <StCommonBorder />

                <FQAAccordionCard title={fqaList[2].title} content={fqaList[2].content} />
                <StCommonBorder />
              </StFAQAccordionList>

              <StContactBox>
                <p style={{fontSize:"18px", margin:"4px 0"}}>다른 궁금하신 게 있으실까요?</p>
                <p style={{fontSize:"16px", color:"#979797", margin:"4px 0"}}>미믹에 직접 <span style={{fontSize:"16px", textDecoration:"underline", lineHeight:"16px", color:"black", cursor:"pointer"}} onClick={moveToGoogleFormPage}>문의하기</span></p>
              </StContactBox>
            </div>
          </>
        : <></>}
      </div>
    </StContainer>
  )
}


export default HelpDeskContainer;

const StContainer = styled.div`
  margin: 80px 25px 0 25px;

  box-sizing: border-box;
`

const StTapBox = styled.div`

  display: flex;
  flex-direction: row;
  width: 100%;
  height: 50px;
  
`

const StActiveTapButton = styled.button`
  background: none;

  font-size: 18px;
  font-weight: 500;

  border:none;
  border-bottom: 2px solid black;
  outline:none;
  padding-bottom: 10px;
  margin-bottom: 5px;

  width:100%;

  cursor: pointer;
`

const StTapButton = styled.button`
  background: none;

  font-size: 18px;
  font-weight: 500;

  border:none;
  border-bottom: 2px solid gray;
  outline:none;
  padding-bottom: 10px;
  margin-bottom: 5px;

  width:100%;

  cursor: pointer;
`

const StFAQTitleBox = styled.div`
  display: flex;
  flex-direction: row;
  font-weight: 500;

  margin: 10px 0;

  & > h3 {
    font-size: 25px;
  }

  & > button {
    background: none;

    font-size: 18px;

    border: none;
    outline: none;
    margin-left: auto;

    cursor: pointer;
  }
`

const StFAQAccordionList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
`

const StContactBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  margin: 20px 0;
`
