import { useNavigate } from "react-router-dom";
import dy from "../../common/dy.jpg";

import styled from "styled-components";

function Error() {
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
    <TotalWrap>
      <StErrorImg src={dy} alt="ErrorPageImg"/>
      <StBtnWrap>
        <StRefreshBtn onClick={refresh}>다시 시도하기</StRefreshBtn>
        <StMainBtn onClick={goMain}>홈으로 가기</StMainBtn>
      </StBtnWrap>
    </TotalWrap>
  );
}
const TotalWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 100px;
`;
const StErrorImg = styled.img`
  width: 380px;
  height: 380px;
  margin: 0 auto;
`;
const StBtnWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  gap: 20px;
`;
const StRefreshBtn = styled.button`
  margin: 0 auto;
`;
const StMainBtn = styled.button`
  margin: 0 auto;
  border: 1px solid white;
  background-color: black;
  color: white;
`;
export default Error;
