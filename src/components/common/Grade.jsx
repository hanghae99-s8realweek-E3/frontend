import { useState } from "react";
import styled from "styled-components";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StShadowBackgroundDiv } from "../interface/styledCommon";
import { decodeMyTokenData } from "../../utils/token";

function Grade({ profileData }) {
  const [modal, setModal] = useState();
  const [grade, setGrage] = useState();
  const myData = decodeMyTokenData();

  const changeModalState = () => {
    setModal(!modal);
  };
  return (
    <>
      {modal === true ? (
        <StShadowBackgroundDiv>
          {/* //e.stopPropagation() 는 배경만 눌렀을때 모달이 꺼지게한다 (모달창눌럿을때는 변화없음) */}
          <StModalContainer onClick={(e) => e.stopPropagation()}>
            <StCloseButton type="button" onClick={changeModalState}>
              <FontAwesomeIcon
                icon={faXmark}
                style={{
                  fontSize: "18px",
                  color: "black",
                  pointerEvents: "none",
                }}
              />
            </StCloseButton>
            <StTotalWrap>
              <StTitle>미믹 성장 등급</StTitle>
              <StText>즐겁게 따라하고 미콩이를 성장시켜주세요!</StText>
              <StIconExplainWrap>
                <StIcon src={process.env.PUBLIC_URL + `/images/미콩.png`} />
                <StExplain>
                  <StExplainName>미콩</StExplainName>
                  <StExplainContent>
                    <span style={{ fontWeight: 700 }}>월 0회</span> 미믹 도전
                  </StExplainContent>
                  <StExplainContent>
                    <span style={{ fontWeight: 700 }}>월 0회</span> 미믹 제안
                  </StExplainContent>
                </StExplain>
              </StIconExplainWrap>

              <StIconExplainWrap>
                <StIcon src={process.env.PUBLIC_URL + `/images/미알.png`} />
                <StExplain>
                  <StExplainName>미알</StExplainName>
                  <StExplainContent>
                    <span style={{ fontWeight: 700 }}>월10회</span> 미믹 도전
                  </StExplainContent>
                  <StExplainContent>
                    <span style={{ fontWeight: 700 }}>월10회</span> 미믹 제안
                  </StExplainContent>
                </StExplain>
              </StIconExplainWrap>

              <StIconExplainWrap>
                <StIcon src={process.env.PUBLIC_URL + `/images/미돌.png`} />
                <StExplain>
                  <StExplainName>미돌</StExplainName>
                  <StExplainContent>
                    <span style={{ fontWeight: 700 }}>월20회</span> 미믹 도전
                  </StExplainContent>
                  <StExplainContent>
                    <span style={{ fontWeight: 700 }}>월20회</span> 미믹 제안
                  </StExplainContent>
                  <StExplainContent>
                    명예의 전당<span style={{ fontWeight: 700 }}>1회 등극</span>
                  </StExplainContent>
                </StExplain>
              </StIconExplainWrap>

              <StIconExplainWrap>
                <StIcon src={process.env.PUBLIC_URL + `/images/미킹.png`} />
                <StExplain>
                  <StExplainName>미킹</StExplainName>
                  <StExplainContent>
                    <span style={{ fontWeight: 700 }}>월25회</span> 미믹 도전
                  </StExplainContent>
                  <StExplainContent>
                    <span style={{ fontWeight: 700 }}>월25회</span> 미믹 제안
                  </StExplainContent>
                  <StExplainContent>
                    명예의 전당<span style={{ fontWeight: 700 }}>3회 등극</span>
                  </StExplainContent>
                </StExplain>
              </StIconExplainWrap>
            </StTotalWrap>
          </StModalContainer>
        </StShadowBackgroundDiv>
      ) : (
        <></>
      )}
      <StContainer>
        <StContainerIcon
          src={
            process.env.PUBLIC_URL + `/images/ContainerIcon.png`
          }></StContainerIcon>
        <StName>미콩</StName>
        <StGradeBtn onClick={changeModalState}>성장 등급보기</StGradeBtn>
      </StContainer>
      <StCommonBorder />
    </>
  );
}

const StTotalWrap = styled.div`
  flex-direction: column;
`;
const StTitle = styled.div`
  text-align: center;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 34px;
  color: #313131;
  margin-bottom: 6px;
`;
const StText = styled.div`
  text-align: center;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 34px;
  color: #919191;
  margin-bottom: 39px;
`;
const StIconExplainWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 12px;
`;
const StIcon = styled.img`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 500px) {
    align-items: center;
    margin-left: 7px;
  }
`;
const StExplain = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 12px;
  margin-left: 42px;
`;
const StExplainName = styled.div`
  display: flex;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  color: #ff6d53;
`;
const StExplainContent = styled.div`
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 23px;
  letter-spacing: -0.05em;
  color: #313131;
`;
const StContainer = styled.div`
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 500px) {
    width: 360px;
    align-items: center;
  }
`;
const StContainerIcon = styled.img`
  display: flex;
  width: 80px;
  height: 80px;
  margin: 18px 18px 18px 35px;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 500px) {
    align-items: center;
    margin-left: 20px;
    width: 57.9px;
    height: 57.9px;
  }
`;
const StName = styled.div`
  display: flex;
  margin: 39.5px 0px;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 32px;
  color: #000000;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 500px) {
    width: 40px;
  }
`;
const StGradeBtn = styled.button`
  display: flex;
  width: 130px;
  height: 36px;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #000000;
  background: none;
  border: 1px solid black;
  border-radius: 9999px;
  margin: 40px 0px 40px 160px;
  text-align: center;
  align-items: center;
  justify-content: center;
  padding: 50px auto;
  cursor: pointer;
  @media screen and (max-width: 500px) {
    width: 111px;
    align-items: center;
    margin-left: 90px;
  }
`;
const StCommonBorder = styled.div`
  height: 1px;
  background: #bdc5cd;
  @media screen and (max-width: 500px) {
    width: 360px;
    align-items: center;
  }
`;

const StModalContainer = styled.div`
  background: white;
  border-radius: 6px;
  padding: 25px;
  margin: 18vh auto;
  width: 450px;
  height: 750px;
  box-sizing: border-box;
  @media screen and (max-width: 500px) {
    width: 324px;
    margin: 18px;
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

export default Grade;
