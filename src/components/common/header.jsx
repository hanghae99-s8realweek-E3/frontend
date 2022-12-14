import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

function Header() {
  const navigate = useNavigate();
  const params = useParams();

  // 이전 페이지로 이동
  function moveToPrevPage() {
    if (window.location.pathname === "/test") {
      return navigate("/");
    }
    return navigate(-1);
  }

  function changeHeaderName() {
    switch (window.location.pathname) {
      case "/todolists":
        return "피드";
      case `/todolists/${params.mbti}`:
        return params.mbti;
      case `/feeddetail/${params.todoId}`:
        return "none";
      case `/follows/${params.userId}`:
        return "유저";
      case `/selectmbtifeed`:
        return "MBTI";
      case "/setuptodo":
        return "미믹";
      case "/mytodos":
        return "미믹";
      case "/mypage":
        return "none";
      case "/activity":
        return "나의 활동";
      case "/login":
        return "로그인";
      case "/mbti":
        return "MBTI";
      case "/signup":
        return "회원가입";
      case "/modifyprofile":
        return "프로필 변경";
      case "/changepw":
        return "비밀번호 변경";
      case "/helpdesk":
        return "고객센터";
      case "/withdraw":
        return "고객센터";
      default:
        return "none";
    }
  }

  return (
    <HeaderContainer>
      {window.location.pathname === "/" ||
      window.location.pathname === "/mbti" ? (
        <div></div>
      ) : (
        <StBackBtn type="button" onClick={moveToPrevPage}>
          <img
            style={{
              height: "16px",
              pointerEvents: "none",
            }}
            src={process.env.PUBLIC_URL + `/images/back.png`}
            alt="이전 화면으로 돌아가기"
          />
        </StBackBtn>
      )}
      {window.location.pathname === "/" ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <LogoImage
            src={process.env.PUBLIC_URL + `/images/Logo.svg`}
            aria-hidden="true"
          />
        </div>
      ) : (
        <HeaderText>
          {changeHeaderName() !== "none" ? (
            changeHeaderName()
          ) : (
            <LogoImage
              src={process.env.PUBLIC_URL + `/images/Logo.svg`}
              aria-hidden="true"
            />
          )}
        </HeaderText>
      )}
    </HeaderContainer>
  );
}

export default Header;

const HeaderContainer = styled.div`
  background: #ffffff;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  position: fixed;

  text-align: center;

  height: 60px;
  width: 500px;

  border-bottom: 1px solid #c7c7c7;
  margin: 0;

  top: 0;
  z-index: 5;

  @media screen and (max-width: 500px) {
    width: 360px;
  }
`;

const StBackBtn = styled.button`
  background: none;

  height: 17px;

  border: none;
  outline: none;

  margin-right: auto;
  margin-left: 35px;

  cursor: pointer;
`;

const LogoImage = styled.img`
  height: 20px;
`;

const HeaderText = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin: auto;
`;
