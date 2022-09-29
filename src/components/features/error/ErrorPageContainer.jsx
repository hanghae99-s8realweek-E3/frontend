//대연 에러페이지가 과연 사용이될까..?
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function ErrorPageContainer() {
  const navigate = useNavigate();

  //뒤로가기
  const backPage = () => {
    navigate(-1);
  };

  //메인페이지 이동
  const goMain = () => {
    navigate("/");
  };

  return (
    <>
      <TotalWrap>
        <StErrorImg
          src={process.env.PUBLIC_URL + `/images/Error.png`}
          alt="ErrorPageImg"
        />
        <StContent>문제가 생겼어요</StContent>
        <StErrorMsg>
          죄송합니다 <br />
          요청하신 콘텐츠를
          <br />
          불러올 수 없습니다.
        </StErrorMsg>
        <StBtnWrap>
          <StBackBtn onClick={backPage}>다시 시도하기</StBackBtn>
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
  border-radius: 5px;
  margin-top: 222px;
  margin-bottom: 5px;
  @media only screen and (max-width: 500px) {
    margin-top: 160px;
    width: 124px;
  }
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
  @media only screen and (max-width: 500px) {
    font-size: 20px;
  }
`;
const StErrorMsg = styled.div`
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  margin-bottom: 105px;
  text-align: center;
  color: #000000;
  @media only screen and (max-width: 500px) {
    margin-bottom: 75.6px;
    font-size: 14px;
  }
`;
const StBtnWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  gap: 26px;
  cursor: pointer;
  
`;
const StBackBtn = styled.button`
  width: 162px;
  height: 48.6px;
  background: #979797;
  border-radius: 53.46px;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 26px;
  cursor: pointer;
  text-align: center;
border: none;
  color: #ffffff;
  @media only screen and (max-width: 500px) {
    font-size: 14px;

    width: 116px;
    height: 36px;
  }
`;
const StMainBtn = styled.button`
  width: 162px;
  height: 48.6px;
  background:#FF6D53;;
  border-radius: 53.46px;
  border: none;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 26px;
  text-align: center;
  color: #ffffff;
  @media only screen and (max-width: 500px) {
    font-size: 14px;
    width: 116px;

    height:36px ;
  }
`;
export default ErrorPageContainer;
