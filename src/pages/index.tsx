import Header from "@/components/Header"; // 추가된 부분
import styled from "@emotion/styled";

const Container = styled.div`
  position: relative;
  display: flex;
  height: 100vh;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const FooterLeft = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  font-weight: 500;
  font-size: 13px;
  color: #fff;
  letter-spacing: -0.3px;
  opacity: 0.5;
  line-height: 18px;
  min-width: 610px;
  padding: 46px 80px 40px;
`;

const FooterNav = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const FooterRight = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  bottom: 0;
  right: 0;
  font-weight: 500;
  font-size: 13px;
  color: #fff;
  letter-spacing: -0.3px;
  opacity: 0.5;
  line-height: 18px;
  min-width: 610px;
  padding: 46px 80px 40px;
`;

export default function Home() {
  return (
    <Container>
      <Header color="#fff" logoColor="white" background="transparent" />
      <VideoBackground autoPlay loop muted playsInline>
        <source
          src="https://s3.ap-northeast-2.amazonaws.com/shortz.net/public/test/shortz-intro.mp4"
          type="video/mp4"
        />
      </VideoBackground>
      <FooterLeft>
        <FooterNav>
          <span>작가 모집</span>
          <span>사업문의&제휴</span>
          <span>오시는 길</span>
        </FooterNav>
      </FooterLeft>
      <FooterRight>
        <span>©JAEDAM MEDIA Co., Ltd. All rights reserved.</span>
      </FooterRight>
    </Container>
  );
}
