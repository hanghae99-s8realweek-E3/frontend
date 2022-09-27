import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { setCookie } from "../../../utils/cookie";
import background1 from "../../../images/background1.png";
import background2 from "../../../images/background2.png";
import background3 from "../../../images/background3.png";

function StartContainer() {
  const navigate = useNavigate();

  function startAndGoToMain() {
    setCookie("firstEnter", true, 30758400);
    navigate("/");
  }

  return (
    <StContainer>
      <BannerSlideBox>
        {/* Pagination과 Navigation, Autoplay를 이용하고 싶아면 반드시 modules 속에 이용할 기능을 배치해주자. */}
        <Swiper
          modules={[Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          speed={500}
          scrollbar={{ draggable: true }}
          allowTouchMove
          pagination={{ clickable: true }}
          style={{ width: "100%", height: "100%" }}>
          <SwiperSlide
            style={{
              background: "#FF6D53",
              height: "100%",
            }}>
            <StColorPageCard>
              <StColorPageHead2Text
                style={{
                  margin:
                    window.innerHeight > 800
                      ? "33vh auto 6px 0"
                      : "27vh auto 6px 0",
                }}>
                미믹에 오신
              </StColorPageHead2Text>
              <StColorPageHead2Text
                style={{
                  margin: "6px auto 6px 0",
                }}>
                여러분을
              </StColorPageHead2Text>
              <StColorPageHead2Text
                style={{
                  margin: "6px auto 10vh 0",
                }}>
                환영합니다!
              </StColorPageHead2Text>
              <StColorPageDivText
                style={{
                  margin: "6px auto 6px 0",
                }}>
                <span>MIMIC (미믹)</span> :{"  "}따라쟁이
              </StColorPageDivText>
              <StColorPageParapText
                style={{
                  margin: "6px auto 6px 0",
                }}>
                따라쟁이라는 의미를 가진 미믹은
              </StColorPageParapText>

              <StColorPageParapText
                style={{
                  margin: "6px auto 6px 0",
                }}>
                <span style={{ fontWeight: "600" }}>타인의 하루를 체험</span>
                해보고
              </StColorPageParapText>
              <StColorPageParapText
                style={{
                  margin: "6px auto 6px 0",
                }}>
                <span style={{ fontWeight: "600" }}>내 하루를 공유</span>
                하는 어플입니다.
              </StColorPageParapText>
            </StColorPageCard>
          </SwiperSlide>
          <SwiperSlide
            style={{
              background: "#569AFF",
              height: "100%",
            }}>
            <StColorPageCard>
              <StColorPageHead2Text
                style={{
                  margin:
                    window.innerHeight > 800
                      ? "29vh auto 6px 0"
                      : "22vh auto 6px 0",
                }}>
                # 당신의 하루
              </StColorPageHead2Text>
              <StColorPageHead2Text
                style={{
                  margin: "6px auto 6px 0",
                }}>
                # 그리고
              </StColorPageHead2Text>
              <StColorPageHead2Text
                style={{
                  margin: "6px auto 10vh 0",
                }}>
                # 나의 하루
              </StColorPageHead2Text>
              <StColorPageDivText
                style={{
                  margin: "6px auto 6px 0",
                }}>
                어느 누군가의 하루 따라하기
              </StColorPageDivText>
              <StColorPageParapText
                style={{
                  margin: "6px auto 6px 0",
                }}>
                평범하고 반복적인 내 일상에
              </StColorPageParapText>
              <StColorPageParapText
                style={{
                  margin: "6px auto 6px 0",
                }}>
                <span style={{ fontWeight: "600" }}>작은 변화</span>를 주는 건
                어떨까요?
              </StColorPageParapText>
              <StColorPageParapText
                style={{
                  margin: "6px auto 6px 0",
                }}>
                다른 사람의 하루를 빌려와서
              </StColorPageParapText>
              <StColorPageParapText
                style={{
                  margin: "6px auto 6px 0",
                }}>
                따라해봐요!
              </StColorPageParapText>
            </StColorPageCard>
          </SwiperSlide>
          <SwiperSlide>
            <StBackground backgroundImage={`url(${background1})`}>
              <StStepHead2Text
                color="#ff6d53"
                style={{
                  margin: "6vh auto 6px 0",
                }}>
                STEP
              </StStepHead2Text>
              <StStepNumberHead2Text
                color="#ff6d53"
                style={{
                  margin: "6px auto 6px 0",
                  marginBottom: window.innerHeight > 800 ? "13vh" : "8vh",
                }}>
                01
              </StStepNumberHead2Text>
              <StStepPageDivText
                color="#ff6d53"
                style={{
                  margin: "6px auto 24px 0",
                }}>
                피드 구경하고 도전하기
              </StStepPageDivText>
              <StStepPageParapText
                style={{
                  margin: "6px auto 6px 0",
                }}>
                많은 이용자들이{" "}
                <span style={{ fontWeight: "600" }}>공유한 하루를</span>
              </StStepPageParapText>
              <StStepPageParapText
                style={{
                  margin: "6px auto 6px 0",
                }}>
                <span style={{ fontWeight: "600" }}>피드 페이지에서 구경</span>
                하고
              </StStepPageParapText>
              <StStepPageParapText
                style={{
                  margin: "6px auto 6px 0",
                }}>
                마음에 드는 활동이 있다면
              </StStepPageParapText>
              <StStepPageParapText
                style={{
                  margin: "6px auto 6px 0",
                }}>
                주저말고{" "}
                <span style={{ fontWeight: "600" }}>도전해보세요!</span>
              </StStepPageParapText>
            </StBackground>
          </SwiperSlide>
          <SwiperSlide>
            <StBackground backgroundImage={`url(${background2})`}>
              <StStepHead2Text
                color="#569AFF"
                style={{
                  bottom: "0",
                  margin: "auto auto 6px 0",
                }}>
                STEP
              </StStepHead2Text>
              <StStepNumberHead2Text
                color="#569AFF"
                style={{
                  margin: "6px auto 6px 0",
                  marginBottom: window.innerHeight > 800 ? "13vh" : "8vh",
                }}>
                02
              </StStepNumberHead2Text>
              <StStepPageDivText
                color="#569AFF"
                style={{
                  margin: "6px auto 24px 0",
                }}>
                나의 하루를 제안하기
              </StStepPageDivText>
              <StStepPageParapText
                style={{
                  margin: "6px auto 6px 0",
                }}>
                나만의 하루 활동을
              </StStepPageParapText>
              <StStepPageParapText
                style={{
                  margin: "6px auto 6px 0",
                }}>
                <span style={{ fontWeight: "600" }}>다른 사람에게 제안</span>
                해주세요!
              </StStepPageParapText>
              <StStepPageParapText
                style={{
                  margin: "6px auto 6px 0",
                }}>
                나에게 익숙한 하루지만
              </StStepPageParapText>
              <StStepPageParapText
                style={{
                  margin: "6px auto 5vh 0",
                }}>
                <span style={{ fontWeight: "600" }}>
                  누군가에겐 색다른 하루가 될거에요!
                </span>
              </StStepPageParapText>
            </StBackground>
          </SwiperSlide>
          <SwiperSlide>
            <StBackground backgroundImage={`url(${background3})`}>
              <StStepHead2Text
                color="#ff6d53"
                style={{
                  margin: "6vh auto 6px 0",
                }}>
                STEP
              </StStepHead2Text>
              <StStepNumberHead2Text
                color="#ff6d53"
                style={{
                  margin: "6px auto 6px 0",
                  marginBottom: window.innerHeight > 800 ? "13vh" : "8vh",
                }}>
                03
              </StStepNumberHead2Text>
              <StStepPageDivText
                color="#ff6d53"
                style={{
                  margin: "6px auto 24px 0",
                }}>
                미믹 시작하기
              </StStepPageDivText>
              <StStepPageParapText
                style={{
                  margin: "6px auto 6px 0",
                }}>
                <span style={{ fontWeight: "600" }}>하루에 한 번</span>
              </StStepPageParapText>
              <StStepPageParapText
                style={{
                  margin: "6px auto 6px 0",
                }}>
                다른 사람들을 따라해보고,
              </StStepPageParapText>
              <StStepPageParapText
                style={{
                  margin: "6px auto 6px 0",
                }}>
                다른 사람이 나의 하루를
              </StStepPageParapText>
              <StStepPageParapText
                style={{
                  margin: "6px auto 6px 0",
                }}>
                따라하게 해볼까요?
              </StStepPageParapText>
              <StStartbutton type="button" onClick={startAndGoToMain}>
                미믹, 시작하기!
              </StStartbutton>
            </StBackground>
          </SwiperSlide>
        </Swiper>
      </BannerSlideBox>
    </StContainer>
  );
}

export default StartContainer;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin: 0;
  width: 100%;

  box-sizing: border-box;
`;

const BannerSlideBox = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  height: 100vh;

  overflow: hidden;
  box-sizing: border-box;
`;

const StStartbutton = styled.button`
  background: #ffffff;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 22px;
  font-weight: 500;
  color: #ff6d53;

  border: none;
  outline: none;
  border-radius: 6px;
  padding: 15px 0;
  margin: auto 0 5vh 0;

  width: 100%;
  cursor: pointer;

  @media screen and (max-width: 500px) {
    width: 100%;
    padding: 10px 0;
  }
`;

const StBackground = styled.div`
  background-image: ${(props) => props.backgroundImage};
  background-position: center;
  background-repeat: no-repeat;
  background-size: 500px 100vh;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0 60px;
  @media screen and (max-width: 500px) {
    padding: 0 30px;
  }
`;

const StColorPageHead2Text = styled.h2`
  color: #ffffff;
  font-size: 38px;
  line-height: 57px;

  @media screen and (max-width: 500px) {
    font-size: 28px;
    line-height: 40px;
  }
`;

const StColorPageDivText = styled.div`
  color: #ffffff;
  line-height: 51px;
  font-size: 34px;
  font-weight: 400;

  & span {
    color: #ffffff;
    font-weight: 700;
  }

  @media screen and (max-width: 500px) {
    font-size: 24px;
  }
`;

const StColorPageParapText = styled.p`
  color: #ffffff;
  line-height: 39px;
  font-size: 26px;
  font-weight: 300;

  @media screen and (max-width: 500px) {
    font-size: 18px;
    line-height: 24px;
  }
`;

const StColorPageCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-left: 60px;
  padding-right: auto;

  @media screen and (max-width: 500px) {
    padding-left: 30px;
  }
`;

const StStepHead2Text = styled.h2`
  color: ${(props) => props.color};
  font-size: 34px;
  line-height: 51px;
  font-weight: 500;

  @media screen and (max-width: 500px) {
    font-size: 24px;
    line-height: 30px;
  }
`;

const StStepNumberHead2Text = styled.h2`
  font-family: "GmarketSans";
  font-size: 74px;
  font-weight: 700;
  color: ${(props) => props.color};
  line-height: 82px;

  @media screen and (max-width: 500px) {
    font-size: 50px;
    line-height: 60px;
  }
`;

const StStepPageDivText = styled.div`
  color: ${(props) => props.color};
  line-height: ${window.innerHeight > 800 ? "26px" : "20px"};
  font-size: ${window.innerHeight > 800 ? "34px" : "28px"};
  font-weight: 700;

  @media screen and (max-width: 500px) {
    font-size: 26px;
    line-height: 26px;
  }
`;

const StStepPageParapText = styled.p`
  color: #000000;
  line-height: ${window.innerHeight > 800 ? "39px" : "26px"};
  font-size: ${window.innerHeight > 800 ? "26px" : "20px"};
  font-weight: 300;

  @media screen and (max-width: 500px) {
    font-size: 18px;
    line-height: 24px;
  }
`;
