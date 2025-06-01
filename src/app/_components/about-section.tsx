'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import styled from '@emotion/styled';

interface AboutSectionProps {
  className?: string;
}

const Section = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
`;

const Container = styled(motion.div)`
  max-width: 64rem;
  margin: 0 auto;
  padding: 0 1.5rem;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  
  @media (min-width: 768px) {
    font-size: 3.5rem;
  }
`;

const Description = styled.p`
  font-size: 1.25rem;
  margin-bottom: 3rem;
  opacity: 0.9;
  max-width: 48rem;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 3rem;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: #fff;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  opacity: 0.8;
`;

export function AboutSection({ className }: AboutSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    amount: 0.2,
    margin: "-50px"
  });

  const pageVariants = {
    hidden: { 
      y: 100, 
      opacity: 0 
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 15,
        duration: 1.2,
      },
    },
  };

  const stats = [
    { number: "5+", label: "년의 경험" },
    { number: "100+", label: "프로젝트 완료" },
    { number: "50+", label: "만족한 고객" },
    { number: "24/7", label: "고객 지원" }
  ];

  return (
    <Section 
      ref={ref}
      className={className}
    >
      <Container
        variants={pageVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <Title>
          신뢰할 수 있는 파트너
        </Title>
        
        <Description>
          우리는 고객의 성공을 위해 끊임없이 노력하는 전문가 팀입니다.
          다년간의 경험과 전문성을 바탕으로 최고의 결과를 제공합니다.
        </Description>

        <StatsGrid>
          {stats.map((stat, index) => (
            <StatCard key={index}>
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsGrid>
      </Container>
    </Section>
  );
} 