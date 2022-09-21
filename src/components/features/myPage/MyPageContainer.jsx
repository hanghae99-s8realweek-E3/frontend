import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMyPageFetch } from "../../../app/modules/accountsSlice";
import { tokenChecker } from "../../../utils/token";
import ProfileCard from "../../common/ProfileCard";
import { StShadowBackgroundDiv } from "../../interface/styledCommon";

function MyPageContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalState, setModalState] = useState(false);

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
    window.localStorage.clear();
    navigate("/");
  }

  const changeModalState = () => {
    setModalState(!modalState);
  };

  return (
    <>
      {modalState === true ? (
        <StShadowBackgroundDiv>
          {/* //e.stopPropagation() 는 배경만 눌렀을때 모달이 꺼지게한다 (모달창눌럿을때는 변화없음) */}
          <StModalContainer onClick={(e) => e.stopPropagation()}>
            <StCloseButton type="button" onClick={changeModalState}>
              <FontAwesomeIcon
                icon={faXmark}
                style={{
                  fontSize: "18px",
                  color: "#ffffff",
                  pointerEvents: "none",
                }}
              />
            </StCloseButton>
            <StContent>
              <img
                src={process.env.PUBLIC_URL + `/images/matchingBoard.png`}
                alt="MBTI matching List Images"
                style={{ width: "350px", margin: "5px 0" }}
              />
              <StText>위의 표는 MBTI 간의 궁합을 보여줍니다.</StText>
              <StText>푸른 색상에 가까울 수록 각 MBTI 간의 궁합이</StText>
              <StText>잘 맞는 편입니다.</StText>
              <StText>
                반대로 붉은 색상에 가까울 수록 각 MBTI 간의 궁합이
              </StText>
              <StText>잘 맞지 않는 편입니다.</StText>
            </StContent>
          </StModalContainer>
        </StShadowBackgroundDiv>
      ) : (
        <></>
      )}

      <StMyPageContainer>
        {Object.keys(accountsState.userInfo).length === 0 ? (
          <div></div>
        ) : (
          <>
            <ProfileCard profileData={accountsState} />
          </>
        )}

        <StCommonBorder />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: "25px",
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
            paddingLeft: "25px",
            paddingBottom: "25px",
          }}>
          <StMyPageMenu>설정</StMyPageMenu>
          <StMyPageButton onClick={logOutToSite}>로그아웃</StMyPageButton>
          <StMyPageButton onClick={changeMyPasswordData}>
            비밀번호 변경
          </StMyPageButton>
          <StMyPageButton onClick={moveToHelpDeskPage}>고객센터</StMyPageButton>
        </div>
      </StMyPageContainer>
    </>
  );
}

export default MyPageContainer;

const StMyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  text-align: left;

  margin: 60px 0;
  /* padding: 0 0.6rem; */

  width: 500px;
  box-sizing: border-box;
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
  padding: 0;
  margin: 6px 0;

  cursor: pointer;
`;

const StMyPageMenu = styled.span`
  font-size: 18px;
  color: #979797;
  font-weight: 500;
  line-height: 32px;

  margin: 25px 0 12px 0;
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
