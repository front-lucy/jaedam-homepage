'use client';

import styled from '@emotion/styled';
import { DeviceType, useDeviceType } from '@/hooks/useDeviceType';
import { css } from '@emotion/react';
import { Text } from '@/components/atom/text';
import { colors, spacing } from '@/tokens';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { type CarouselItem } from '@/app/_components/carousel/carousel';

interface CareerCarouselProps {
  items: CarouselItem[];
}

const carouselVariant = {
  desktop: {
    itemWidth: 508,
    slidesPerView: 3,
    gap: 16,
    get containerWidth() {
      return this.itemWidth * this.slidesPerView + this.gap * (this.slidesPerView - 1);
    },
  },
  tablet: {
    itemWidth: 508,
    slidesPerView: 2,
    gap: 16,
    get containerWidth() {
      return '100vw';
    },
  },
  mobile: {
    itemWidth: '100vw' as const,
    slidesPerView: 1,
    gap: 16,
    containerWidth: '100vw' as const,
  },
};

export const CareerCarousel = ({ items }: CareerCarouselProps) => {
  const device = useDeviceType();
  const variant = carouselVariant[device];

  const [carouselActiveIndex, setCarouselActiveIndex] = useState(0);
  const [virtualIndex, setVirtualIndex] = useState(3);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const virtualItems = useMemo(() => {
    const itemsCount = items.length;
    const virtualItems = [];

    for (let i = itemsCount - 3; i < itemsCount; i++) {
      virtualItems.push({ ...items[i], virtualId: `prev-${i}` });
    }

    items.forEach((item, index) => {
      virtualItems.push({ ...item, virtualId: `main-${index}` });
    });

    for (let i = 0; i < 3; i++) {
      virtualItems.push({ ...items[i], virtualId: `next-${i}` });
    }

    return virtualItems;
  }, [items]);

  const handleCarouselNext = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setVirtualIndex(prev => prev + 1);
    setCarouselActiveIndex(prev => (prev + 1) % items.length);
  };

  const handleCarouselPrev = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setVirtualIndex(prev => prev - 1);
    setCarouselActiveIndex(prev => (prev - 1 + items.length) % items.length);
  };

  // 가상 인덱스가 범위를 벗어나면 리셋
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);

      // 오른쪽 끝에 도달했을 때 리셋
      if (virtualIndex >= items.length + 3) {
        setVirtualIndex(3 + carouselActiveIndex);
      }
      // 왼쪽 끝에 도달했을 때 리셋
      else if (virtualIndex < 3) {
        setVirtualIndex(3 + carouselActiveIndex);
      }
    }, 300); // 애니메이션 시간과 맞춤

    return () => clearTimeout(timer);
  }, [virtualIndex, carouselActiveIndex, items.length]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = (x - startX) * 2;
    const threshold = 50;

    if (Math.abs(walk) > threshold) {
      if (walk > 0) {
        handleCarouselPrev();
      } else {
        handleCarouselNext();
      }
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 터치 이벤트 핸들러
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.touches[0].pageX;
    const walk = (x - startX) * 2;
    const threshold = 50;

    if (Math.abs(walk) > threshold) {
      if (walk > 0) {
        handleCarouselPrev();
      } else {
        handleCarouselNext();
      }
      setIsDragging(false);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // 이동 거리 계산
  const getTranslateX = () => {
    if (device === 'mobile') {
      const gap = variant.gap;
      return `calc(-${virtualIndex * 100}vw - ${virtualIndex * gap}px)`;
    }
    
    if (device === 'tablet') {
      const itemWidth = variant.itemWidth as number;
      const gap = variant.gap;
      return `calc(-${virtualIndex * (itemWidth + gap)}px + 50vw - ${itemWidth / 2}px)`;
    }
    
    // desktop
    const itemWidth = variant.itemWidth as number;
    const gap = variant.gap;
    const containerWidth = variant.containerWidth as number;
    
    return `calc(-${virtualIndex * (itemWidth + gap)}px + ${containerWidth / 2 - itemWidth / 2}px)`;
  };

  return (
    <CarouselContainer device={device} variant={variant}>
      <CarouselViewport device={device} variant={variant}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <CarouselWrapper
          device={device}
          variant={variant}
          animate={{
            x: getTranslateX(),
          }}
          transition={{
            type: isTransitioning ? 'spring' : 'none',
            stiffness: 300,
            damping: 30,
            duration: isTransitioning ? 0.3 : 0,
          }}
        >
          {virtualItems.map((item, index) => {
            const distance = Math.abs(index - virtualIndex);
            const opacity = distance === 0 ? 1 : 0.3;

            return (
              <CarouselItem
                key={item.virtualId}
                device={device}
                variant={variant}
                style={{ opacity }}
                onClick={() => {
                  if (!isTransitioning) {
                    setIsTransitioning(true);
                    setVirtualIndex(index);
                    
                    // 가상 인덱스에서 실제 아이템 인덱스 계산
                    let realIndex = index - 3;
                    if (realIndex < 0) {
                      // 앞쪽 복사본의 경우
                      realIndex = items.length + realIndex;
                    } else if (realIndex >= items.length) {
                      // 뒤쪽 복사본의 경우
                      realIndex = realIndex - items.length;
                    }
                    setCarouselActiveIndex(realIndex);
                  }
                }}
                backgroundUrl={item.backgroundUrl}
              />
            );
          })}
        </CarouselWrapper>
      </CarouselViewport>

      <CarouselControls>
        <button
          className='carousel-button prev'
          onClick={handleCarouselPrev}
          aria-label='이전 슬라이드'
          disabled={isTransitioning}
        >
          <svg
            width='12'
            height='12'
            viewBox='0 0 12 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M7.93998 1.71382L3.17793 5.99966L7.93998 10.2855L7.29755 10.9993L2.13893 6.35657C2.03776 6.26551 1.97998 6.13578 1.97998 5.99966C1.97998 5.86354 2.03776 5.73381 2.13893 5.64275L7.29755 1L7.93998 1.71382Z'
              fill='#111111'
            />
          </svg>
        </button>
        <Text
          typography='body-medium'
          align='center'
          style={{
            display: 'inline-block',
            width: '84px',
          }}
        >
          {carouselActiveIndex + 1}/{items.length}
        </Text>
        <button
          className='carousel-button next'
          onClick={handleCarouselNext}
          aria-label='다음 슬라이드'
          disabled={isTransitioning}
        >
          <svg
            width='12'
            height='12'
            viewBox='0 0 12 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M4.06002 1.71382L8.82207 5.99966L4.06002 10.2855L4.70245 10.9993L9.86107 6.35657C9.96224 6.26551 10.02 6.13578 10.02 5.99966C10.02 5.86354 9.96224 5.73381 9.86107 5.64275L4.70245 1L4.06002 1.71382Z'
              fill='#111111'
            />
          </svg>
        </button>
      </CarouselControls>
    </CarouselContainer>
  );
};

type VariantType = typeof carouselVariant[DeviceType];

const CarouselContainer = styled.div<{ device: DeviceType; variant: VariantType }>`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${spacing['5XL']};
  margin: 0 auto;
  user-select: none;

  ${({ device, variant }) =>
    device === 'desktop' &&
    css`
      min-width: ${variant.containerWidth}px;
      max-width: ${variant.containerWidth}px;
    `}

  ${({ device }) =>
    (device === 'tablet' || device === 'mobile') &&
    css`
      width: 100vw;
      min-width: 100vw;
      max-width: 100vw;
    `}
`;

const CarouselViewport = styled.div<{ device: DeviceType; variant: VariantType }>`
  position: relative;
  width: 100%;
  height: 380px;
  overflow: hidden;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }

  ${({ device, variant }) =>
    device === 'desktop' &&
    css`
      width: ${variant.containerWidth}px;
    `}

  ${({ device }) =>
    (device === 'tablet' || device === 'mobile') &&
    css`
      width: 100vw;
    `}
`;

const CarouselWrapper = styled(motion.div)<{ device: DeviceType; variant: VariantType }>`
  display: flex;
  gap: ${({ variant }) => variant.gap}px;
  height: 380px;
  will-change: transform;

  ${({ device, variant }) =>
    device !== 'mobile' &&
    css`
      width: calc(${variant.itemWidth}px * 12 + ${variant.gap}px * 11);
    `}

  ${({ device }) =>
    device === 'mobile' &&
    css`
      width: calc(100vw * 12);
    `}
`;

const CarouselItem = styled.div<{ 
  device: DeviceType; 
  variant: VariantType; 
  backgroundUrl?: string;
}>`
  flex-shrink: 0;
  height: 380px;
  transition: opacity 0.3s ease;
  cursor: pointer;
  background-image: url(${({ backgroundUrl }) => backgroundUrl || 'none'});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  ${({ device, variant }) =>
    device !== 'mobile' &&
    css`
      width: ${variant.itemWidth}px;
    `}

  ${({ device }) =>
    device === 'mobile' &&
    css`
      width: 100vw;
    `}
`;

const CarouselControls = styled.div`  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;
  z-index: 2;
  gap: ${spacing['S']};

  .carousel-button {
    width: 26px;
    height: 26px;
    background: ${colors.white};
    border: 1px solid ${colors.gray200};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    pointer-events: all;
    transition: all 0.3s ease;
    color: ${colors.gray600};

    &:hover:not(:disabled) {
      background: ${colors.jaedamCyan};
      color: ${colors.white};
      border-color: ${colors.jaedamCyan};
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

