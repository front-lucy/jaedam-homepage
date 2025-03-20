import Header from "@/components/Header";
import styled from "@emotion/styled";

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 40px;
  font-size: 0;
  box-sizing: content-box;
  border-bottom: 1px solid #dcdcdc;
`;

const TitleJaedam = styled.div`
  margin-top: 26px;
  font-weight: 800;
  font-size: 32px;
  color: #353b42;
`;

const Subtitle = styled.div`
  margin-top: 16px;
  font-weight: 800;
  font-size: 25px;
  line-height: 148%;
  color: #353b42;
`;

const SecoundSubtitle = styled.div`
  margin-top: 30px;
  font-weight: 800;
  font-size: 25px;
  line-height: 148%;
  color: #353b42;
`;

const Description = styled.div`
  font-size: 22px;
  line-height: 36px;
  color: #595e65;
  margin-top: 44px;
`;

const SecoundDescription = styled.div`
  font-size: 22px;
  line-height: 36px;
  color: #595e65;
  margin-top: 20px;
`;

export default function business() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: "100px",
      }}
    >
      <Header background="" color="#000" hoverColor="#00c1d4" />
      <img
        src="/images/Google Form.png"
        alt="business"
        style={{
          width: "100%",
          height: "auto",
          objectFit: "contain",
        }}
      />

      <Container>
        <TitleJaedam>만화 제작</TitleJaedam>
        <Subtitle>세상의 모든 재미를 담습니다.</Subtitle>
        <Description>
          오늘도 재담은 세상의 모든 재미를 담기 위해 쉼 없이 작가의 가능성을
          찾고 끊임없이 작가의 재능을 서포트합니다. 콘텐츠를 만들기 위한 재담의
          노력은 작가에서부터 시작됩니다. 세상을 향한 작가님의 이야기가 독자의
          가슴 깊이 선명하게 전달될 수 있도록 재담의 모든 PD는 항상 작가님과
          함께 꿈꾸고자 합니다. 데뷔를 꿈꾸는 신인작가에게는 과감한 투자를 통한
          든든한 지원자로서, 새로운 콘텐츠를 갈망하는 기성작가에게는 노련하고
          폭넓은 조력자로서, 대한민국 NO.1 제작사 재담이 언제나 함께 합니다.
        </Description>
        <img
          src="/images/introbtn.png"
          alt="재담미디어"
          style={{
            width: "150px",
            height: "auto",
            objectFit: "contain",
            marginTop: "40px",
          }}
        />
      </Container>

      <Container>
        <TitleJaedam>콘텐츠 유통</TitleJaedam>
        <Subtitle>
          <Subtitle>
            재담은 작가와 독자를 연결합니다.
            <br />
            작품 기획부터 플랫폼 연재까지, 처음부터 끝까지 함께합니다.
          </Subtitle>
        </Subtitle>
        <Description>
          현대로맨스, 로맨스판타지, 드라마, BL, GL 등 여성 독자들에게 사랑받는
          작품은 그에 맞는 플랫폼을 연결하고, <br />
          액션, 무협, 스릴러, 코믹 등 남성 독자들에게 사랑받는 작품은 그에 맞는
          플랫폼을 연결합니다. <br />
          다양한 장르, 다양한 주제, 다양한 소재의 작품들을 발굴, 기획, 제작하여
          유통합니다. <br />
        </Description>
        <img
          src="/images/content.png"
          alt="재담미디어"
          style={{
            width: 800,
          }}
        />
      </Container>

      <Container>
        <TitleJaedam>해외 세일즈</TitleJaedam>
        <Subtitle>
          <Subtitle>
            재담은 웹툰의 글로벌 서비스를 적극 추진하고 있습니다.
          </Subtitle>
        </Subtitle>
        <Description>
          미국, 중국, 일본, 유럽, 동남아시아 등 해외 여러 국가에서 재담 웹툰이
          연재되고 있습니다.
          <br />
          특히 인도에는 합작 법인을 설립하여 웹툰 플랫폼 '크로스픽쳐스'를
          운영하고 있습니다.
          <br />
          이외에도 중국, 태국, 멕시코 등에서 메가 히트작 &lt;궁&gt; 의 영상화
          계약을 체결한 바 있으며,
          <br />
          볼리비아에 만화 원작을 수출하여 현지 단행본으로 출간하는 등 다방면으로
          해외 사업을 전개하고 있습니다.
          <br />
        </Description>
        <br />
        <Subtitle>글로벌 네트워크</Subtitle>
        <img
          src="/images/globalsalse.png"
          alt="재담미디어"
          style={{
            width: 800,
          }}
        />
      </Container>
      <Container>
        <TitleJaedam>IP 비즈니스</TitleJaedam>
        <Subtitle>
          <Subtitle>IP : 지식재산권(Intellectual Property)</Subtitle>
        </Subtitle>
        <SecoundDescription>
          얼마 전까지만 해도 IP라는 단어는 인터넷 프로토콜(Internet Protocol)의
          약자로 인식되곤 했습니다. <br />
          하지만 지금 이 단어는 지식 재산권, 즉 문학이나 음악, 디자인, 미술작품
          등 창작물의 저작권을 뜻하는 단어로 통용되고 있습니다. <br />
        </SecoundDescription>
        <br />
        <SecoundSubtitle>
          <Subtitle>재담은 IP를 매니지먼트합니다.</Subtitle>
        </SecoundSubtitle>
        <SecoundDescription>
          재담이 매니지먼트하는 만화 IP는 500개가 넘습니다. <br />
          재담은 만화/웹툰의 영화화, 드라마화를 비롯하여 게임, 공연, 출판, 굿즈
          제작 등 다방면의 IP 확장 프로젝트를 진행하고 있습니다. <br />
          성공적인 IP 확장을 위해 굴지의 영화, 드라마 제작사와 협업하고 있으며,
          매년 국내외 피칭 행사에 참가하여 다양한 재담 작품을 홍보하고 있습니다.
          <br />
        </SecoundDescription>
        <br />
        <SecoundSubtitle>
          <Subtitle>재담은 IP를 만듭니다.</Subtitle>
        </SecoundSubtitle>
        <SecoundDescription>
          IP의 확장 가능성은 무한합니다. 미키마우스, 해리포터, 마블시리즈 등 잘
          만든 IP는 세계로 뻗어나갑니다.
          <br />
          시작은 각각 캐릭터, 소설, 만화였지만 소비자는 영화, 게임, 애니메이션
          등을 통해 작품을 접하고 있습니다.
          <br />
          재담은 이렇듯 다양한 매체로 확장 가능한 ‘JAEDAM ORIGINAL IP’를
          기획/개발하고 있습니다.
          <br />
          궁극적으로는 국내뿐 아니라 해외에서도 인기리에 소비되는 글로벌 킬러
          IP를 보유한 제작사로 나아가고자 합니다.
          <br />
        </SecoundDescription>
      </Container>
    </div>
  );
}
