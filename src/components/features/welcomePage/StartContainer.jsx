import styled from "styled-components";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

function StartContainer() {
  const startingPageImage = [
    "https://cdn.class101.net/images/ed70fb92-b8fb-42cd-83d0-db0761a60f37/1920xauto.webp",
    "https://cdn.class101.net/images/367bcbd9-1311-405f-bb5f-5737e4f9b43a",
    "https://cdn.class101.net/images/070f5c4e-031b-41b9-9d2b-be4bee95c031/1920xauto.webp",
  ];

  return (
    <StContainer>
      <StHeadTitle>안녕하세요! 미믹입니다.</StHeadTitle>
      <BannerSlideBox>
        {/* Pagination과 Navigation, Autoplay를 이용하고 싶아면 반드시 modules 속에 이용할 기능을 배치해주자. */}
        <Swiper
          modules={[Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          speed={500}
          scrollbar={{ draggable: true }}
          allowTouchMove
          pagination={{ clickable: true }}>
          {startingPageImage.map((elem, idx) => (
            <SwiperSlide key={idx} style={SwiperImageCSSData}>
              <SildeImage width="450px" src={elem} />
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

  width: 100%;
`;

const StHeadTitle = styled.h1`
  text-align: left;
  font-size: 24px;
  font-weight: 500;
  margin: 0 auto 20px 0;
`;

const BannerSlideBox = styled.div`
  display: flex;
  flex-direction: row;

  width: 450px;
  height: 230px;

  border-radius: 6px;

  overflow: hidden;
  box-sizing: border-box;
`;

const SildeImage = styled.img`
  width: ${(props) => props.width};
`;

const SwiperImageCSSData = {
  backgroundColor: "gray",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",

  width: "500px",
  height: "300px",
};
