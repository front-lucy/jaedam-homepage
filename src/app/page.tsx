'use client';

import { getLineup } from '@/api-domain/lineup';
import { SwitchCase } from '@/components/atom/switch-case';
import { Header } from '@/components/molecules/header';
import { useMainStore } from '@/store/useMainStore';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { AboutSection, BestSection, ContactSection, IntroSection, LineupSection, ServicesSection } from './_components';

const Container = styled.div`
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const SectionWrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
`;

const Navigation = styled.div`
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NavDot = styled.button<{ active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
  background: ${props => (props.active ? 'white' : 'transparent')};
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0.7;

  &:hover {
    opacity: 1;
    transform: scale(1.2);
  }
`;

const sections: Array<{ id: string; component: React.ComponentType; header: 'light' | 'dark' }> = [
  { id: 'hero', component: LineupSection, header: 'light' },
  { id: 'best', component: BestSection, header: 'light' },
  { id: 'services', component: ServicesSection, header: 'light' },
  { id: 'about', component: AboutSection, header: 'light' },
  { id: 'contact', component: ContactSection, header: 'light' },
];

export default function Home() {
  const [showSplash, setShowSplash] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const { hasData, setLineUpData } = useMainStore();

  useEffect(() => {
    const fetchLineup = async () => {
      if (hasData) return;
      const { success, body } = await getLineup();
      if (success) {
        setLineUpData({
          focusList: body.focusList.sort((a, b) => a.orderIndex - b.orderIndex),
          highlightList: body.highlightList.sort((a, b) => a.orderIndex - b.orderIndex),
        });
      }
    };
    fetchLineup();
  }, [hasData, setLineUpData]);

  const scrollToSection = useCallback(
    (index: number) => {
      if (isScrolling || index < 0 || index >= sections.length) return;

      setIsScrolling(true);
      setCurrentSection(index);

      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    },
    [isScrolling],
  );

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();

      if (isScrolling) return;

      if (e.deltaY > 0) {
        // 스크롤 다운
        scrollToSection(currentSection + 1);
      } else {
        // 스크롤 업
        scrollToSection(currentSection - 1);
      }
    },
    [currentSection, isScrolling, scrollToSection],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isScrolling) return;

      switch (e.key) {
        case 'ArrowDown':
        case ' ':
          e.preventDefault();
          scrollToSection(currentSection + 1);
          break;
        case 'ArrowUp':
          e.preventDefault();
          scrollToSection(currentSection - 1);
          break;
        case 'Home':
          e.preventDefault();
          scrollToSection(0);
          break;
        case 'End':
          e.preventDefault();
          scrollToSection(sections.length - 1);
          break;
      }
    },
    [currentSection, isScrolling, scrollToSection],
  );

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleWheel, handleKeyDown]);

  const pageVariants = {
    initial: {
      y: '100%',
      opacity: 1,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 20,
        duration: 0.8,
      },
    },
    exit: {
      y: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  const CurrentSectionComponent = sections[currentSection].component;

  return (
    <div style={{ width: '100%' }}>
      <Header
        pageType='home'
        mode={showSplash ? 'light' : sections[currentSection].header}
      />

      <SwitchCase
        value={showSplash.toString()}
        cases={{
          true: <IntroSection onEndSplash={() => setShowSplash(false)} />,
          false: (
            <Container>
              <AnimatePresence>
                <SectionWrapper
                  key={currentSection}
                  variants={pageVariants}
                  initial='initial'
                  animate='animate'
                  exit='exit'
                >
                  <CurrentSectionComponent />
                </SectionWrapper>
              </AnimatePresence>

              <Navigation>
                {sections.map((_, index) => (
                  <NavDot
                    key={index}
                    active={index === currentSection}
                    onClick={() => scrollToSection(index)}
                    aria-label={`섹션 ${index + 1}로 이동`}
                  />
                ))}
              </Navigation>
            </Container>
          ),
        }}
      />
    </div>
  );
}
