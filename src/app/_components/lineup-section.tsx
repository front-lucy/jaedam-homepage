'use client';

import { SwitchCase } from '@/components/atom/switch-case';
import { Text } from '@/components/atom/text';
import { useDeviceType } from '@/hooks/useDeviceType';
import { useMainStore } from '@/store/useMainStore';
import styled from '@emotion/styled';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

interface HeroSectionProps {
  className?: string;
}

const Section = styled.section<{ backgroundUrl: string }>`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${props => props.backgroundUrl || 'https://source.unsplash.com/random/1920x1080'});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
`;

const Container = styled(motion.div)`
  & .navigation-container {
    width: 160px;
    
  }
  
  & .content-container {
    
  }
  
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 40px;
  
  & .content-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  & .hashtag-container { 
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
`;

const pageVariants = {
  hidden: {
    y: 100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 60,
      damping: 15,
      duration: 1.2,
    },
  },
};

const mockFocusList =  [
    {
      "contentId": 25,
      "title": "성수기",
      "subTitle": "돌아온 두 번째 삶. 내가 암살자 가문의 수양딸?",
      "synopsis": "신의 자비일까? 두 번째 삶, 암살자의 딸?!",
      "backgroundUrl": "https://s3.ap-northeast-2.amazonaws.com/shortz-dev-s3-resource/jaedam_content/17cbfeb8-7520-4141-bc06-b73b886b61b9-L-image.jpg",
      "mobileBackgroundUrl": "https://s3.ap-northeast-2.amazonaws.com/shortz-dev-s3-resource/jaedam_content/9e65da01-f4e2-4c51-8b3f-b8fa9faa65ab-S-image.jpg",
      "orderIndex": 1,
      "tags": [
        "#드라마",
        "#요양원",
        "#삶",
        "#죽음"
      ],
      "writers": [
        {
          "id": 3,
          "name": "테스트",
          "nickname": "닉넴"
        },
        {
          "id": 2,
          "name": "김작가투",
          "nickname": "닉넴"
        },
        ]
    }
  ]


  export function LineupSection({ className }: HeroSectionProps) {
  const ref = useRef(null);
  const [focusIndex, setFocusIndex] = useState(0);
  const device = useDeviceType();

  // const { focusList } = useMainStore();

  const isInView = useInView(ref, {
    once: true,
    amount: 0.2,
    margin: '-50px',
  });

  // if (!focusList.length) return null; // 데이터가 없으면 아무것도 렌더링하지 않음

  const currentFocus = mockFocusList[focusIndex];

  console.log ('Current Focus:', currentFocus);

  return (
    <SwitchCase
      value={device}
      cases={{
        mobile: <div>test</div>,
        tablet: <div>test</div>,
        desktop: (
          <Section
            ref={ref}
            backgroundUrl={currentFocus.backgroundUrl}
            className={className}
          >
            <Container
              variants={pageVariants}
              initial='hidden'
              animate={isInView ? 'visible' : 'hidden'}
            >
              <div className="hashtag-container">
                {currentFocus.tags.map((tag, index) => (
                  <Text
                    key={index}
                    typography={'body-regular'}
                    color='jaedamCyan'
                    style={{ marginRight: '8px' }}
                  >
                    {tag}
                  </Text>
                ))}
              </div>
              <Text
                typography={'title2-bold'}
                color='jaedamCyan'
                style={{ textAlign: 'center', marginBottom: '20px' }}
              >
                {currentFocus.subTitle}
              </Text>
              <Text
                typography={'display2-bold'}
                color='white'
                style={{ textAlign: 'center', marginBottom: '20px' }}
              >
                {currentFocus.title}
              </Text>
              <p>{currentFocus.synopsis}</p>
            </Container>
          </Section>
        ),
      }}
    />
  );
}
