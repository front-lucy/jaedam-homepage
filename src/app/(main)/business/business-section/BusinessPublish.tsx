'use client';

import { useDeviceType } from '@/hooks/useDeviceType';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

import {
  Category,
  Content,
  Description,
  Overlay,
  ProcessCol,
  ProcessItem,
  ProcessTitle,
  StatItem,
  StatLabel,
  StatValue,
  StatsWrapper,
  ContentWrapper as StyledContentWrapper,
  IntroWrapper as StyledIntroWrapper,
  SectionContainer as StyledSectionContainer,
  SubText,
  TextCol,
  Title,
  WebtoonWrapper,
} from './Business.style';

import { bookstatsData, businessWebtoonData } from './data';

// Motion 래핑
const IntroWrapper = motion(StyledIntroWrapper);
const ContentWrapper = motion(StyledContentWrapper);
const SectionContainer = motion(StyledSectionContainer);

// 애니메이션 variants
const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => {
    const baseDelay = 0.3;
    return {
      opacity: 1,
      y: 0,
      transition: {
        delay: baseDelay + i * 0.1, // 순차적으로 0.1초 간격
        duration: 0.3,
        ease: 'easeIn',
      },
    };
  },
};

const simpleFadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};

export default function BusinessWebtoon() {
  const device = useDeviceType();

  return (
    <WebtoonWrapper>
      {/* ──────────── Hero Section ──────────── */}
      <IntroWrapper backgroundImage='https://s3.ap-northeast-2.amazonaws.com/shortz.net/public/jaedam-homepage/business_visual2.png'>
        <Content>
          <motion.div
            variants={simpleFadeUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.2 }}
          >
            <Title>BOOKS</Title>
          </motion.div>

          <motion.div
            variants={simpleFadeUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.2 }}
          >
            <SubText>
              재담은 웹툰을 단행본으로 편집하여 출간하는 웹툰북,국내외 만화를 단행본으로 발행하는
              {device !== 'mobile' && <br />}
              코믹북, 모든 콘텐츠의 원안이 되는 장르소설과 웹 소설 그리고 이를 전자책으로
              {device !== 'mobile' && <br />}
              유통하는 사업을 전개하고 있습니다.
            </SubText>
          </motion.div>
        </Content>
        <Overlay />
      </IntroWrapper>

      {/* ──────────── Stats Section ──────────── */}
      <StatsWrapper>
        {bookstatsData.map(({ label, value }, index) => (
          <motion.div
            key={label}
            variants={fadeUpVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.3 }}
            custom={index}
          >
            <StatItem>
              <StatValue>
                <CountUp
                  end={value}
                  duration={2}
                  start={0}
                  delay={0.2}
                  formattingFn={n => String(n)}
                />
              </StatValue>
              <StatLabel>{label}</StatLabel>
            </StatItem>
          </motion.div>
        ))}
      </StatsWrapper>

      {/* ──────────── Detail Section ──────────── */}
      <ContentWrapper
        variants={simpleFadeUp}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.2 }}
      >
        {businessWebtoonData.map(({ category, description, keyword, process }, index) => (
          <SectionContainer
            key={category}
            variants={fadeUpVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.2 }}
            custom={index}
          >
            <TextCol>
              <Category>{category}</Category>
              <Description as='div'>
                {description.split('\n').map((line, idx) => (
                  <div key={idx}>{line}</div>
                ))}
              </Description>
            </TextCol>

            <ProcessCol>
              <ProcessTitle>PROCESS</ProcessTitle>
              {process.map((step, idx) => (
                <ProcessItem key={idx}>
                  <span>{String(idx + 1).padStart(2, '0')}</span> {step}
                </ProcessItem>
              ))}
            </ProcessCol>
          </SectionContainer>
        ))}
      </ContentWrapper>
    </WebtoonWrapper>
  );
}
