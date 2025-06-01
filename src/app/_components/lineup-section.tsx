'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useDeviceType } from '@/hooks/useDeviceType';
import { SwitchCase } from '@/components/atom/switch-case';
import { useMainStore } from '@/store/useMainStore';

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
  & .title {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  
`;

const pageVariants = {
  hidden: {
    y: 100,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 15,
      duration: 1.2,
    },
  },
};

export function LineupSection({ className }: HeroSectionProps) {
  const ref = useRef(null);
  const [focusIndex, setFocusIndex] = useState(0  )
  const device = useDeviceType()

  const { focusList } = useMainStore();


  const isInView = useInView(ref, { 
    once: true, 
    amount: 0.2,
    margin: "-50px"
  });

  if (!focusList.length) return null; // 데이터가 없으면 아무것도 렌더링하지 않음

  const currentFocus = focusList[focusIndex];

  return (
    <SwitchCase
      value={device}
      cases={{
        mobile: (
          <div>test</div>
        ),
        tablet: (
          <div>test</div>
        ),
        desktop: (
          <Section
            ref={ref}
            backgroundUrl={currentFocus.backgroundUrl}
            className={className}
          >
            <Container
              variants={pageVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <h1>{currentFocus.title}</h1>
              <p>{currentFocus.synopsis}</p>
            </Container>
          </Section>
        ),
      }}
    />
  );
} 