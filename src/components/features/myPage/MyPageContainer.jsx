import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMyPageFetch } from "../../../app/modules/accountsSlice";
import LoadingContainer from "../../../utils/loadingState";
import { decodeMyTokenData, tokenChecker } from "../../../utils/token";
import ProfileCard from "../../common/ProfileCard";

function MyPageContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myData = decodeMyTokenData();

  useEffect(() => {
    dispatch(getMyPageFetch());
  }, []);

  const accountsState = useSelector((state) => state.accounts);

  if (tokenChecker() === false) {
    alert("로그인 후 이용해주세요.");
    navigate("/mypage");
  }

  // 프로필 수정 화면으로 이동
  function changeMyProfileData() {
    navigate("/modifyprofile");
  }

  // 비밀번호 변경 화면으로 이동
  function changeMyPasswordData() {
    navigate("/changepw");
  }

  // 고객센터(회원 탈퇴) 페이지로 이동
  function moveToHelpDeskPage() {
    navigate("/helpdesk");
  }

  // 내 활동 페이지로 이동
  function moveToActivity() {
    navigate("/activity");
  }

  // 로그아웃 버튼 클릭 시, 로그아웃 진행
  function logOutToSite() {
    window.localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <StMyPageContainer>
      {Object.keys(accountsState.userInfo).length === 0 ? (
        <LoadingContainer />
      ) : (
        <>
          <ProfileCard profileData={accountsState} />

          <StCommonBorder />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingBottom: "25px",
            }}>
            <StMyPageMenu>나의 정보</StMyPageMenu>
            <StMyPageButton onClick={changeMyProfileData}>
              프로필 변경
            </StMyPageButton>
            <StMyPageButton onClick={moveToActivity}>나의 활동</StMyPageButton>
          </div>

          <StCommonBorder />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}>
            <StMyPageMenu>설정</StMyPageMenu>
            <StMyPageButton onClick={logOutToSite}>로그아웃</StMyPageButton>
            {myData?.provider === "kakao" ? (
              <></>
            ) : (
              <StMyPageButton onClick={changeMyPasswordData}>
                비밀번호 변경
              </StMyPageButton>
            )}
            <StMyPageButton onClick={moveToHelpDeskPage}>
              고객센터
            </StMyPageButton>
          </div>
        </>
      )}
    </StMyPageContainer>
  );
}

export default MyPageContainer;

const StMyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  text-align: left;

  margin: 60px 0 80px 0;
  /* padding: 0 0.6rem; */

  width: 500px;
  box-sizing: border-box;

  @media screen and (max-width: 500px) {
    width: 360px;
  }
`;

const StCommonBorder = styled.div`
  height: 1px;
  background: #bdc5cd;
`;

const StMyPageButton = styled.button`
  background: none;

  text-align: left;
  font-size: 20px;
  font-weight: 500;
  line-height: 50px;

  border: none;
  outline: none;
  padding: 0 25px;
  margin: 6px 0;

  cursor: pointer;
  transition: ease 0.1s;
  &:hover {
    background: #f4f4f4;
  }

  @media screen and (max-width: 500px) {
    font-size: 16px;
    padding: 0 25px;
    line-height: 30px;
  }
`;

const StMyPageMenu = styled.span`
  font-size: 18px;
  color: #979797;
  font-weight: 500;
  line-height: 32px;

  margin: 25px 0 12px 25px;

  @media screen and (max-width: 500px) {
    font-size: 16px;
    margin: 15px 0 10px 25px;
  }
`;

const StModalContainer = styled.div`
  background: #ff6d53;

  border-radius: 6px;
  padding: 25px;
  margin: 18vh auto;

  width: 80%;
  height: 520px;

  box-sizing: border-box;
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
`;

const StText = styled.p`
  font-size: 16px;
  font-weight: 400;

  margin: 0;
  margin-right: auto;
`;
