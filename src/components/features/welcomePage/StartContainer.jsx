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
  console.log(process.env.PUBLIC_URL);

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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                paddingLeft: "60px",
                paddingRight: "auto",
              }}>
              <h2
                style={{
                  margin:
                    window.innerHeight > 800
                      ? "40vh auto 6px 0"
                      : "27vh auto 6px 0",
                  color: "#FFFFFF",
                  fontSize: "38px",
                  lineHeight: "57px",
                }}>
                미믹에 오신
              </h2>
              <h2
                style={{
                  margin: "6px auto 6px 0",
                  color: "#FFFFFF",
                  fontSize: "38px",
                  lineHeight: "57px",
                }}>
                여러분을
              </h2>
              <h2
                style={{
                  margin: "6px auto 10vh 0",
                  color: "#FFFFFF",
                  fontSize: "38px",
                  lineHeight: "57px",
                }}>
                환영합니다!
              </h2>
              <div
                style={{
                  margin: "6px auto 6px 0",
                  color: "#FFFFFF",
                  lineHeight: "51px",
                  fontSize: "34px",
                  fontWeight: "400",
                }}>
                <span
                  style={{
                    color: "#FFFFFF",
                    fontWeight: "700",
                  }}>
                  MIMIC (미믹)
                </span>{" "}
                :{"  "}따라쟁이
              </div>
              <p
                style={{
                  margin: "6px auto 6px 0",
                  color: "#FFFFFF",
                  lineHeight: "39px",
                  fontSize: "26px",
                  fontWeight: "300",
                }}>
                따라쟁이라는 의미를 가진 미믹은
              </p>

              <p
                style={{
                  margin: "6px auto 6px 0",
                  color: "#FFFFFF",
                  lineHeight: "39px",
                  fontSize: "26px",
                  fontWeight: "300",
                }}>
                <span style={{ fontWeight: "600" }}>타인의 하루를 체험</span>
                해보고
              </p>
              <p
                style={{
                  margin: "6px auto 6px 0",
                  color: "#FFFFFF",
                  lineHeight: "39px",
                  fontSize: "26px",
                  fontWeight: "300",
                }}>
                <span style={{ fontWeight: "600" }}>내 하루를 공유</span>
                하는 어플입니다.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide
            style={{
              background: "#569AFF",
              height: "100%",
            }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                paddingLeft: "60px",
                paddingRight: "auto",
              }}>
              <h2
                style={{
                  margin:
                    window.innerHeight > 800
                      ? "35vh auto 6px 0"
                      : "22vh auto 6px 0",
                  color: "#FFFFFF",
                  fontSize: "38px",
                  lineHeight: "57px",
                }}>
                # 당신의 하루
              </h2>
              <h2
                style={{
                  margin: "6px auto 6px 0",
                  color: "#FFFFFF",
                  fontSize: "38px",
                  lineHeight: "57px",
                }}>
                # 그리고
              </h2>
              <h2
                style={{
                  margin: "6px auto 10vh 0",
                  color: "#FFFFFF",
                  fontSize: "38px",
                  lineHeight: "57px",
                }}>
                # 나의 하루
              </h2>
              <div
                style={{
                  margin: "6px auto 6px 0",
                  color: "#FFFFFF",
                  lineHeight: "51px",
                  fontSize: "34px",
                  fontWeight: "700",
                }}>
                어느 누군가의 하루 따라하기
              </div>
              <p
                style={{
                  margin: "6px auto 6px 0",
                  color: "#FFFFFF",
                  lineHeight: "39px",
                  fontSize: "26px",
                  fontWeight: "300",
                }}>
                평범하고 반복적인 내 일상에
              </p>
              <p
                style={{
                  margin: "6px auto 6px 0",
                  color: "#FFFFFF",
                  lineHeight: "39px",
                  fontSize: "26px",
                  fontWeight: "300",
                }}>
                <span style={{ fontWeight: "600" }}>작은 변화</span>를 주는 건
                어떨까요?
              </p>
              <p
                style={{
                  margin: "6px auto 6px 0",
                  color: "#FFFFFF",
                  lineHeight: "39px",
                  fontSize: "26px",
                  fontWeight: "300",
                }}>
                다른 사람의 하루를 빌려와서
              </p>
              <p
                style={{
                  margin: "6px auto 6px 0",
                  color: "#FFFFFF",
                  lineHeight: "39px",
                  fontSize: "26px",
                  fontWeight: "300",
                }}>
                따라해봐요!
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <StBackground backgroundImage={`url(${background1})`}>
              <h2
                style={{
                  margin: "6vh auto 6px 0",
                  color: "#FF6D53",
                  fontSize: "34px",
                  lineHeight: "51px",
                  fontWeight: "500",
                }}>
                STEP
              </h2>
              <h2
                style={{
                  fontFamily: "GmarketSans",
                  margin: "6px auto 6px 0",
                  marginBottom: window.innerHeight > 800 ? "16vh" : "8vh",
                  color: "#FF6D53",
                  fontSize: "74px",
                  fontWeight: "700",
                  lineHeight: "82px",
                }}>
                01
              </h2>
              <div
                style={{
                  margin: "6px auto 24px 0",
                  color: "#FF6D53",
                  lineHeight: window.innerHeight > 800 ? "26px" : "20px",
                  fontSize: window.innerHeight > 800 ? "34px" : "28px",
                  fontWeight: "700",
                }}>
                피드 구경하고 도전하기
              </div>
              <p
                style={{
                  margin: "6px auto 6px 0",
                  color: "#000000",
                  lineHeight: window.innerHeight > 800 ? "39px" : "26px",
                  fontSize: window.innerHeight > 800 ? "26px" : "20px",
                  fontWeight: "300",
                }}>
                많은 이용자들이{" "}
                <span style={{ fontWeight: "600" }}>공유한 하루를</span>
              </p>
              <p
                style={{
                  margin: "6px auto 6px 0",
                  color: "#000000",
                  lineHeight: window.innerHeight > 800 ? "39px" : "26px",
                  fontSize: window.innerHeight > 800 ? "26px" : "20px",
                  fontWeight: "300",
                }}>
                <span style={{ fontWeight: "600" }}>피드 페이지에서 구경</span>
                하고
              </p>
              <p
                style={{
                  margin: "6px auto 6px 0",
                  color: "#000000",
                  lineHeight: window.innerHeight > 800 ? "39px" : "26px",
                  fontSize: window.innerHeight > 800 ? "26px" : "20px",
                  fontWeight: "300",
                }}>
                마음에 드는 활동이 있다면
              </p>
              <p
                style={{
                  margin: "6px auto 6px 0",
                  color: "#000000",
                  lineHeight: window.innerHeight > 800 ? "39px" : "26px",
                  fontSize: window.innerHeight > 800 ? "26px" : "20px",
                  fontWeight: "300",
                }}>
                주저말고{" "}
                <span style={{ fontWeight: "600" }}>도전해보세요!</span>
              </p>
            </StBackground>
          </SwiperSlide>
          <SwiperSlide>
            <StBackground backgroundImage={`url(${background2})`}>
              <h2
                style={{
                  bottom: "0",
                  margin: "auto auto 6px 0",
                  color: "#569AFF",
                  fontSize: "34px",
                  lineHeight: "51px",
                  fontWeight: "500",
                }}>
                STEP
              </h2>
              <h2
                style={{
                  fontFamily: "GmarketSans",
                  margin: "6px auto 6px 0",
                  marginBottom: window.innerHeight > 800 ? "16vh" : "8vh",
                  color: "#569AFF",
                  fontSize: "74px",
                  fontWeight: "700",
                  lineHeight: "82px",
                }}>
                02
              </h2>
              <div
                style={{
                  margin: "6px auto 24px 0",
                  color: "#569AFF",
                  lineHeight: window.innerHeight > 800 ? "26px" : "20px",
                  fontSize: window.innerHeight > 800 ? "34px" : "28px",
                  fontWeight: "700",
                }}>
                나의 하루를 제안하기
              </div>
              <p
                style={{
                  margin: "6px auto 6px 0",
                  color: "#000000",
                  lineHeight: window.innerHeight > 800 ? "39px" : "26px",
                  fontSize: window.innerHeight > 800 ? "26px" : "20px",
                  fontWeight: "300",
                }}>
                나만의 하루 활동을
              </p>
              <p
                style={{
                  margin: "6px auto 6px 0",
                  color: "#000000",
                  lineHeight: window.innerHeight > 800 ? "39px" : "26px",
                  fontSize: window.innerHeight > 800 ? "26px" : "20px",
                  fontWeight: "300",
                }}>
                <span style={{ fontWeight: "600" }}>다른 사람에게 제안</span>
                해주세요!
              </p>
              <p
                style={{
                  margin: "6px auto 6px 0",
                  color: "#000000",
                  lineHeight: window.innerHeight > 800 ? "39px" : "26px",
                  fontSize: window.innerHeight > 800 ? "26px" : "20px",
                  fontWeight: "300",
                }}>
                나에게 익숙한 하루지만
              </p>
              <p
                style={{
                  margin: "6px auto 5vh 0",
                  color: "#000000",
                  lineHeight: window.innerHeight > 800 ? "39px" : "26px",
                  fontSize: window.innerHeight > 800 ? "26px" : "20px",
                  fontWeight: "300",
                }}>
                <span style={{ fontWeight: "600" }}>
                  누군가에겐 색다른 하루가 될거에요!
                </span>
              </p>
            </StBackground>
          </SwiperSlide>
          <SwiperSlide>
            <StBackground backgroundImage={`url(${background3})`}>
              <h2
                style={{
                  margin: "6vh auto 6px 0",
                  color: "#FF6D53",
                  fontSize: "34px",
                  lineHeight: "51px",
                  fontWeight: "500",
                }}>
                STEP
              </h2>
              <h2
                style={{
                  fontFamily: "GmarketSans",
                  margin: "6px auto 6px 0",
                  marginBottom: window.innerHeight > 800 ? "16vh" : "8vh",
                  color: "#FF6D53",
                  fontSize: "74px",
                  fontWeight: "700",
                  lineHeight: "82px",
                }}>
                03
              </h2>
              <div
                style={{
                  margin: "6px auto 24px 0",
                  color: "#FF6D53",
                  lineHeight: window.innerHeight > 800 ? "26px" : "20px",
                  fontSize: window.innerHeight > 800 ? "34px" : "28px",
                  fontWeight: "700",
                }}>
                미믹 시작하기
              </div>
              <p
                style={{
                  margin: "6px auto 6px 0",
                  color: "#000000",
                  lineHeight: window.innerHeight > 800 ? "39px" : "26px",
                  fontSize: window.innerHeight > 800 ? "26px" : "20px",
                  fontWeight: "300",
                }}>
                <span style={{ fontWeight: "600" }}>하루에 한 번</span>
              </p>
              <p
                style={{
                  margin: "6px auto 6px 0",
                  color: "#000000",
                  lineHeight: window.innerHeight > 800 ? "39px" : "26px",
                  fontSize: window.innerHeight > 800 ? "26px" : "20px",
                  fontWeight: "300",
                }}>
                다른 사람들을 따라해보고,
              </p>
              <p
                style={{
                  margin: "6px auto 6px 0",
                  color: "#000000",
                  lineHeight: window.innerHeight > 800 ? "39px" : "26px",
                  fontSize: window.innerHeight > 800 ? "26px" : "20px",
                  fontWeight: "300",
                }}>
                다른 사람이 나의 하루를
              </p>
              <p
                style={{
                  margin: "6px auto 6px 0",
                  color: "#000000",
                  lineHeight: window.innerHeight > 800 ? "39px" : "26px",
                  fontSize: window.innerHeight > 800 ? "26px" : "20px",
                  fontWeight: "300",
                }}>
                따라하게 해볼까요?
              </p>
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

// const SwiperImageCSSData = {
//   background: "none",
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "flex-start",
//   alignItems: "center",

//   width: "100%",
// };

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

  width: 90%;
  cursor: pointer;
`;

// {startingPageImage.map((elem, idx) => (
//   <SwiperSlide key={idx} style={SwiperImageCSSData}>
//     <div
//       style={{
//         height: "400px",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}>
//       <SildeImage width="100%" src={elem} />
//     </div>
//     <StContext>{startingPageText[idx]}</StContext>
//     {idx === 3 ? (
// <StStartbutton type="button" onClick={startAndGoToMain}>
//   미믹, 시작해볼까요?
// </StStartbutton>
//     ) : (
//       <div></div>
//     )}
//   </SwiperSlide>
// ))}

const StBackground = styled.div`
  background-image: ${(props) => props.backgroundImage};
  background-position: center;
  background-repeat: no-repeat;
  background-size: 500px 100vh;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-left: 60px;
  padding-right: auto;
`;
