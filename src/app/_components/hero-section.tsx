'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import styled from '@emotion/styled';

interface HeroSectionProps {
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

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  
  @media (min-width: 768px) {
    font-size: 4.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  max-width: 48rem;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-direction: column;
  
  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

const Button = styled(motion.button)<{ variant?: 'primary' | 'secondary' }>`
  padding: 1rem 2rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 1.125rem;
  border: 2px solid ${props => props.variant === 'secondary' ? 'white' : 'transparent'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  background: ${props => props.variant === 'secondary' ? 'transparent' : 'rgba(255, 255, 255, 0.2)'};
  color: white;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: ${props => props.variant === 'secondary' ? 'white' : 'rgba(255, 255, 255, 0.3)'};
    color: ${props => props.variant === 'secondary' ? '#667eea' : 'white'};
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
`;

export function HeroSection({ className }: HeroSectionProps) {
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
          혁신적인 솔루션으로<br />
          미래를 설계합니다
        </Title>
        
        <Subtitle>
          최첨단 기술과 창의적인 아이디어로 고객의 비즈니스 성장을 이끄는
          신뢰할 수 있는 파트너가 되겠습니다.
        </Subtitle>

        <ButtonGroup>
          <Button
            whileHover={{ 
              scale: 1.05,
              transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            시작하기
          </Button>
          
          <Button
            variant="secondary"
            whileHover={{ 
              scale: 1.05,
              transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            더 알아보기
          </Button>
        </ButtonGroup>
      </Container>
    </Section>
  );
} 