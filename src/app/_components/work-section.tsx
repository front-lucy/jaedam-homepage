import { Text } from '@/components/atom/text';
import { DeviceType, useDeviceType } from '@/hooks/useDeviceType';
import { useMainStore } from '@/store/useMainStore';
import { TypographyType, colors } from '@/tokens';
import styled from '@emotion/styled';
import { CSSProperties, useEffect, useState } from 'react';

const variants: Record<
  ReturnType<typeof useDeviceType>,
  Record<
    'container' | 'slider',
    {
      title: TypographyType;
      writers: TypographyType;
      navigationWidth?: string;
    } & CSSProperties
  >
> = {
  desktop: {
    container: {
      title: 'display2-black',
      writers: 'headline2-regular',
    },
    slider: {
      title: 'headline3-regular',
      writers: 'body-regular',
      gap: '128px',
      navigationWidth: '494px',
    },
  },
  tablet: {
    container: {
      title: 'display2-black',
      writers: 'title1-regular',
    },
    slider: {
      title: 'title1-regular',
      writers: 'body-regular',
      navigationWidth: '478px',
    },
  },
  mobile: {
    container: {
      title: 'headline1-black',
      writers: 'title3-regular',
    },
    slider: {
      title: 'title2-regular',
      writers: 'caption1-regular',
      navigationWidth: '296px',
    },
  },
};

const Container = styled.div<{
  backgroundImage?: string;
}>`
  width: 100%;
  height: 100vh;
  background-color: ${colors.black};
  overflow: hidden;
  position: relative;
  background-image: url(${({ backgroundImage }) => backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const BlurOverlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(40px);
`;

const StyledWorkContent = styled.div<{ device?: DeviceType }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding-top: ${({ device }) => (device === 'desktop' ? '64px' : '16px')};

  // work2 섹션에서만 적용
  gap: ${({ device }) => (device ? variants[device].slider.gap : '40px')};
`;

const SlideContainer = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;

  &:hover {
    cursor: pointer;
  }
`;

const SlideWrapper = styled.div<{
  itemsPerSlide: number;
  currentIndex: number;
  totalItems: number;
  enableTransition: boolean;
}>`
  display: flex;
  transition: ${({ enableTransition }) => (enableTransition ? 'transform 0.3s ease' : 'none')};
  transform: ${({ currentIndex }) => {
    const itemWithGap = 308.12 + 80;
    const translateValue = currentIndex * itemWithGap + 154.06;
    return `translateX(calc(50% - ${translateValue}px))`;
  }};
  gap: 80px;
  width: 100%;
`;

const SlideItem = styled.div<{ itemsPerSlide: number }>`
  width: 308.12px;
  flex-shrink: 0;
  height: 440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.1);
`;

const NavigationContainer = styled.div<{ device: DeviceType }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  width: 100%;
  margin-top: 24px;
  max-width: ${({ device }) => variants[device].slider.navigationWidth};
`;

const NavButton = styled.button`
  border: none;
  color: white;
  background-color: transparent;
  border-radius: 4px;
  cursor: pointer;
  /* backdrop-filter: blur(10px); */
  transition: background 0.1s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

interface WorkSectionProps {
  step: number;
}

// 기기별 슬라이드 개수 설정
const itemsPerSlide = {
  desktop: 5,
  tablet: 2,
  mobile: 1,
};

export const WorkSection = ({ step }: WorkSectionProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [enableTransition, setEnableTransition] = useState(true);
  const device = useDeviceType();

  const { highlightList } = useMainStore();

  const currentItemsPerSlide = itemsPerSlide[device];

  const [showSlider, setShowSlider] = useState(false);

  // 무한 슬라이드를 위한 가상 아이템 생성
  const createInfiniteList = () => {
    if (!highlightList.length) return highlightList;

    // 중앙 정렬을 위해 더 많은 클론이 필요
    const cloneCount = Math.max(currentItemsPerSlide * 2, highlightList.length);
    const frontClones = [];
    const backClones = [];

    // 앞쪽 클론 생성
    for (let i = 0; i < cloneCount; i++) {
      frontClones.push(highlightList[highlightList.length - 1 - (i % highlightList.length)]);
    }
    frontClones.reverse();

    // 뒤쪽 클론 생성
    for (let i = 0; i < cloneCount; i++) {
      backClones.push(highlightList[i % highlightList.length]);
    }

    return [...frontClones, ...highlightList, ...backClones];
  };

  const infiniteList = createInfiniteList();

  // 무한 루프 처리
  useEffect(() => {
    if (highlightList.length <= 1) return;

    const cloneCount = Math.max(currentItemsPerSlide * 2, highlightList.length);
    const realStartIndex = cloneCount;
    const realEndIndex = cloneCount + highlightList.length - 1;

    if (activeIndex > realEndIndex) {
      // 마지막을 넘어갔을 때
      setTimeout(() => {
        setEnableTransition(false);
        setActiveIndex(realStartIndex + (activeIndex - realEndIndex - 1));
        setTimeout(() => setEnableTransition(true), 50);
      }, 300);
    } else if (activeIndex < realStartIndex) {
      // 첫 번째 이전으로 갔을 때
      setTimeout(() => {
        setEnableTransition(false);
        setActiveIndex(realEndIndex + (activeIndex - realStartIndex + 1));
        setTimeout(() => setEnableTransition(true), 50);
      }, 300);
    }
  }, [activeIndex, highlightList.length, currentItemsPerSlide]);

  // 초기 위치 설정 (가운데 정렬)
  useEffect(() => {
    if (highlightList.length > 0) {
      const cloneCount = Math.max(currentItemsPerSlide * 2, highlightList.length);
      setActiveIndex(cloneCount); // 첫 번째 실제 아이템이 가운데 오도록
    }
  }, [highlightList.length, currentItemsPerSlide]);

  if (!highlightList.length) return null;

  const handleNavigation = (direction: 'prev' | 'next') => {
    if (highlightList.length <= 1) return;

    setEnableTransition(true);
    if (direction === 'prev') {
      setActiveIndex(prev => prev - 1);
    } else {
      setActiveIndex(prev => prev + 1);
    }
  };

  // 현재 실제 슬라이드 인덱스 계산 (dots 표시용)
  const getCurrentSlideIndex = () => {
    if (highlightList.length <= 1) return 0;
    const cloneCount = Math.max(currentItemsPerSlide * 2, highlightList.length);
    const realIndex = activeIndex - cloneCount;

    if (realIndex < 0) {
      return highlightList.length + (realIndex % highlightList.length);
    }
    return realIndex % highlightList.length;
  };

  useEffect(() => {
    if (step === 1) {
      const timer = setTimeout(() => {
        setShowSlider(true);
      }, 120); // 0.7초 딜레이 (원하는 시간으로 조정 가능)

      return () => clearTimeout(timer); // 정리
    } else {
      setShowSlider(false);
    }
  }, [step]);

  return (
    <>
      {step === 0 && (
        <Container data-work-section>
          <StyledWorkContent>
            <Text
              typography={variants[device].container.title}
              color={'white'}
            >
              WORK
            </Text>
            <Text
              typography={variants[device].container.writers}
              color={'white'}
              align='center'
            >
              우리는 재미를 만들고 즐거움을 확장해요.
            </Text>
          </StyledWorkContent>
        </Container>
      )}
      {step === 1 && (
        <Container
          data-work-section
          backgroundImage={highlightList[getCurrentSlideIndex()]?.thumbnailUrl}
        >
          <BlurOverlay />
          {showSlider && (
            <StyledWorkContent device={device}>
              <SlideContainer>
                <SlideWrapper
                  itemsPerSlide={currentItemsPerSlide}
                  currentIndex={activeIndex}
                  totalItems={infiniteList.length}
                  enableTransition={enableTransition}
                >
                  {infiniteList.map((item, index) => (
                    <SlideItem
                      key={`${item.title}-${index}`}
                      itemsPerSlide={currentItemsPerSlide}
                    >
                      <ThumbnailImage
                        src={item.thumbnailUrl}
                        alt={item.title}
                      />
                    </SlideItem>
                  ))}
                </SlideWrapper>
              </SlideContainer>

              {highlightList.length > 1 && (
                <NavigationContainer device={device}>
                  <NavButton onClick={() => handleNavigation('prev')}>
                    <svg
                      width='40'
                      height='40'
                      viewBox='0 0 40 40'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M28.8935 5.71532L13.02 20.0015L28.8935 34.2876L26.7521 36.667L9.5567 21.1912C9.21944 20.8876 9.02686 20.4552 9.02686 20.0015C9.02686 19.5477 9.21944 19.1153 9.5567 18.8118L26.7521 3.33594L28.8935 5.71532Z'
                        fill='white'
                      />
                    </svg>
                  </NavButton>

                  <InfoContainer>
                    <Text
                      typography={variants[device].slider.title}
                      color={'white'}
                      lineLimit={1}
                    >
                      {highlightList[getCurrentSlideIndex()]?.title}
                    </Text>
                    {highlightList[getCurrentSlideIndex()]?.writerName && (
                      <Text
                        typography={variants[device].slider.writers}
                        color={'white'}
                      >
                        &copy;{highlightList[getCurrentSlideIndex()]?.writerName?.join(',')}
                      </Text>
                    )}
                  </InfoContainer>

                  <NavButton onClick={() => handleNavigation('next')}>
                    <svg
                      width='40'
                      height='40'
                      viewBox='0 0 40 40'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M11.1065 5.71532L26.98 20.0015L11.1065 34.2876L13.2479 36.667L30.4433 21.1912C30.7806 20.8876 30.9731 20.4552 30.9731 20.0015C30.9731 19.5477 30.7806 19.1153 30.4433 18.8118L13.2479 3.33594L11.1065 5.71532Z'
                        fill='white'
                      />
                    </svg>
                  </NavButton>
                </NavigationContainer>
              )}
            </StyledWorkContent>
          )}
        </Container>
      )}
    </>
  );
};
