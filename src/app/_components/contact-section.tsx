'use client';

import { CSSProperties, useRef } from 'react';
import styled from '@emotion/styled';
import { colors, radius, shadow, spacing, TypographyType } from '@/tokens';
import Image from 'next/image';
import { DeviceType, useDeviceType } from '@/hooks/useDeviceType';
import { Text } from '@/components/atom/text';
import { css } from '@emotion/react';
import { cards } from '@/constants/contact-card-content';
import { motion } from 'framer-motion';

interface ContactSectionProps {
  className?: string;
}

const styleVariants: Record<
  DeviceType,
  Record<
    'container' | 'textarea' | 'card' | 'cardArea',
    CSSProperties & {
      titleTypography?: TypographyType;
      descriptionTypography?: TypographyType;
    }
  > & {}
> = {
  desktop: {
    container: {
      top: '200px',
      gap: '80px',
    },
    textarea: {
      gap: '40px',
      titleTypography: 'display2-black',
      descriptionTypography: 'headline2-regular',
    },
    cardArea: {
      gridTemplateColumns: 'repeat(4, 1fr)',
      gridTemplateRows: 'repeat(1, 1fr)',
      gap: '20px',
      padding: '0 20px',
    },
    card: {
      padding: spacing['2XL'],
      height: '360px',
      titleTypography: 'headline1-bold',
      descriptionTypography: 'title2-medium',
      width: '400px',
    },
  },
  tablet: {
    container: {
      top: '258px',
      gap: '48px',
    },
    textarea: {
      gap: '24px',
      titleTypography: 'display2-black',
      descriptionTypography: 'headline2-regular',
    },
    cardArea: {
      gridTemplateRows: 'repeat(2, 1fr)',
      gridTemplateColumns: 'repeat(2, 320px)',
      gap: '20px',
    },
    card: {
      padding: spacing['2XL'],
      height: '180px',
      titleTypography: 'headline3-bold',
      descriptionTypography: 'title3-medium',
      width: '320px',
    },
  },
  mobile: {
    container: {
      top: '100px',
      gap: '32px',
    },
    textarea: {
      gap: '16px',
      titleTypography: 'headline1-black',
      descriptionTypography: 'title2-regular',
    },
    cardArea: {
      gridTemplateColumns: 'repeat(1, 320px)',
      gridTemplateRows: 'repeat(4, 1fr)',
      gap: `${spacing['S']}`,
    },
    card: {
      padding: `${spacing['L']} ${spacing['XL']}`,
      height: '108px',
      titleTypography: 'title2-bold',
      descriptionTypography: 'caption1-medium',
      width: '320px',
    },
  },
};

export function ContactSection({ className }: ContactSectionProps) {
  const ref = useRef(null);
  const device = useDeviceType();

  return (
    <Wrapper
      ref={ref}
      className={className}
    >
      <Image
        src='/assets/images/home-contact-bg.png'
        alt='Contact Us'
        fill={true}
        style={{ objectFit: 'cover', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        priority={true}
      />

      <ContentArea device={device}>
        <div className='text-area'>
          <Text
            typography={styleVariants[device].textarea.titleTypography as TypographyType}
            color={'white'}
            align='center'
          >
            CONTACT
          </Text>
          <Text
            typography={styleVariants[device].textarea.descriptionTypography as TypographyType}
            color={'white'}
            align='center'
          >
            세상에 즐거움을 더하고 싶다면,
            <br />
            시작은 여기서.
          </Text>
        </div>

        <motion.div
          initial={{ 
            x: 0, 
            y: 0,
            opacity: 0
          }}
          animate={{ 
            x: 0, 
            y: 0,
            opacity: 1
          }}
          transition={{
            duration: 1.2,
            delay: 1,
          }}
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'start',
            position: 'relative',
            height: device === 'desktop' ? '360px' : device === 'tablet' ? '380px' : '460px', // 카드들이 퍼질 공간 확보
          }}
        >
          {cards.map((card, index) => {
            // 각 카드의 최종 위치 계산
            const getFinalPosition = () => {
              if (device === 'desktop') {
                // 4개 카드가 한 줄에 배치
                const cardWidth = 400 + 20;
                const totalWidth = cardWidth * 4 - 20;
                const startX = -totalWidth / 2 + 200; // 중앙 기준으로 시작점
                return { x: startX + index * cardWidth, y: 0 };
              } else if (device === 'tablet') {
                // 2x2 grid - 상단 기준으로 아래로 배치
                const cardWidth = 320 + 20;
                const cardHeight = 180 + 20;
                const col = index % 2;
                const row = Math.floor(index / 2);
                const startX = -cardWidth / 2 - 10; // 중앙 기준 x
                const startY = 0; // 상단 기준으로 시작
                return {
                  x: startX + col * cardWidth,
                  y: startY + row * cardHeight
                };
              } else {
                // mobile: 1열로 배치 - 상단 기준으로 아래로 배치
                const cardHeight = 108 + 8;
                const startY = 0; // 상단 기준으로 시작
                return { x: 0, y: startY + index * cardHeight };
              }
            };

            // 초기 위치 계산 (디바이스별로 다름)
            const getInitialPosition = () => {
              if (device === 'desktop') {
                return { x: 0, y: 0 }; // 중앙에서 시작
              } else {
                // tablet, mobile은 상단(y: 0)에서 시작
                return { x: 0, y: 0 }; 
              }
            };

            const finalPosition = getFinalPosition();
            const initialPosition = getInitialPosition();

            return (
              <motion.div
                className='card-container'
                key={index}
                initial={{ 
                  x: initialPosition.x,
                  y: initialPosition.y,
                  opacity: 1
                }}
                animate={{ 
                  x: finalPosition.x, // 각자의 최종 위치로 이동
                  y: finalPosition.y, // 각자의 최종 위치로 이동
                  opacity: 1
                }}
                transition={{
                  duration: 1,
                  delay: 2.15,
                  ease: [0.22, 1, 0.36, 1]
                }}
                style={{
                  backgroundColor: card.backgroundColor,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: radius.r400,
                  boxShadow: shadow.s300,
                  gap: spacing.M,
                  position: 'absolute', // 모든 카드를 겹치게 만들기
                  ...getCardInlineStyles(device),
                }}
              >
                <Text
                  style={{ whiteSpace: device === 'desktop' ? 'pre-line' : 'normal' }}
                  typography={styleVariants[device].card.titleTypography as TypographyType}
                >
                  {card.title}
                </Text>
                <Text
                  style={{ whiteSpace: 'pre-line' }}
                  typography={styleVariants[device].card.descriptionTypography as TypographyType}
                >
                  {card.description}
                </Text>
              </motion.div>
            );
          })}
        </motion.div>
      </ContentArea>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 0 24px;
  height: 100%;
  background-color: ${colors.white};

  @media (min-width: 800px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const getContainerStyles = (device: DeviceType) => {
  const { ...rest } = styleVariants[device].container;

  return css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    z-index: 1;
    position: absolute;
    
    ${rest};
  `;
}

const getTextAreaStyles = (device: DeviceType) => {
  const { gap } = styleVariants[device].textarea;

  return css`
    gap: ${gap};
  `;
};

const ContentArea = styled.div<{ device: DeviceType }>`
  ${({ device }) => getContainerStyles(device)}
  
  & .text-area {
    display: flex;
    flex-direction: column;

    ${({ device }) => getTextAreaStyles(device)};  
  }
`

function getCardInlineStyles(device: DeviceType) {
  const { padding, height, width } = styleVariants[device].card;
  return {
    padding,
    height,
    width,
  };
}
