import { Text } from '@/components/atom/text';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from '@/tokens';

const Container = styled.div`
  width: 100%;
  height: 100dvh;
  overflow: hidden;
  position: relative;
  background-color: ${colors.white};
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
  top: 50%;
  left: 50%;
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
  x: number;
  y: number;
}

// 카드들의 특정 위치를 정의
const generateCardPositions = () => {
  const positions = [];
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800;

  // 특정 위치들을 미리 정의 (그리드 형태로 배치)
  const gridCols = 5;
  const gridRows = 2;
  const cardWidth = 80;
  const cardHeight = 120;

  const startX = (viewportWidth - (gridCols * cardWidth + (gridCols - 1) * 40)) / 2;
  const startY = (viewportHeight - (gridRows * cardHeight + (gridRows - 1) * 40)) / 2 + 100;

  for (let i = 0; i < 10; i++) {
    const col = i % gridCols;
    const row = Math.floor(i / gridCols);

    const x = startX + col * (cardWidth + 40);
    const y = startY + row * (cardHeight + 40);

    positions.push({
      x,
      y,
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
      x: custom.x,
      y: custom.y,
      scale: 0,
      opacity: 0,
    }),
    bounce: (custom: CardPosition) => ({
      x: custom.x,
      y: custom.y,
      scale: [0, 1.2, 0.9, 1.1, 1],
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        delay: Math.random() * 0.3,
        repeat: Infinity,
        repeatDelay: 1.5,
        repeatType: 'loop' as const,
      },
    }),
  };

  const [animationState, setAnimationState] = useState<'initial' | 'bounce'>('initial');

  useEffect(() => {
    if (step === 1) {
      // 바로 바운스 시작
      setAnimationState('bounce');
    } else {
      setAnimationState('initial');
    }
  }, [step]);

  return (
    <>
      {step === 0 && (
        <Container data-business-section>
          <AnimatePresence mode='wait'>
            {step === 0 && (
              <StyledBusinessContent>
                <Text typography='display2-bold'>BUSINESS</Text>
                <Text
                  typography='headline2-regular'
                  align='center'
                >
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
            <Text typography='display2-bold'>BUSINESS</Text>
            <Text
              typography='headline2-regular'
              align='center'
            >
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
                initial='initial'
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
