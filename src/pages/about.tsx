/** @jsxImportSource @emotion/react */
import Header from "@/components/Header";
import styled from "@emotion/styled";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import CountUp from "react-countup";
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

const Section = styled.section`
  max-width: 960px;
  padding: 80px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: #333;
`;

const SectionTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: #00c1d4;
`;

const Paragraph = styled.p`
  font-size: 16px;
  line-height: 1.9;
`;

const TimelineWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const YearBlock = styled.div`
  position: relative;
  padding-left: 24px;

  &::before {
    content: "";
    position: absolute;
    left: 6px;
    top: 5px;
    width: 12px;
    height: 12px;
    background-color: #00c1d4;
    border-radius: 50%;
  }

  &::after {
    content: "";
    position: absolute;
    left: 11px;
    top: 25px;
    width: 2px;
    height: calc(100% - 25px);
    background-color: #ccc;
  }

  &:last-of-type::after {
    display: none;
  }
`;

const YearTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #00c1d4;
  margin-bottom: 10px;
`;

const Item = styled.li`
  font-size: 15px;
  color: #444;
  line-height: 1.8;
`;

interface TimelineData {
  year: string;
  items: string[];
}

const historyData: TimelineData[] = [
  {
    year: "2013.03",
    items: ["\uC8FC\uC7AC\uB2E8\uBBF8\uB514\uC5B4 \uC124\uB9BD"],
  },
  {
    year: "2014",
    items: [
      "<\uD30C\uB3D9>, \uAD6D\uB0B4 \uCD5C\uCD08 \uD55C\uC911\uC77C \uB3D9\uC2DC\uC5F0\uC7AC",
      "<\uD30C\uB3D9>, \uB300\uD55C\uBBFC\uAD6D\uCF58\uD150\uCE20\uB300\uC0C1 '문\uCC99\uBD80\uC7A5\uAD00\uC0C1' \uC218\uC0C1",
      "NCSOFT 1\uCC28 \uD22C\uC790 \uC720\uCE58",
    ],
  },
  {
    year: "2017",
    items: [
      "<\uC6B0\uD22C\uB9AC>, 2016 SPP \uC6F9\uD230 \uC5B4\uC6CC\uB4DC '대\uC0C1' \uC218\uC0C1",
      "\uCD94\uACC4\uC7AC\uB2E8 \uC6F9\uD230\uC544\uCE74\uB370\uBBF8 \uC2E0\uC124 (\uCD94\uACC4\uC608\uB300 x \uC7AC\uB2E8)",
      "NCSOFT 2\uCC28 \uD22C\uC790 \uC720\uCE58",
    ],
  },
  {
    year: "2019",
    items: [
      "\uC778\uB3C4 \uC6F9\uD230 \uD50C\uB7AB\uD3FC '크\uB85C\uC2A4\uCF54\uBBF8\uC2A4' \uCD9C\uC790",
      "\uB300\uD55C\uBBFC\uAD6D \uCF58\uD150\uCE20\uB300\uC0C1 \uD574\uC678\uC9C0\uCD9C \uC720\uACF5 \uBD80\uBB38 '국\uBB34\uCD1D\uB9AC\uC0C1' \uC218\uC0C1",
    ],
  },
  {
    year: "2020",
    items: [
      "\uCE90\uB9AD\uD130\uC0AC\uC5C5 \uC790\uD1F4\uC0AC \uC8FC\uC7AC\uB2E8\uBBF8\uB514\uC5B4 \uC124\uB9BD",
      "\uC8FC\uC7AC\uB4DC\uC720\uCEF4 \uCD9C\uC790",
    ],
  },
  {
    year: "2021",
    items: [
      "// \uC5F0\uD5A5 \uC774\uC5B4\uC9C4 \uB0B4\uC6A9 \uC791\uC131 \uAC00\uB2A5",
    ],
  },
];

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const videoRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: videoRef,
    offset: ["start end", "end start"],
  });
  const videoWidth = useTransform(scrollYProgress, [0, 1], ["100%", "50%"]);

  return (
    <Wrapper>
      <Header background="" color="#000" hoverColor="#00c1d4" />

      <div
        style={{
          margin: "80px 0 80px",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "64px",
          lineHeight: "70.4px",
          color: "rgb(17 17 17)",
        }}
      >
        To inspire people
        <br /> all over the world with story-oriented
        <br /> entertainment services
      </div>

      <motion.video
        ref={videoRef}
        src="/images/20240808_Vision.mp4"
        autoPlay
        loop
        muted
        style={{
          width: videoWidth,
          maxWidth: "100%",
          margin: "0 auto",
          display: "block",
          borderRadius: "16px",
        }}
      />

      <ContentWrapper ref={ref}>
        <Mission>
          To provide opportunities
          <br /> for everyone to create their own stories
          <br /> and share them with others.
        </Mission>
        <StatsWrapper>
          <StatBox>
            {inView && (
              <CountUp end={2450} duration={2} separator="," suffix="+" />
            )}
            <StatLabel>Total Creators</StatLabel>
          </StatBox>
          <StatBox>
            {inView && <CountUp end={5000} duration={2.5} separator="," />}
            <StatLabel>Total Readers</StatLabel>
          </StatBox>
          <StatBox>
            {inView && <CountUp end={900} duration={1.5} suffix="+" />}
            <StatLabel>Adapted Stories</StatLabel>
          </StatBox>
        </StatsWrapper>
      </ContentWrapper>

      <Section>
        <SectionTitle>미션 & 비전</SectionTitle>
        <Paragraph>
          만화는 재미있어야 한다! 그것이 개그 만화든, 공포든, 학원액션이든,
          순정이든, 드라마든!
        </Paragraph>
        <Paragraph>
          모두가 Fun 하게 즐길 수 있는 콘텐츠를 만들고 누구나 Joy 할 수 있는
          콘텐츠를 향유하는 것, 바로 재담이 추구하는 바입니다. 재담은 가장
          강력한 매체 파워를 지닌 만화(웹툰)를 제작·유통함과 동시에 다양한
          부가판권 사업을 전개하고 미디어 믹스를 통한 IP 확장을 시도하고
          있습니다. 이를 통해 나날이 커져가는 글로벌 만화 시장 속에서 대한민국의
          ‘만화(MANHWA)’ 브랜드를 구축하고 만화 산업을 선도해가겠습니다.
        </Paragraph>
        <img
          src="/images/funandjoy.jpg"
          alt="mission"
          style={{
            width: "800px",
            height: "auto",
            objectFit: "cover",
            marginTop: "75px",
          }}
        />
      </Section>

      <TimelineWrapper>
        {historyData.map(({ year, items }) => (
          <YearBlock key={year}>
            <YearTitle>{year}</YearTitle>
            <ul>
              {items.map((text, idx) => (
                <Item key={idx}>{text}</Item>
              ))}
            </ul>
          </YearBlock>
        ))}
      </TimelineWrapper>
    </Wrapper>
  );
}
