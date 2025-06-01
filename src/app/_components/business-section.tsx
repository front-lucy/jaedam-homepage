import { Text } from "@/components/atom/text";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const StyledBusinessContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
`;

const CardContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const StyledRandomCard = styled(motion.div)`
  width: 80px;
  height: 120px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  font-size: 12px;
  color: #666;
`;

interface BusinessSectionProps {
  step: number;
}

interface CardPosition {
  initial: { x: number; y: number };
  center: { x: number; y: number };
  final: { x: number; y: number };
}

// 카드들의 초기 위치와 최종 위치를 정의
const generateCardPositions = () => {
  const positions = [];
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
  
  for (let i = 0; i < 10; i++) {
    // 초기 위치 (뷰포트 가장자리)
    const initialX = Math.random() * (viewportWidth - 80);
    const initialY = Math.random() * (viewportHeight - 120);
    
    // 최종 위치 (조금 더 분산된 위치)
    const finalX = Math.random() * (viewportWidth - 80);
    const finalY = Math.random() * (viewportHeight - 120);
    
    positions.push({
      initial: { x: initialX, y: initialY },
      center: { x: viewportWidth / 2 - 40, y: viewportHeight / 2 - 60 },
      final: { x: finalX, y: finalY }
    });
  }
  
  return positions;
};

export const BusinessSection = ({ step }: BusinessSectionProps) => {
  const [cardPositions, setCardPositions] = useState(generateCardPositions());

  useEffect(() => {
    const handleResize = () => {
      setCardPositions(generateCardPositions());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cardVariants = {
    initial: (custom: CardPosition) => ({
      x: custom.initial.x,
      y: custom.initial.y,
      scale: 0.8,
      opacity: 0,
    }),
    spread: (custom: CardPosition) => ({
      x: custom.final.x,
      y: custom.final.y,
      scale: 1,
      opacity: 0.9,
      transition: {
        duration: 1.5,
        ease: "easeOut",
        delay: Math.random() * 0.2,
      }
    }),
    bounce: (custom: CardPosition) => ({
      x: custom.final.x,
      y: custom.final.y,
      scale: [1, 1.1, 0.95, 1.05, 1],
      opacity: 0.9,
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop" as const,
        delay: Math.random() * 0.5,
      }
    })
  };

  const [animationState, setAnimationState] = useState<'initial' | 'spread' | 'bounce'>('initial');

  useEffect(() => {
    if (step === 1) {
      // 애니메이션 시퀀스 시작
      setAnimationState('spread');
      
      const timer = setTimeout(() => {
        setAnimationState('bounce');
      }, 2000);
      
      return () => {
        clearTimeout(timer);
      };
    } else {
      setAnimationState('initial');
    }
  }, [step]);

  return (
  <>
  {step === 0 && (
    
    <Container data-business-section>
      <AnimatePresence mode="wait">
        {step === 0 && (
          <StyledBusinessContent>
            <Text typography="display2-bold">BUSINESS</Text>
            <Text typography="headline2-regular" align="center">
              우리는 즐거움을 만들어요.
              <br />
              당신을 미소 짓게 하기 위해
            </Text>
          </StyledBusinessContent>
        )}
      </AnimatePresence>
    </Container>
  )}

  {step === 1 && (
    <>
          <StyledBusinessContent>
            <Text typography="display2-bold">BUSINESS</Text>
            <Text typography="headline2-regular" align="center">
              우리는 즐거움을 만들어요.
              <br />
              당신을 미소 짓게 하기 위해
            </Text>
          </StyledBusinessContent>
    
    <CardContainer>
      {cardPositions.map((position, index) => (
        <StyledRandomCard
          key={index}
          custom={position}
          variants={cardVariants}
          initial="initial"
          animate={animationState}
        >
          카드 {index + 1}
        </StyledRandomCard>
      ))}
    </CardContainer>
  </>
  )}
  </>
  );
};