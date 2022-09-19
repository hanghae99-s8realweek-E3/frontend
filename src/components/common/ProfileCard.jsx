//대연
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

// 컴포넌트 다른곳에서 가져다 쓸 수 있게

function ProfileCard({ profileData }) {
  const navigate = useNavigate();
  const params = useParams();
  console.log(params);
  // 팔로우 버튼을 클릭했을 때 현재 ProfileCard.jsx 컴포넌트가 적용되어있는 위치에 따라서 다르게 작동
  const goFollow = () => {
    navigate(`/follows/${profileData.userInfo.userId}`, { state: false });
  };
  // 팔로잉 버튼을 클릭했을 때 현재 ProfileCard.jsx 컴포넌트가 적용되어있는 위치에 따라서 다르게 작동
  const goFollowing = () => {
    navigate(`/follows/${profileData.userInfo.userId}`, { state: true });
  };

  // 이미지영역/이미지없는영역 묶음    이미지없는영역 -> 닉네임 / [   [mbti (팔로우 팔로우 숫자)]  or  [mbti(팔로잉 팔로잉 숫자)]  ] 묶음
  return (
    <StTotalWrap>
      <StProfileImg
        src="https://img.lostark.co.kr/profile/6/6C35FF38A24FEFDBC538874A5C986C14897E62D13480EC4B8CEF8E7C93D75149.PNG"
        width="80"
        height="80"
        alt="dy"
      />
      <StNoImageWrap>
        <StNickName>{profileData.userInfo.nickname}</StNickName>
        <StMbtiFollowFollowingWrap>
          <StMbti>{profileData.userInfo.mbti}</StMbti>
          <StFollowWrap onClick={goFollow}>
            <StFollowWord>팔로워</StFollowWord>
            <StFollowNumber>
              {window.location.pathname === "/mypage"
                ? profileData.userInfo.follower
                : profileData.userInfo.followerCount}
            </StFollowNumber>
          </StFollowWrap>
          <StFollowingWrap onClick={goFollowing}>
            <StFollowingWord>팔로잉</StFollowingWord>
            <StFollowingNumber>
              {window.location.pathname === "/mypage"
                ? profileData.userInfo.following
                : profileData.userInfo.followingCount}
            </StFollowingNumber>
          </StFollowingWrap>
        </StMbtiFollowFollowingWrap>
      </StNoImageWrap>
    </StTotalWrap>
  );
}
export default ProfileCard;

const StTotalWrap = styled.div`
  width: 500px;
  margin-top: 42px;
  display: flex;
  flex-direction: row;
`;
const StProfileImg = styled.img`
  margin-left: 35px;
  border-radius: 9999px;
`;
const StNoImageWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
const StNickName = styled.div`
  flex-direction: row;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  color: #000000;
  margin-left: 16px;
  text-align: left;
`;
const StMbtiFollowFollowingWrap = styled.div`
  display: flex;
`;
const StMbti = styled.div`
  display: flex;
  flex-direction: column;
  width: 42px;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 32px;
  text-align: left;
  color: #979797;
  margin-left: 16px;
`;
const StFollowWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 100px;
  gap: 5px;
`;
const StFollowNumber = styled.div`
  margin-top: 1px;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 32px;
  text-align: center;
  color: #000000;
`;
const StFollowWord = styled.div`
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 32px;
  text-align: center;
  color: #000000;
`;
const StFollowingWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 55px;
  gap: 5px;
`;
const StFollowingNumber = styled.div`
  margin-top: 1px;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 32px;
  text-align: center;
  color: #000000;
`;
const StFollowingWord = styled.div`
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 32px;
  text-align: center;
  color: #000000;
`;
