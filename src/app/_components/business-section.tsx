import { Text } from '@/components/atom/text';
import { DeviceType, useDeviceType } from '@/hooks/useDeviceType';
import { useWindowSize } from '@/hooks/useWindowSize';
import { TypographyType, colors, radius } from '@/tokens';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { CSSProperties } from 'react';

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
  background-color: ${colors.white};
`;

const CardContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const StyledRandomCard = styled(motion.div)<{
  width?: number;
  height?: number;
  index: number;
}>`
  width: ${({ width }) => (width ? `${width}px` : '136px')};
  height: ${({ height }) => (height ? `${height}px` : '136px')};
  border-radius: ${radius.r500};
  background-color: transparent;
  box-shadow: 10px 10px 40px 0px #0000001a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  font-size: 12px;
  color: #666;
  background-image: ${({ index }) => `url('/assets/images/main-business-thmb${index + 1}.png')`};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

interface BusinessSectionProps {
  step: number;
}

interface CardPosition {
  x: number;
  y: number;
}

const itemPosition = {
  desktop: [
    {
      x: 0.2552, // 490
      y: 0.0778, // 84
      width: 136,
      height: 136,
    },
    {
      x: 0.1146, // 220
      y: 0.1722, // 186
      width: 252,
      height: 360,
    },
    {
      x: 0.1797, // 345
      y: 0.5741, // 620
      width: 252,
      height: 360,
    },
    {
      x: 0.6276, // 1205
      y: 0.6389, // 690
      width: 138,
      height: 92,
    },
    {
      x: 0.6823, // 1310
      y: 0.7537, //
      width: 136,
      height: 136,
    },
    {
      x: 0.7698, // 1478
      y: 0.4241, // 458
      width: 252,
      height: 360,
    },
    {
      x: 0.6875, // 1320
      y: 0.1111, // 120
      width: 252,
      height: 360,
    },
  ],
  tablet: [
    {
      x: 0.325, // 260/800
      y: 0.0739, // 60/812
      width: 86,
      height: 86,
    },
    {
      x: -0.01375, // -11/800
      y: 0.1502, // 122/812
      width: 160,
      height: 227,
    },
    {
      x: 0.105, // 84/800
      y: 0.7401, // 601/812
      width: 160,
      height: 227,
    },
    {
      x: 0.53375, // 427/800
      y: 0.6613, // 537/812
      width: 86,
      height: 58,
    },
    {
      x: 0.5925, // 474/800
      y: 0.7143, // 580/812
      width: 86,
      height: 86,
    },
    {
      x: 0.835, // 668/800
      y: 0.649, // 527/812
      width: 160,
      height: 227,
    },
    {
      x: 0.7825, // 626/800
      y: 0.2228, // 181/812
      width: 160,
      height: 227,
    },
  ],
  mobile: [
    {
      x: 0.352, // 132/375
      y: 0.0394, // 32/812
      width: 67,
      height: 67,
    },
    {
      x: 0.0453, // 17/375
      y: 0.1502, // 122/812
      width: 124,
      height: 176,
    },
    {
      x: -0.048, // -18/375
      y: 0.7216, // 586/812
      width: 124,
      height: 176,
    },
    {
      x: 0.2, // 75/375
      y: 0.6244, // 507/812
      width: 67,
      height: 45,
    },
    {
      x: 0.3147, // 118/375
      y: 0.681, // 553/812
      width: 67,
      height: 67,
    },
    {
      x: 0.6187, // 232/375
      y: 0.6478, // 526/812
      width: 124,
      height: 176,
    },
    {
      x: 0.7067, // 265/375
      y: 0.0382, // 31/812
      width: 124,
      height: 176,
    },
  ],
};

const styleVariants: Record<
  DeviceType,
  Record<'contents', CSSProperties & { titleTypography: TypographyType; descriptionTypography: TypographyType }>
> = {
  desktop: {
    contents: {
      titleTypography: 'display2-black',
      descriptionTypography: 'headline2-regular',
    },
  },
  tablet: {
    contents: {
      titleTypography: 'display2-black',
      descriptionTypography: 'title1-regular',
    },
  },
  mobile: {
    contents: {
      titleTypography: 'headline1-black',
      descriptionTypography: 'title3-regular',
    },
  },
};

export const BusinessSection = ({ step }: BusinessSectionProps) => {
  const device = useDeviceType();
  const windowSize = useWindowSize();

  const cardVariants = {
    initial: (custom: CardPosition) => ({
      x: custom.x * windowSize.width,
      y: custom.y * windowSize.height,
      opacity: 0,
    }),
    bounce: (custom: CardPosition) => ({
      x: custom.x * windowSize.width,
      y: [
        custom.y * windowSize.height,
        custom.y * windowSize.height - 20, // 위로 20px
        custom.y * windowSize.height,
        custom.y * windowSize.height - 10, // 작은 bounce
        custom.y * windowSize.height,
      ],
      opacity: 1,
      transition: {
        x: {
          duration: 0.5,
          ease: 'easeOut',
        },
        y: {
          duration: 2 + Math.random() * 1, // 2-3초 랜덤 duration
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'loop' as const,
          delay: Math.random() * 2, // 0-2초 랜덤 딜레이
        },
        opacity: {
          duration: 0.5,
          ease: 'easeOut',
        },
      },
    }),
  };

  return (
    <>
      {step === 0 && (
        <Container data-business-section>
          <AnimatePresence mode='wait'>
            {step === 0 && (
              <StyledBusinessContent>
                <Text typography={styleVariants[device].contents.titleTypography}>BUSINESS</Text>
                <Text
                  typography={styleVariants[device].contents.descriptionTypography}
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
            <Text typography={styleVariants[device].contents.titleTypography}>BUSINESS</Text>
            <Text
              typography={styleVariants[device].contents.descriptionTypography}
              align='center'
            >
              우리는 즐거움을 만들어요.
              <br />
              당신을 미소 짓게 하기 위해
            </Text>
          </StyledBusinessContent>

          <CardContainer>
            {itemPosition[device].map((position, index) => (
              <StyledRandomCard
                key={index}
                custom={position}
                variants={cardVariants}
                initial='initial'
                animate={'bounce'}
                width={position.width}
                height={position.height}
                index={index}
              />
            ))}
          </CardContainer>
        </>
      )}
    </>
  );
};
