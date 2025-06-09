'use client';

import CheckIcon from '@/assets/icons/Icon-check-mark-sel.svg';
import { useDeviceType } from '@/hooks/useDeviceType';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

import {
  Category,
  Content,
  Description,
  Keyword,
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

import { businessWebtoonData, platformStatsData } from './data';

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
        delay: baseDelay + i * 0.1,
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

export default function BusinessPlatform() {
  const device = useDeviceType();

  return (
    <WebtoonWrapper>
      {/* ──────────── Hero Section ──────────── */}
      <IntroWrapper backgroundImage='https://s3.ap-northeast-2.amazonaws.com/shortz.net/public/jaedam-homepage/business_visual1.png'>
        <Content>
          <motion.div
            variants={simpleFadeUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.2 }}
          >
            <Title>PLATFORM</Title>
          </motion.div>

          <motion.div
            variants={simpleFadeUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.2 }}
          >
            <SubText>
              재담은 웹툰의 지형이 좀 더 넓어지길 희망합니다.
              {device !== 'mobile' && <br />}
              우리는 가능성 있는 신예 작가를 발굴하고 독창성 있는 기성 작가의 작품활동을 지원합니다.
              {device !== 'mobile' && <br />}
              그리고 좀 더 효율적인 작품 창작 환경을 구체화하고자
              {device !== 'mobile' && <br />}
              신예 작가 발굴 플랫폼, 중단편 웹툰 플랫폼, 기술 기반 창작 플랫폼을 운영합니다.
            </SubText>
          </motion.div>
        </Content>
        <Overlay />
      </IntroWrapper>

      {/* ──────────── Stats Section ──────────── */}
      <StatsWrapper>
        {platformStatsData.map(({ label, value, suffix }, index) => (
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
                  suffix={suffix || ''}
                />
                {suffix && <span>{suffix}</span>}
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
              <Keyword>
                <CheckIcon />
                {keyword}
              </Keyword>
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
