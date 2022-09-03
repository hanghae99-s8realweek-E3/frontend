import { useNavigate } from "react-router-dom";
import dy from "../../common/dy.jpg";

import styled from "styled-components";

function ErrorPageContainer() {
  const navigate = useNavigate();

  //새로고침하기
  const refresh = () => {
    window.location.reload();
  };

  //메인페이지 이동
  const goMain = () => {
    navigate("/");
  };

  return (
    <>
      <TotalWrap>
        <StErrorImg src={dy} alt="ErrorPageImg" />
        <StContent>문제가 생겼어요</StContent>
        <StErrorMsg>
          죄송합니다 <br />
          요청하신 콘텐츠를
          <br />
          불러올 수 없습니다.
        </StErrorMsg>
        <StBtnWrap>
          <StRefreshBtn onClick={refresh}>다시 시도하기</StRefreshBtn>
          <StMainBtn onClick={goMain}>홈으로 가기</StMainBtn>
        </StBtnWrap>
      </TotalWrap>
    </>
  );
}
const TotalWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  /* margin-top: 100px; */
`;
const StErrorImg = styled.img`
  width: 169px;
  height: 169px;
  background: #d9d9d9;
  border-radius: 5px;
  margin-bottom: 38px;
`;
const StContent = styled.div`
  height: 32px;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  margin-bottom: 14px;
  /* identical to box height, or 133% */

  color: #000000;
`;
const StErrorMsg = styled.div`
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  margin-bottom: 88.7px;
  /* or 162% */

  text-align: center;

  color: #000000;
`;
const StBtnWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  gap: 20px;
`;
const StRefreshBtn = styled.button`
  width: 162px;
  height: 48.6px;
  background: #979797;
  border-radius: 53.46px;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 17.82px;
  line-height: 26px;
  /* identical to box height, or 145% */

  text-align: center;

  color: #ffffff;
`;
const StMainBtn = styled.button`
  width: 162px;
  height: 48.6px;
  background: #979797;
  border-radius: 53.46px;

  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 17.82px;
  line-height: 26px;
  /* identical to box height, or 145% */

  text-align: center;

  color: #ffffff;
`;
export default ErrorPageContainer;
