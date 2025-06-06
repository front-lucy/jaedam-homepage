/** @jsxImportSource @emotion/react */
'use client';

import { SectionHeader } from '@/components/molecules/section-header';
import { useState } from 'react';
import styled from '@emotion/styled';
import { colors, radius, spacing } from '@/tokens';
import BubbleSVG from '@/assets/icons/visual-bubble.svg';
import * as S from '@/app/_components/layout/container';
import { Text } from '@/components/atom/text';
import { DeviceType, useDeviceType } from '@/hooks/useDeviceType';
import { motion, Variants } from 'framer-motion';
import { css } from '@emotion/react';
import { CareerCarousel } from './_component/CareerCarousel';

const tabs = ['인재상', '채용공고'];
const diagrams = [
  {
    title: '에이전시로서의 정체성',
    items: ['존중', '탐색', '위임'],
  },
  {
    title: '프로듀서로서의 정체성',
    items: ['접근', '다양성', '의미'],
  },
];

const variant = {
  desktop: {
    icon: {
      width: '100px',
      height: '79px',
    },
    diagram: {
      width: '240px',
      height: '240px',
      containerWidth: '100%',
      containerHeight: '240px',
    },
  },
  tablet: {
    icon: {
      width: '100px',
      height: '79px',
    },
    diagram: {
      width: '240px',
      height: '240px',
      containerWidth: '100%',
      containerHeight: '240px',
    },
  },
  mobile: {
    icon: {
      width: '80px',
      height: '63px',
    },
    diagram: {
      width: '180px',
      height: '180px',
      containerWidth: '100%',
      containerHeight: '310px',
    },
  },
};

// 스크롤 애니메이션 variants
const fadeInUpVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      staggerChildren: 0.2,
    },
  },
};

// 다이어그램 아이템 컨테이너용 variants - stagger 제거하고 동시 실행
const diagramContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      // staggerChildren 제거 - 모든 원이 동시에 나타나도록
    },
  },
};

const diagramItemVariants: Record<DeviceType, Variants> = {
  desktop: {
    hidden: {
      x: 0,
      y: 0,
      opacity: 0,
    },
    visible: (index: number) => ({
      x: index === 0 ? -210 : index === 1 ? 0 : 210,
      opacity: 1,
      transition: {
        opacity: {
          duration: 0.5,
          ease: 'easeOut',
        },
        x: {
          delay: 0.7, // 같은 부모의 원들은 동시에 이동
          type: 'spring',
          damping: 20,
          stiffness: 100,
          duration: 0.8,
        },
      },
    }),
  },
  tablet: {
    hidden: {
      x: 0,
      y: 0,
      opacity: 0,
    },
    visible: (index: number) => ({
      x: index === 0 ? -210 : index === 1 ? 0 : 210,
      opacity: 1,
      transition: {
        opacity: {
          duration: 0.5,
          ease: 'easeOut',
        },
        x: {
          delay: 0.7, // 같은 부모의 원들은 동시에 이동
          type: 'spring',
          damping: 20,
          stiffness: 100,
          duration: 0.8,
        },
      },
    }),
  },
  mobile: {
    hidden: {
      x: 0,
      y: 0,
      opacity: 0,
    },
    visible: (index: number) => ({
      x: index === 0 ? 0 : index === 1 ? -70 : 70,
      y: index === 0 ? 0 : 120,
      opacity: 1,
      transition: {
        opacity: {
          duration: 0.5,
          ease: 'easeOut',
        },
        x: {
          delay: 0.7, // 같은 부모의 원들은 동시에 이동
          type: 'spring',
          damping: 20,
          stiffness: 100,
          duration: 0.8,
        },
        y: {
          delay: 0.7, // 같은 부모의 원들은 동시에 이동
          type: 'spring',
          damping: 20,
          stiffness: 100,
          duration: 0.8,
        },
      },
    }),
  },
};

// 텍스트용 별도 variants
const textVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 1.6, // 위치 이동 완료 후
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

// 캐러셀 데이터 (임시 데이터)
const carouselItems = [
  {
    id: 1,
    backgroundUrl: 'https://shortz-prod-s3-content.s3.ap-northeast-2.amazonaws.com/2186/meta/thumbnail_title.jpg',
  },
  {
    id: 2,
    backgroundUrl: 'https://shortz-prod-s3-content.s3.ap-northeast-2.amazonaws.com/2160/meta/thumbnail_title.jpg\n',
  },
  {
    id: 3,
    backgroundUrl: 'https://shortz-prod-s3-content.s3.ap-northeast-2.amazonaws.com/2170/meta/thumbnail_title.jpg',
  },
  {
    id: 4,
    backgroundUrl: 'https://shortz-prod-s3-content.s3.ap-northeast-2.amazonaws.com/2150/meta/thumbnail_title.jpg',
  },
  {
    id: 5,
    backgroundUrl: 'https://shortz-prod-s3-content.s3.ap-northeast-2.amazonaws.com/2169/meta/thumbnail_title.jpg',
  },
];

export default function CareerPage() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const device = useDeviceType();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  console.log('🌐 device', device);

  return (
    <S.CommonContainer css={ContainerAdditional}>
      <StyledCareerContainer device={device}>
        <SectionHeader
          tabs={tabs}
          title={'Career'}
          activeTab={activeTab}
          onChange={handleTabChange}
        />

        {activeTab === '인재상' && (
          <SectionBodyContainer>
            <IdealTalentContent
              key={`${activeTab}-ideal`}
              variants={fadeInUpVariants}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: false, amount: 0.3 }}
            >
              <BubbleSVG className={'icon-wrapper'} />
              <Text
                typography={device === 'desktop' ? 'headline1-bold' : 'title3-black'}
                className={'title'}
                align={'center'}
              >
                우리와 함께
                <em>&nbsp; 재미있는 세상</em>
                을 만들 <br /> 인재를 찾습니다.
              </Text>
              <div className='description'>
                <Text
                  typography={'title3-regular'}
                  align={'center'}
                >
                  우리는 작가의 대리인이자 작품의 책임자입니다.
                </Text>
                <Text
                  typography={'title3-regular'}
                  align={'center'}
                >
                  우리는 진지한 탐색자이자 조언가이고 다양성을 수용하는 협력자이자 실천가입니다.
                </Text>
                <Text
                  typography={'title3-regular'}
                  align={'center'}
                >
                  우리는 재담미디어의 핵심가치를 상징하는 인재입니다.
                </Text>
              </div>
            </IdealTalentContent>

            <Section
              key={`${activeTab}-diagram`}
              device={device}
              variants={fadeInUpVariants}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: false, amount: 0.3 }}
            >
              {diagrams.map((diagram, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUpVariants}
                  style={{ width: '100%' }}
                >
                  <div className='content-wrapper'>
                    <Text
                      typography={'title2-bold'}
                      align={'center'}
                    >
                      {diagram.title}
                    </Text>
                    <motion.div
                      variants={diagramContainerVariants}
                      style={{ width: '100%' }}
                    >
                      <DiagramItemsContainer className='diagram-items'>
                        {diagram.items.map((item, itemIndex) => (
                          <motion.li
                            key={itemIndex}
                            css={diagramCss}
                            variants={diagramItemVariants[device]}
                            custom={itemIndex}
                            className='diagram-item'
                          >
                            <motion.div variants={textVariants}>
                              <Text typography={device === 'desktop' ? 'title1-bold' : 'title2-bold'}>{item}</Text>
                            </motion.div>
                          </motion.li>
                        ))}
                      </DiagramItemsContainer>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </Section>

            <Section
              key={`${activeTab}-carousel`}
              device={device}
              variants={fadeInUpVariants}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: false, amount: 0.3 }}
            >
              <motion.div variants={fadeInUpVariants}>
                <div className='content-wrapper'>
                  <Text
                    typography={device === 'mobile' ? 'title1-black' : 'headline3-bold'}
                    align={'center'}
                  >
                    FUN & JOY
                  </Text>
                  <Text
                    typography={device === 'mobile' ? 'body-regular' : 'title2-regular'}
                    align={'center'}
                  >
                    세상의 재미를 함께 만들어갈 <br />
                    재담인을 위한 사옥을 소개합니다.
                  </Text>
                </div>
              </motion.div>
              <motion.div variants={fadeInUpVariants}>
                <CareerCarousel items={carouselItems} />
              </motion.div>
            </Section>
          </SectionBodyContainer>
        )}
      </StyledCareerContainer>
    </S.CommonContainer>
  );
}

const ContainerAdditional = css`
  padding-left: 0;
  padding-right: 0;
`;

const StyledCareerContainer = styled(motion.div)<{ device: DeviceType }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1920px;
  width: 100%;
  height: 100%;
  flex: 1;
  gap: ${spacing['5XL']};

  & .icon-wrapper {
    width: ${({ device }) => variant[device].icon.width};
    height: ${({ device }) => variant[device].icon.height};
    position: relative;
  }

  & .diagram-items {
    width: ${({ device }) => variant[device].diagram.containerWidth};
    height: ${({ device }) => variant[device].diagram.containerHeight};
  }

  & .diagram-items .diagram-item {
    width: ${({ device }) => variant[device].diagram.width};
    height: ${({ device }) => variant[device].diagram.height};
  }
`;

const SectionBodyContainer = styled.section`
  padding-top: ${spacing['4XL']};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: ${spacing['4XL']};

  & .ideal-talent-content {
  }
`;

const IdealTalentContent = styled(motion.div)`
  width: 100%;
  padding: 0 ${spacing['XL']};
  display: flex;
  gap: ${spacing['2XL']};
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & .title em {
    color: ${colors.jaedamCyan};
  }

  & .description {
    display: flex;
    flex-direction: column;
  }
`;

const Section = styled(motion.section)<{ device: DeviceType }>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 ${({ device }) => (device === 'mobile' ? 0 : spacing['2XL'])};
  gap: ${spacing['XL']};

  &:last-child {
    padding: ${spacing['4XL']} 0 0 0;
    gap: ${spacing['5XL']};
  }

  & .content-wrapper {
    width: 100%;
    display: flex;
    gap: ${spacing['2XL']};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: ${spacing['2XL']};
  }
`;

const DiagramItemsContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const diagramCss = css`
  border-radius: ${radius.r900};
  border: 1px solid ${colors.jaedamCyan};
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
`;
