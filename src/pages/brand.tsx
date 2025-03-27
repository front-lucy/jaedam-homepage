/** @jsxImportSource @emotion/react */
import Header from "@/components/Header";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;
`;

const ContentWrapper = styled.div`
  padding: 115px 0;
  font-size: 38px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
`;

const Mission = styled.span`
  line-height: 3rem;
  margin-bottom: 30px;
`;

const StatsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 40px;
`;

const StatBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 64px;
  font-weight: 600;
  line-height: 1em;
  gap: 16px;
`;

const StatLabel = styled.span`
  color: rgb(125 125 125);
  font-size: 14px;
  line-height: 14px;
  font-weight: 500;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: auto;
  max-width: 1200px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
`;

const MotionSection = styled(motion.section)`
  padding: 120px 20px;
  max-width: 1200px;
  margin: 0 auto;
  border-bottom: 1px solid #eee;
`;

const Title = styled.h2`
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #333;
`;

const Subtitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 30px;
  color: #00c1d4;
`;

const Paragraph = styled.p`
  font-size: 16px;
  line-height: 2;
  color: #555;
  margin-bottom: 12px;
`;

const SectionImage = styled.img`
  width: 100%;
  max-width: 600px;
  display: block;
  margin: 40px auto 0;
`;

const BrandSection = ({
  title,
  subtitle,
  paragraphs,
  imgSrc,
}: {
  title: string;
  subtitle?: string;
  paragraphs: string[];
  imgSrc?: string;
}) => (
  <MotionSection
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
  >
    <Title>{title}</Title>
    {subtitle && <Subtitle>{subtitle}</Subtitle>}
    {paragraphs.map((text, idx) => (
      <Paragraph key={idx}>{text}</Paragraph>
    ))}
    {imgSrc && <SectionImage src={imgSrc} alt={title} />}
  </MotionSection>
);

export default function Brand() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <Wrapper>
      <Header background="" color="#000" hoverColor="#00c1d4" />

      <div>
        <BrandSection
          title="캐릭터의 모든 것 “큐티즈”"
          subtitle="All about Character “Qtizz”"
          paragraphs={[
            "큐티즈는 귀엽고 매력적인 캐릭터 친구들이란 의미로",
            "캐릭터 디자인 라이선싱, 콘텐츠 제작, 캐릭터 상품 판매, 캐릭터 콜라보레이션 등",
            "캐릭터 IP와 관련된 전방위적 사업을 전개하는 IP 비즈니스 전문 회사입니다.",
            "큐티즈는 감성적인 캐릭터 브랜딩 노하우를 바탕으로 누구나 좋아하고 사랑받는 캐릭터 세상을 만들어가며",
            "글로벌 캐릭터 엔터테인먼트 기업으로 발전해가겠습니다.",
          ]}
          imgSrc="/images/qtizz.jpg"
        />

        <BrandSection
          title="스튜디오 담"
          subtitle="Director, Artist, Manager 가 공존하는 웹툰 제작 전문 스튜디오"
          paragraphs={[
            "국내외 여러 플랫폼에서 매일 같이 신작이 쏟아지고 있습니다.",
            "치열해진 경쟁 환경 속에서 웹툰을 소비하는 독자들의 눈높이도 상당히 높아졌습니다.",
            "스튜디오 담은 신티크 프로, 에르고 스탠드, 최고 사양 컴퓨터, 각종 그래픽 툴 등의 전문 장비를 갖추었으며",
            "스토리 창작에서부터 각색, 콘티, 작화, 채색, 배경 제작, 편집 등 웹툰 제작의 모든 영역을 세분화, 분업화하여 높은 퀄리티의 제작 능력을 확보하였습니다.",
            "특화된 기술력과 축적된 노하우를 바탕으로 오리지널 웹툰 제작, 원천 IP 웹툰화, 브랜드웹툰 제작 등 다양한 콘텐츠를 만들고 있습니다.",
          ]}
          imgSrc="/images/studiodam.jpg"
        />

        <BrandSection
          title="출판"
          subtitle="재담은 소설도 만듭니다."
          paragraphs={[
            "꼭 만화여야만 할까요? 재미있는 이야기를 소설로 먼저 선보인 다음 만화로 제작하면 어떨까요?",
            "때론 만화보다 소설에 더 적합한 이야기, 그림보다 텍스트로 즐길 때 더욱 재미있는 이야기도 있습니다.",
            "IP 확보 측면에서 보면 소설이 웹툰보다 빠르고 효율적입니다. 그림이 필요하지 않으니까요.",
            "이러한 고민의 결과, 직접 소설을 기획·개발하기 시작했습니다.",
            "종이소설인지 웹소설인지, 혹은 장르가 무엇인지 구분하지 않습니다.",
            "늘 그랬듯 재담은 대중을 흥분케 할 Fun 한 이야기를 찾고 있습니다.",
          ]}
        />

        <BrandSection
          title="마켓툰"
          subtitle="브랜드웹툰 제작은 마켓툰에서!"
          paragraphs={[
            "최고의 광고 전문가와 함께하는 맞춤형 홍보웹툰 제작, 마켓툰.",
            "홍보 효과 극대화를 위한 마케팅 기획과 체계적인 제작 시스템을 바탕으로 여러분의 든든한 웹툰 제작 파트너가 되고자 합니다.",
          ]}
          imgSrc="/images/marketoon.png"
        />
      </div>
    </Wrapper>
  );
}
