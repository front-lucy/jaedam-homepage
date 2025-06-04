'use client';

import styled from '@emotion/styled';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

interface CarouselItem {
  backgroundUrl: string;
  id?: string | number;
}

interface CarouselProps {
  items: CarouselItem[];
  activeIndex: number;
  onItemClick: (index: number) => void;
  itemWidth?: number;
  itemHeight?: number;
  gap?: number;
  visibleItems?: number;
}

const CarouselContainer = styled.div<{ containerWidth: number }>`
  width: ${props => props.containerWidth}px;
  overflow: hidden;
  position: relative;
`;

const CarouselTrack = styled.div<{ translateX: number; isTransitioning: boolean }>`
  display: flex;
  gap: 12px;
  transform: translateX(${props => props.translateX}px);
  transition: ${props => (props.isTransitioning ? 'transform 0.3s ease' : 'none')};
  will-change: transform;
`;

const CarouselItem = styled.div<{ width: number; height: number }>`
  flex-shrink: 0;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;

const SlideImage = styled(Image, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>`
  border-radius: 8px;
  border: ${props => (props.isActive ? '3px solid #22D4DD' : '3px solid transparent')};
  transition: border-color 0.3s ease;
  cursor: pointer;
  object-fit: cover;

  &:hover {
    border-color: ${props => (props.isActive ? '#22D4DD' : 'rgba(255, 255, 255, 0.5)')};
  }
`;

export function Carousel({
  items,
  activeIndex,
  onItemClick,
  itemWidth = 148,
  itemHeight = 86,
  gap = 12,
  visibleItems = 5,
}: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const totalItemWidth = itemWidth + gap;
  const containerWidth = visibleItems * itemWidth + (visibleItems - 1) * gap;
  const shouldMoveToLeft = items.length > visibleItems;

  // 현재 활성 아이템을 가장 왼쪽에 위치시키는 함수 (아이템이 visibleItems보다 많을 때만)
  const updatePosition = useCallback(() => {
    if (!shouldMoveToLeft) {
      // 아이템이 적으면 중앙 정렬하거나 그대로 둠
      setTranslateX(0);
      return;
    }

    const maxTranslateX = -(items.length - visibleItems) * totalItemWidth;
    let targetPosition = -(activeIndex * totalItemWidth);
    
    // 경계값 제한 (마지막 visibleItems개가 보이도록)
    if (targetPosition < maxTranslateX) {
      targetPosition = maxTranslateX;
    }
    
    setIsTransitioning(true);
    setTranslateX(targetPosition);
    
    // 트랜지션 완료 후 상태 업데이트
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  }, [activeIndex, totalItemWidth, items.length, visibleItems, shouldMoveToLeft]);

  // activeIndex 변경 시 위치 업데이트
  useEffect(() => {
    updatePosition();
  }, [updatePosition]);

  // 초기 위치 설정
  useEffect(() => {
    if (!shouldMoveToLeft) {
      setTranslateX(0);
    } else {
      const maxTranslateX = -(items.length - visibleItems) * totalItemWidth;
      let initialPosition = -(activeIndex * totalItemWidth);
      if (initialPosition < maxTranslateX) {
        initialPosition = maxTranslateX;
      }
      setTranslateX(initialPosition);
    }
  }, []);

  // 리사이즈 시 위치 재계산
  useEffect(() => {
    const handleResize = () => {
      if (!shouldMoveToLeft) {
        setTranslateX(0);
      } else {
        const maxTranslateX = -(items.length - visibleItems) * totalItemWidth;
        let position = -(activeIndex * totalItemWidth);
        if (position < maxTranslateX) {
          position = maxTranslateX;
        }
        setTranslateX(position);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeIndex, totalItemWidth, items.length, visibleItems, shouldMoveToLeft]);

  return (
    <CarouselContainer containerWidth={containerWidth}>
      <CarouselTrack
        ref={trackRef}
        translateX={translateX}
        isTransitioning={isTransitioning}
      >
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          
          return (
            <CarouselItem
              key={item.id || index}
              width={itemWidth}
              height={itemHeight}
            >
              <SlideImage
                src={item.backgroundUrl}
                alt={`slide ${index}`}
                width={itemWidth}
                height={itemHeight}
                isActive={isActive}
                onClick={() => onItemClick(index)}
              />
            </CarouselItem>
          );
        })}
      </CarouselTrack>
    </CarouselContainer>
  );
}
