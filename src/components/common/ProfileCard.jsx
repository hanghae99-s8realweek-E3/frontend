//대연
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

function ProfileCard({ profileData }) {
  const navigate = useNavigate();
  const params = useParams();
  console.log(params);
  const goFollow = () => {
    navigate(`/follow/${params.userId}`);
  };

  const goFollowing = () => {
    navigate(`/follow/${params.userId}`);
  };
  return (
    <>
      <StTopWrap>
        <StProfileImg
          src="https://img.lostark.co.kr/profile/6/6C35FF38A24FEFDBC538874A5C986C14897E62D13480EC4B8CEF8E7C93D75149.PNG"
          width="80"
          height="80"
          alt="dy"
        />
        <StFriendNameMbti>
          <StFriendName>{profileData.userInfo.nickname}</StFriendName>
          <StMbti>{profileData.userInfo.mbti}</StMbti>
        </StFriendNameMbti>
        <StFollowWrap onClick={goFollow}>
          <StFollowNumber>
            {window.location.pathname === "/mypage"
              ? profileData.userInfo.follower
              : profileData.userInfo.followerCount}
          </StFollowNumber>
          <StFollowWord>팔로워</StFollowWord>
        </StFollowWrap>
        <StFollowingWrap onClick={goFollowing}>
          <StFollowingNumber>
            {window.location.pathname === "/mypage"
              ? profileData.userInfo.following
              : profileData.userInfo.followingCount}
          </StFollowingNumber>
          <StFollowingWord>팔로잉</StFollowingWord>
        </StFollowingWrap>
      </StTopWrap>
    </>
  );
}

export default ProfileCard;

const StTopWrap = styled.div`
  display: flex;
  flex-direction: row;
  /* margin-bottom: 48.33px; */
  width: 500px;
`;
const StProfileImg = styled.img`
  display: flex;
  margin-left: 35px;
  border-radius: 9999px;
`;

const StFriendNameMbti = styled.div`
  display: flex;
  /* justify-content: center;
  align-items: center; */
  flex-direction: column;
  margin-top: 12.33px;
  margin-left: 26px;
`;
const StFriendName = styled.div`
  flex-direction: row;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  color: #000000;
`;
const StMbti = styled.div`
  width: 42px;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 32px;
  text-align: left;
  color: #979797;
`;
const StFollowWrap = styled.div`
  flex-direction: column;
  margin: 6.33px 70px 0px 50px;
  /* align-items: center; */

`;
const StFollowNumber = styled.div`
  margin-bottom: 6px;
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
  flex-direction: column;
  align-items: center;
  margin-top: 6.33px;
`;
const StFollowingNumber = styled.div`
  margin-bottom: 6px;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 32px;
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
