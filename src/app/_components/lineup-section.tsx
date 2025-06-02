'use client';

import NavArrowRightIcon from '@/assets/icons/Icon-nav-arrow-right.svg';
import { SwitchCase } from '@/components/atom/switch-case';
import { Text } from '@/components/atom/text';
import { useDeviceType } from '@/hooks/useDeviceType';
import { colors, radius, spacing } from '@/tokens';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

import { useMainStore } from '@/store/useMainStore';
import 'swiper/css';
import { Carousel } from './carousel/carousel';

interface HeroSectionProps {
  className?: string;
}

const SectionWrapper = styled.div`
  min-height: 100dvh;
  position: relative;
  overflow: hidden;
  background-color: ${colors.white};
`;

const BackgroundImage = styled(motion.div, {
  shouldForwardProp: (prop) => prop !== 'imageUrl',
})<{ imageUrl: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.imageUrl || 'https://source.unsplash.com/random/1920x1080'});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Section = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  color: white;
  background: linear-gradient(287.56deg, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.8) 100%);
`;

const HashtagItem = styled.div`
  padding: ${spacing.XS};
  border-radius: ${radius.r100};
  background-color: #ffffff33;
`;

const Container = styled.div<{ device: ReturnType<typeof useDeviceType> }>`
  width: 100%;
  display: flex;

  & .swiper-container {
    width: 100%;
  }

  & .navigation-container {
    ${({ device }) => device === 'mobile' && 'width: 0px;'}
    ${({ device }) => device === 'tablet' && 'width: 40px;'}
    ${({ device }) => device === 'desktop' && 'width: 160px;'}
    flex-shrink: 0;
    display: flex;
    align-items: center;

    & .navigation-button {
      width: 80px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #ffffff33;
      border-radius: 9999px;
    }

    &.prev {
      justify-content: flex-start;
      padding-left: 32px;
    }

    &.next {
      justify-content: flex-end;
      padding-right: 32px;
    }

    @media (max-width: 1260px) {
      & {
        width: 40px;
      }
    }

    @media (max-width: 480px) {
      & {
        display: none;
      }
    }
  }

  & .content-container {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 40px;
    flex: 1;

    & .header-container {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    & .hashtag-container {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    @media (max-width: 1260px) {
      & {
        padding: 0 40px;
      }
    }

    @media (max-width: 480px) {
      & {
        padding: 0 40px;
        gap: 32px;
      }
    }
  }

  & .lineup-preview-list-container {
    display: flex;
    flex: 1;
    gap: 12px;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  }

  & .focus-item-indicator {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
    padding-left: 40px;
    width: 100%;

    @media (max-width: 480px) {
      padding-left: 40px;
      gap: 8px;
    }
  }

  & .focus-item-dot {
    width: 8px;
    height: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 99999px;
    background-color: rgba(255, 255, 255, 0.2);
    border: 2px solid transparent;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background-color: rgba(255, 255, 255, 0.3);
      border-color: rgba(34, 212, 221, 0.5);
    }

    &.active {
      width: 20px;
      background-color: #22D4DD;
      border-color: #22D4DD;
    }
  }
`;

const StyledButton = styled.button<{ device: ReturnType<typeof useDeviceType> }>`
  width: ${({ device }) => (device === 'mobile' ? '180px' : '200px')};
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-radius: 9999px;
  border: 1px solid ${colors.white};

  & .icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;

    svg {
      width: 100%;
      height: 100%;
      color: ${colors.white};

      path {
        fill: ${colors.white};
      }
    }
  }
`;


const backgroundVariants = {
  hidden: {
    scale: 1,
  },
  visible: {
    scale: 1.25,
    transition: {
      duration: 10,
      ease: 'linear',
    },
  },
};

export function LineupSection({ className }: HeroSectionProps) {
  const ref = useRef(null);
  const [focusIndex, setFocusIndex] = useState(0);
  const device = useDeviceType();

  const { focusList } = useMainStore();

  if (!focusList.length) return null; // 데이터가 없으면 아무것도 렌더링하지 않음

  const handleNavigation = (direction: 'prev' | 'next') => {
    const maxIndex = focusList.length - 1;

    if (direction === 'prev') {
      setFocusIndex(prev => (prev === 0 ? maxIndex : prev - 1));
    } else {
      setFocusIndex(prev => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const currentFocusItem = focusList[focusIndex];

  console.log (focusList, currentFocusItem, focusIndex);

  return (
    <SwitchCase
      value={device}
      cases={{
        mobile: (
          <SectionWrapper>
            <BackgroundImage
              key={`mobile-${focusIndex}`}
              imageUrl={currentFocusItem.mobileBackgroundUrl}
              variants={backgroundVariants}
              initial='hidden'
              animate='visible'
            />
            <Section
              ref={ref}
              className={className}
            >
              <Container device={device}>
                <div className='content-container'>
                  {currentFocusItem.tags && currentFocusItem?.tags?.length > 0 && (
                    <div className='hashtag-container'>
                      {currentFocusItem.tags?.map((tag, index) => (
                        <HashtagItem key={index}>
                          <Text
                            typography={'body-medium'}
                            color='white'
                          >
                            {tag}
                          </Text>
                        </HashtagItem>
                      ))}
                    </div>
                  )}
                  <div className={'header-container'}>
                    <Text
                      typography={'body-bold'}
                      color='jaedamCyan'
                    >
                      {currentFocusItem.subTitle}
                    </Text>
                    <Text
                      typography={'title1-bold'}
                      color='white'
                    >
                      {currentFocusItem.title}
                    </Text>
                    <Text
                      typography={'body-regular'}
                      color='white'
                    >
                      &copy; {currentFocusItem.title}
                    </Text>
                  </div>
                  <Text
                    typography={'title3-medium'}
                    color='white'
                  >
                    {currentFocusItem.synopsis}
                  </Text>
                  <StyledButton device={device}>
                    <Text
                      typography={'button-medium'}
                      color='white'
                    >
                      자세히 보기
                    </Text>
                    <span className='icon-container'>
                      <NavArrowRightIcon />
                    </span>
                  </StyledButton>
                </div>
              </Container>

              <Container
                style={{
                  position: 'absolute',
                  bottom: 60,
                }}
                device={device}
              >
                {/* focus item dot 인디케이터 */}
                <div className='focus-item-indicator'>
                  {focusList.map((_, index) => (
                    <div 
                      key={index} 
                      className={`focus-item-dot ${index === focusIndex ? 'active' : ''}`}
                      onClick={() => setFocusIndex(index)}
                    />
                  ))}
                </div>
              </Container>
            </Section>
          </SectionWrapper>
        ),
        tablet: (
          <SectionWrapper>
            <BackgroundImage
              key={`tablet-${focusIndex}`}
              imageUrl={currentFocusItem.backgroundUrl}
              variants={backgroundVariants}
              initial='hidden'
              animate='visible'
            />
            <Section
              ref={ref}
              className={className}
            >
              <Container device={device}>
                <div className='content-container'>
                  {currentFocusItem.tags && currentFocusItem?.tags?.length > 0 && (
                    <div className='hashtag-container'>
                      {currentFocusItem.tags?.map((tag, index) => (
                        <HashtagItem key={index}>
                          <Text
                            typography={'body-medium'}
                            color='white'
                          >
                            {tag}
                          </Text>
                        </HashtagItem>
                      ))}
                    </div>
                  )}
                  <Text
                    typography={'title2-bold'}
                    color='jaedamCyan'
                    style={{ textAlign: 'center', marginBottom: '20px' }}
                  >
                    {currentFocusItem.subTitle}
                  </Text>
                  <Text
                    typography={'display2-bold'}
                    color='white'
                    style={{ textAlign: 'center', marginBottom: '20px' }}
                  >
                    {currentFocusItem.title}
                  </Text>
                  <Text
                    typography={'headline3-medium'}
                    color='white'
                  >
                    {currentFocusItem.synopsis}
                  </Text>
                  <StyledButton device={device}>
                    <Text
                      typography={'button-medium'}
                      color='white'
                    >
                      자세히 보기
                    </Text>
                    <span className='icon-container'>
                      <NavArrowRightIcon />
                    </span>
                  </StyledButton>
                </div>
              </Container>

              <Container
                style={{
                  position: 'absolute',
                  bottom: 60,
                }}
                device={device}
              >
                <div className='navigation-container' />

                <Carousel
                  items={focusList}
                  activeIndex={focusIndex}
                  onItemClick={setFocusIndex}
                  itemWidth={148}
                  itemHeight={86}
                  gap={12}
                  visibleItems={5}
                />

                <div className='navigation-container next' />
              </Container>
            </Section>
          </SectionWrapper>
        ),
        desktop: (
          <SectionWrapper>
            <BackgroundImage
              key={`desktop-${focusIndex}`}
              imageUrl={currentFocusItem.backgroundUrl}
              variants={backgroundVariants}
              initial='hidden'
              animate='visible'
            />
            <Section
              ref={ref}
              className={className}
            >
              <Container device={device}>
                <div className='navigation-container prev'>
                  <button
                    className='navigation-button'
                    onClick={() => handleNavigation('prev')}
                  >
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
                        d='M28.8935 5.71239L13.02 19.9985L28.8935 34.2847L26.7521 36.6641L9.55671 21.1882C9.21938 20.8847 9.02686 20.4523 9.02686 19.9985C9.02686 19.5448 9.21938 19.1124 9.55671 18.8088L26.7521 3.33301L28.8935 5.71239Z'
                        fill='white'
                        fillOpacity='0.7'
                      />
                    </svg>
                  </button>
                </div>
                <div className='content-container'>
                  {currentFocusItem.tags && currentFocusItem.tags.length > 0 && (
                    <div className='hashtag-container'>
                      {currentFocusItem.tags?.map((tag, index) => (
                        <HashtagItem key={index}>
                          <Text
                            typography={'body-regular'}
                            color='white'
                          >
                            {tag}
                          </Text>
                        </HashtagItem>
                      ))}
                    </div>
                  )}
                  <div className='header-container'>
                    
                  <Text
                    typography={'title2-bold'}
                    color='jaedamCyan'
                  >
                    {currentFocusItem.subTitle}
                  </Text>
                  <Text
                    typography={'display2-bold'}
                    color='white'
                  >
                    {currentFocusItem.title}
                  </Text>
                  <Text
                    typography={'body-regular'}
                    color='white'
                  >
                    &copy; {currentFocusItem.title}
                  </Text>
                  </div>
                  <Text
                    typography={'headline3-medium'}
                    color='white'
                  >
                    {currentFocusItem.synopsis}
                  </Text>
                  <StyledButton device={device}>
                    <Text
                      typography={'button-medium'}
                      color='white'
                    >
                      자세히 보기
                    </Text>
                    <span className='icon-container'>
                      <NavArrowRightIcon />
                    </span>
                  </StyledButton>
                </div>
                <div className='navigation-container next'>
                  <button
                    className='navigation-button'
                    onClick={() => handleNavigation('next')}
                  >
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
                        d='M11.1065 5.71239L26.98 19.9985L11.1065 34.2847L13.2479 36.6641L30.4433 21.1882C30.7806 20.8847 30.9731 20.4523 30.9731 19.9985C30.9731 19.5448 30.7806 19.1124 30.4433 18.8088L13.2479 3.33301L11.1065 5.71239Z'
                        fill='white'
                        fillOpacity='0.7'
                      />
                    </svg>
                  </button>
                </div>
              </Container>

              <Container
                device={device}
                style={{
                  position: 'absolute',
                  bottom: 80,
                }}
              >
                <div className='navigation-container' />

                <Carousel
                  items={focusList}
                  activeIndex={focusIndex}
                  onItemClick={setFocusIndex}
                  itemWidth={148}
                  itemHeight={86}
                  gap={12}
                  visibleItems={10}
                />

                <div className='navigation-container next' />
              </Container>
            </Section>
          </SectionWrapper>
        ),
      }}
    />
  );
}

