import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

function Footer() {
  const params = useParams();
  const navigate = useNavigate();

  // 메인 페이지로 이동
  function moveToHome() {
    navigate("/");
  }

  // 피드 페이지로 이동
  function moveToFeed() {
    navigate("/todolists");
  }

  // TODO 페이지로 이동
  function moveToTodo() {
    navigate("/setuptodo");
  }

  // 내 정보 페이지로 이동
  function moveToMyPage() {
    navigate("/mypage");
  }

  return (
    <FooterContainer>
      <FooterButtonBox>
        <StButton
          onClick={moveToHome}
          color={
            window.location.pathname === "/" ||
            window.location.pathname === "/welcomepage" ||
            window.location.pathname === "/teaser"
              ? "#FF6D53"
              : "#313131"
          }>
          <div>
            <StBtnImage
              src={
                window.location.pathname === "/" ||
                window.location.pathname === "/welcomepage" ||
                window.location.pathname === "/teaser"
                  ? process.env.PUBLIC_URL + `/images/HomeActive.png`
                  : process.env.PUBLIC_URL + `/images/Home.png`
              }
            />
          </div>
          홈
        </StButton>
        <StButton
          onClick={moveToFeed}
          color={
            window.location.pathname === "/todolists" ||
            window.location.pathname === `/todolists/${params.mbti}` ||
            window.location.pathname === `/feeddetail/${params.todoId}` ||
            window.location.pathname === "/todolists" ||
            window.location.pathname === `/follows/${params.userId}` ||
            window.location.pathname === `/selectmbtifeed` ||
            window.location.pathname === `/follows/${params.userId}`
              ? "#FF6D53"
              : "#313131"
          }>
          <div>
            <StBtnImage
              src={
                window.location.pathname === "/todolists" ||
                window.location.pathname === `/todolists/${params.mbti}` ||
                window.location.pathname === `/feeddetail/${params.todoId}` ||
                window.location.pathname === "/todolists" ||
                window.location.pathname === `/follows/${params.userId}` ||
                window.location.pathname === `/selectmbtifeed` ||
                window.location.pathname === `/follows/${params.userId}`
                  ? process.env.PUBLIC_URL + `/images/FeedActive.png`
                  : process.env.PUBLIC_URL + `/images/Feed.png`
              }
            />
          </div>
          피드
        </StButton>
        <StButton
          onClick={moveToTodo}
          color={
            window.location.pathname === "/setuptodo" ||
            window.location.pathname === "/mytodos"
              ? "#FF6D53"
              : "#313131"
          }>
          <div>
            <StBtnImage
              src={
                window.location.pathname === "/setuptodo" ||
                window.location.pathname === "/mytodos"
                  ? process.env.PUBLIC_URL + `/images/MimicActive.png`
                  : process.env.PUBLIC_URL + `/images/Mimic.png`
              }
            />
          </div>
          미믹
        </StButton>
        <StButton
          onClick={moveToMyPage}
          color={
            window.location.pathname === "/mypage" ||
            window.location.pathname === "/activity" ||
            window.location.pathname === "/login" ||
            window.location.pathname === "/mbti" ||
            window.location.pathname === "/signup" ||
            window.location.pathname === "/modifyprofile" ||
            window.location.pathname === "/changepw" ||
            window.location.pathname === "/helpdesk" ||
            window.location.pathname === "/withdraw"
              ? "#FF6D53"
              : "#313131"
          }>
          <div>
            <StBtnImage
              src={
                window.location.pathname === "/mypage" ||
                window.location.pathname === "/activity" ||
                window.location.pathname === "/login" ||
                window.location.pathname === "/mbti" ||
                window.location.pathname === "/signup" ||
                window.location.pathname === "/modifyprofile" ||
                window.location.pathname === "/changepw" ||
                window.location.pathname === "/helpdesk" ||
                window.location.pathname === "/withdraw"
                  ? process.env.PUBLIC_URL + `/images/MyActive.png`
                  : process.env.PUBLIC_URL + `/images/My.png`
              }
            />
          </div>
          MY
        </StButton>
      </FooterButtonBox>
    </FooterContainer>
  );
}

export default Footer;

const FooterContainer = styled.div`
  background: #fafafa;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: fixed;

  height: 64px;
  width: 500px;

  padding-top: 5px;
  margin: auto;

  bottom: 0;
  z-index: 6;
  @media screen and (max-width: 500px) {
    align-items: center;
    width: 360px;
  }
`;

const FooterButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5rem;

  height: 100%;

  @media screen and (max-width: 500px) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    width: 360px;
    gap: 3rem;
  }
`;

const StButton = styled.button`
  background: none;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-size: 12px;
  font-weight: 400;
  color: ${(props) => props.color};

  border: none;
  outline: none;
  padding: 0;

  cursor: pointer;
`;

// const StCommonBar = styled.div`
//   background: #000000;

//   margin-top: 15px;
//   border-radius: 133.005px;

//   width: 178.23px;
//   height: 6.65px;
// `;

const StBtnImage = styled.img`
  height: 30px;
  width: 30px;
`;
