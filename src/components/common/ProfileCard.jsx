import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function ProfileCard({ card }) {
  const navigate = useNavigate;
  const goFollow = () => {
    navigate("/follow");
  };

  const goFollowing = () => {
    navigate("/follow");
  };
  return (
    <>
      <StTopWrap>
        <StProfileImg
          src="https://img.lostark.co.kr/profile/1/99A280E5FAA837CE4AEB6292A8016E2663C8066EEBB72B7791DE42C893449258.PNG"
          width="80"
          height="80"
          alt="dy"
        />
        <StFriendNameMbti>
          <StFriendName>{card.userInfo.nickname}</StFriendName>
          <StMbti>{card.userInfo.mbti}</StMbti>
        </StFriendNameMbti>
        <StFollowWrap onClick={goFollow}>
          <StFollowNumber>{card.userInfo.followerCount}</StFollowNumber>
          <StFollowWord>팔로워</StFollowWord>
        </StFollowWrap>
        <StFollowingWrap onClick={goFollowing}>
          <StFollowingNumber>{card.userInfo.followingCount}</StFollowingNumber>
          <StFollowingWord>팔로잉</StFollowingWord>
        </StFollowingWrap>
      </StTopWrap>
    </>
  );
}

export default ProfileCard;

const StTotalWrap = styled.div`
  display: flex;
  width: 500px;
  flex-direction: column;
`;
const StProfileImg = styled.img`
  margin-right: 26px;
  margin-left: 35px;
  border-radius: 9999px;
`;
const StTopWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 170.67px;
  margin-bottom: 48.33px;
  /* width: 380px; */
`;
const StFriendNameMbti = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 12.33px;
  margin-right: 75px;
`;
const StFriendName = styled.div`
  display: flex;
  flex-direction: row;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  color: #000000;
`;
const StMbti = styled.div`
  display: flex;
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
  display: flex;
  flex-direction: column;
  margin-top: 6.33px;
  margin-right: 74px;
  align-items: center;
`;
const StFollowNumber = styled.div`
  margin-bottom: 6px;
  display: flex;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 32px;
  text-align: center;
  color: #000000;
`;
const StFollowWord = styled.div`
  display: flex;
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
  flex-direction: column;
  align-items: center;
  margin-top: 6.33px;
`;
const StFollowingNumber = styled.div`
  display: flex;
  margin-bottom: 6px;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 32px;
`;
const StFollowingWord = styled.div`
  display: flex;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 32px;
  text-align: center;
  color: #000000;
`;
