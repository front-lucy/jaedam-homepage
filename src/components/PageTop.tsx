import styled from "@emotion/styled";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const PageTopSection = styled.section`
  width: 100%;
  padding: 0px 0;
  background-color: #fff;
  z-index: -2;
`;

const Guide = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const PageTopTitle = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1px;
  margin-bottom: 25px;

  h2 {
    font-size: 2.125rem;
    font-weight: bold;
    margin: 0;
    color: #051512;
    position: relative;
    z-index: 1;
  }

  span {
    font-size: 16px;
    color: #666;
    background-color: #fff;
    padding: 5px 10px;
    border-radius: 4px;
  }
`;

const BannerWrapper = styled.div`
  margin: 0 auto;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 200px;
`;

export default function PageTop() {
  const banners = [
    "/images/top-banner/1.png",
    "/images/top-banner/2.png",
    "/images/top-banner/3.png",
  ];
  const Slider = dynamic(() => import("react-slick"), { ssr: false });
  const settings = {
    dots: false,
    infinite: true,
    speed: 800, // 전환 속도 (밀리초)
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    fade: true,
    cssEase: "ease-in-out",
  };

  return (
    <PageTopSection>
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <>
            <BannerWrapper key={index}>
              <BannerImage src={banner} alt={`배너 ${index + 1}`} />
            </BannerWrapper>
          </>
        ))}
      </Slider>
    </PageTopSection>
  );
}
