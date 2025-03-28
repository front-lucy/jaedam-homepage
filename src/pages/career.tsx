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

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const videoRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: videoRef,
    offset: ["start end", "end start"],
  });

  const videoWidth = useTransform(scrollYProgress, [0, 1], ["100vw", "50%"]);
  const videoHeight = useTransform(scrollYProgress, [0, 1], ["100vh", "50%"]);

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
          height: videoHeight,
          maxWidth: "100%",
          maxHeight: "100%",
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
      <img
        src="/images/career.png"
        alt="mission"
        style={{ maxWidth: "1200px" }}
      />
      <img
        src="/images/about2.png"
        alt="mission"
        style={{ maxWidth: "1200px", margin: "160px auto 0" }}
      />
      <img
        src="/images/recruitId.png"
        alt="mission"
        style={{ maxWidth: "1200px", margin: "160px auto 0" }}
      />
    </Wrapper>
  );
}
