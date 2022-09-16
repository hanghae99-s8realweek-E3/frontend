import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { setCookie } from "../../../utils/cookie";

function StartContainer() {
  const navigate = useNavigate();

  const startingPageImage = [
    "https://cinnamorolllife.com/wp-content/uploads/2018/12/%E7%84%A1%E9%A1%8C625-1.png",
    "https://i.pinimg.com/originals/75/21/4d/75214d2350a22faad8343f9f89e9cd51.png",
    "https://scdn.line-apps.com/stf/linenews-issue-1726/rssitem-10757747/87fc3b6fd9aab04fc88546d72134a9f654ba2a72.jpg",
    "https://pbs.twimg.com/media/BkSRCUCCMAA_XHp.png",
  ];

  const startingPageText = [
    "미믹에 오신 여러분을 환영합니다!\n 미믹은 타인의 활동을 체험해보고, 내 활동을 공유하는 어플입니다.",
    "우선, 피드 페이지에 들어가셔서 모두가 어떤 일을 진행했는지 구경해보세요!",
    "체험해보고 싶은 일이 있다면 오늘의 도전을 클릭하면\n오늘 내가 체험할 타인의 활동이 됩니다.",
    "다른 사람이 나의 활동을 체험하게 하고 싶다고요?\n그럼 당신의 활동을 제안해주세요!\n도전하고 싶은 사람들이 당신의 활동을 가져갈거에요.",
  ];

  function startAndGoToMain() {
    setCookie("firstEnter", true, 30758400);
    navigate("/");
  }

  return (
    <StContainer>
      <StHeadTitle>
        안녕하세요,
        <br />
        MIMIC 입니다!
      </StHeadTitle>
      <BannerSlideBox>
        {/* Pagination과 Navigation, Autoplay를 이용하고 싶아면 반드시 modules 속에 이용할 기능을 배치해주자. */}
        <Swiper
          modules={[Pagination, Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          speed={500}
          scrollbar={{ draggable: true }}
          allowTouchMove
          Navigation={true}
          pagination={{ clickable: true }}
          style={{ height: "650px" }}>
          {startingPageImage.map((elem, idx) => (
            <SwiperSlide key={idx} style={SwiperImageCSSData}>
              <div
                style={{
                  height: "400px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <SildeImage width="100%" src={elem} />
              </div>
              <StContext>{startingPageText[idx]}</StContext>
              {idx === 3 ? (
                <StStartbutton type="button" onClick={startAndGoToMain}>
                  미믹, 시작해볼까요?
                </StStartbutton>
              ) : (
                <div></div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </BannerSlideBox>
    </StContainer>
  );
}

export default StartContainer;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin: 10vh 25px;
  width: 100%;

  box-sizing: border-box;
`;

const StHeadTitle = styled.h1`
  display: block;

  font-weight: 500;
  font-size: 32px;

  width: 90%;
`;

const BannerSlideBox = styled.div`
  display: flex;
  flex-direction: row;

  width: 90%;
  height: 650px;

  border-radius: 6px;

  overflow: hidden;
  box-sizing: border-box;
`;

const SildeImage = styled.img`
  width: ${(props) => props.width};
`;

const StContext = styled.p`
  font-size: 18px;
  font-weight: 500;

  height: 50px;
`;

const SwiperImageCSSData = {
  background: "none",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",

  width: "100%",
};

const StStartbutton = styled.button`
  background: #979797;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 22px;
  font-weight: 500;
  color: #ffffff;

  border: none;
  outline: none;
  border-radius: 6px;
  padding: 20px 0;
  margin: 30px 0 0 0;

  width: 90%;
  cursor: pointer;
`;
