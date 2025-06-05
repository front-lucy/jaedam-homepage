'use client';

import styled from '@emotion/styled';

// ✅ SVG를 React Component로 import
import JaedamLogo from '@/assets/main-news/main-news-logo-jaedam-eng.svg';
import MarketoonLogo from '@/assets/main-news/main-news-logo-marketoon.svg';
import OMJLogo from '@/assets/main-news/main-news-logo-omj.svg';
import QtizzLogo from '@/assets/main-news/main-news-logo-qtizz.svg';
import ShortzLogo from '@/assets/main-news/main-news-logo-shortz.svg';
import StudioDamLogo from '@/assets/main-news/main-news-logo-studiodam.svg';

// ✅ 로고 리스트: 컴포넌트와 높이 정의
const logoList = [
  { Component: JaedamLogo, height: 30 },
  { Component: ShortzLogo, height: 30 },
  { Component: StudioDamLogo, height: 40 },
  { Component: OMJLogo, height: 40 },
  { Component: MarketoonLogo, height: 40 },
  { Component: QtizzLogo, height: 30 },
];

// ✅ 무한 루프를 위한 복제
const duplicatedLogos = [...logoList, ...logoList];

export function InfiniteLogoSlider() {
  return (
    <SliderWrapper>
      <SliderTrack>
        {duplicatedLogos.map(({ Component, height }, i) => {
          const StyledLogo = styled(Component, {
            shouldForwardProp: prop => prop !== '$height',
          })<{ $height: number }>`
            opacity: 0.2;
            height: ${({ $height }) => `${$height}px`};
            object-fit: contain;

            @media (max-width: 1279px) and (min-width: 800px) {
              height: ${({ $height }) => `${$height / 2}px`};
            }
          `;

          return (
            <StyledLogo
              key={i}
              $height={height}
            />
          );
        })}
      </SliderTrack>
    </SliderWrapper>
  );
}

const SliderWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 64px;
  position: absolute;
  bottom: 0;
  display: none;

  @media (min-width: 800px) {
    display: block;
  }
`;

const SliderTrack = styled.div`
  display: flex;
  width: max-content;
  animation: scroll 20s linear infinite;
  gap: 128px;

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
`;
