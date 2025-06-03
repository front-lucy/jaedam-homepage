'use client';

import styled from '@emotion/styled';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface BestSectionProps {
  className?: string;
  onScrollNext?: () => void;
}

const Section = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
`;

const Container = styled(motion.div)`
  max-width: 64rem;
  margin: 0 auto;
  padding: 0 1.5rem;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 2rem;
  
  @media (min-width: 768px) {
    font-size: 3.75rem;
  }
`;

const Description = styled.p`
  font-size: 1.125rem;
  color: #475569;
  margin-bottom: 3rem;
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  
  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease;
  
  &:hover {
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }
`;

const IconContainer = styled.div`
  width: 4rem;
  height: 4rem;
  background: linear-gradient(135deg, #3b82f6 0%, #9333ea 100%);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
`;

const Icon = styled.span`
  font-size: 1.5rem;
  color: white;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
`;

const CardDescription = styled.p`
  color: #475569;
  line-height: 1.6;
`;

const ButtonContainer = styled.div`
  margin-top: 3rem;
`;

const Button = styled(motion.button)`
  background: linear-gradient(90deg, #2563eb 0%, #9333ea 100%);
  color: white;
  padding: 1rem 2rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 1.125rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease;
  
  &:hover {
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }
`;

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

export function BestSection({ className }: BestSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    amount: 0.2,
    margin: "-50px"
  });


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
          Best Solutions
        </Title>
        
        <Description>
          우리는 최고의 솔루션을 제공하여 고객의 비즈니스 성장을 돕습니다.
          혁신적인 기술과 창의적인 아이디어로 미래를 만들어갑니다.
        </Description>

        <Grid>
          {bestFeatures.map((feature, index) => (
            <Card key={index}>
              <IconContainer>
                <Icon>{feature.icon}</Icon>
              </IconContainer>
              
              <CardTitle>
                {feature.title}
              </CardTitle>
              
              <CardDescription>
                {feature.description}
              </CardDescription>
            </Card>
          ))}
        </Grid>

        <ButtonContainer>
          <Button
            whileHover={{ 
              scale: 1.05,
              transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            더 알아보기
          </Button>
        </ButtonContainer>
      </Container>
    </Section>
  );
}

const bestFeatures = [
  {
    icon: "🚀",
    title: "빠른 개발",
    description: "최신 기술 스택을 활용하여 빠르고 효율적인 개발을 제공합니다."
  },
  {
    icon: "💡",
    title: "혁신적 아이디어",
    description: "창의적이고 혁신적인 솔루션으로 차별화된 가치를 제공합니다."
  },
  {
    icon: "🎯",
    title: "목표 달성",
    description: "고객의 비즈니스 목표를 정확히 파악하고 달성할 수 있도록 지원합니다."
  }
];
