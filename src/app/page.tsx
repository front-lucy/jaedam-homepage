'use client';

import { getLineup } from '@/api-domain/lineup';
import { SwitchCase } from '@/components/atom/switch-case';
import { Footer } from '@/components/molecules/footer';
import { Header } from '@/components/molecules/header';
import { useMainStore } from '@/store/useMainStore';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { BusinessSection, ContactSection, IntroSection, LineupSection, NewsSection } from './_components';


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

const sections: Array<{ id: string; header: 'light' | 'dark' }> = [
  { id: 'splash', header: 'light' },
  { id: 'best', header: 'dark' },
  { id: 'business1', header: 'light' },
  { id: 'business2', header: 'light' },
  { id: 'news', header: 'light' },
  { id: 'contact', header: 'light' },
];

const HiddenScroll = styled.div`
  height: 100dvh;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;


export default function Home() {
  const [currentSection, setCurrentSection] = useState('splash');
  const [isScrolling, setIsScrolling] = useState(false);

  const { hasData, setLineUpData } = useMainStore();

  useEffect (() => {
    const fetchLineup = async () => {
      if (hasData) return; // 이미 데이터가 있는 경우 API 호출 생략

      const { success, body } = await getLineup ();

      if (success) {
        setLineUpData({
          focusList: body.focusList.sort((a, b) => a.orderIndex - b.orderIndex),
          highlightList: body.highlightList.sort((a, b) => a.orderIndex - b.orderIndex),
        });
      }
    }

    fetchLineup ();
  }, []);

  const scrollToSection = useCallback ((index: number) => {
    if (isScrolling || index < 0 || index >= sections.length) return;

    setIsScrolling (true);
    setCurrentSection (sections[index].id);

    setTimeout (() => {
      setIsScrolling (false);
    }, 1000);
  }, [isScrolling]);

  const handleWheel = useCallback ((e: WheelEvent) => {
    e.preventDefault ();

    if (isScrolling) return;

    const arr = sections.map((section) => section.id);

    if (e.deltaY > 0) {
      // 스크롤 다운
      scrollToSection (arr.indexOf(currentSection) + 1);
    } else {
      // 스크롤 업
      scrollToSection (arr.indexOf(currentSection) - 1);
    }
  }, [currentSection, isScrolling, scrollToSection]);

  const handleKeyDown = useCallback ((e: KeyboardEvent) => {
    if (isScrolling) return;

    const arr = sections.map((section) => section.id);

    switch (e.key) {
      case 'ArrowDown':
      case ' ':
        e.preventDefault ();
        scrollToSection(arr.indexOf(currentSection) + 1);
        break;
      case 'ArrowUp':
        e.preventDefault ();
        scrollToSection(arr.indexOf(currentSection) - 1);
        break;
      case 'Home':
        e.preventDefault ();
        scrollToSection (arr.indexOf('splash'));
        break;
      case 'End':
        e.preventDefault ();
        scrollToSection (arr.indexOf('contact'));
        break;
    }
  }, [currentSection, isScrolling, scrollToSection]);

  useEffect (() => {
    window.addEventListener ('wheel', handleWheel, { passive: false });
    window.addEventListener ('keydown', handleKeyDown);

    return () => {
      window.removeEventListener ('wheel', handleWheel);
      window.removeEventListener ('keydown', handleKeyDown);
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

  return (
    <HiddenScroll style={{ width: '100%' }}>
      <Header pageType="home" mode={currentSection === 'splash' ? 'light' : sections.find((section) => section.id === currentSection)?.header || 'light'} />

      <SwitchCase
        value={currentSection}
        cases={{
          splash: <IntroSection onEndSplash={() => scrollToSection(1)} />,
          best: (
            <Container>
              <AnimatePresence>
                <SectionWrapper
                  key={currentSection}
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <LineupSection />
                </SectionWrapper>
              </AnimatePresence>
            </Container>
          ),
          business1: (
            <Container>
              <AnimatePresence>
                <SectionWrapper
                  key={currentSection}
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <BusinessSection step={0} />
                </SectionWrapper>
              </AnimatePresence>
            </Container>
          ),
          business2: (
            <Container>
              <BusinessSection step={1} />
            </Container>
          ),
          news: (
            <Container>
              <AnimatePresence>
                <SectionWrapper
                  key={currentSection}
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <NewsSection />
                </SectionWrapper>
              </AnimatePresence>
            </Container>
          ),
          contact: (
            <Container>
            <AnimatePresence>
              <SectionWrapper
                key={currentSection}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <ContactSection />
              </SectionWrapper>
            </AnimatePresence>
          </Container>
          ),
        }}
      />
      <Footer />

    </HiddenScroll>
  );
}
