'use client';

import { getLineup } from '@/api-domain/lineup';
import { Footer } from '@/components/molecules/footer';
import { Header } from '@/components/molecules/header';
import { useMainStore } from '@/store/useMainStore';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { BusinessSection, ContactSection, IntroSection, LineupSection, NewsSection, WorkSection } from './_components';

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
  { id: 'work1', header: 'dark' },
  { id: 'work2', header: 'dark' },
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
  const lastScrollTime = useRef(0);
  const accumulatedDelta = useRef(0);

  const { hasData, setLineUpData } = useMainStore();

  useEffect(() => {
    const fetchLineup = async () => {
      if (hasData) return; // 이미 데이터가 있는 경우 API 호출 생략

      const { success, body } = await getLineup();

      if (success) {
        setLineUpData({
          focusList: body.focusList.sort((a, b) => a.orderIndex - b.orderIndex),
          highlightList: body.highlightList.sort((a, b) => a.orderIndex - b.orderIndex),
        });
      }
    };

    fetchLineup();
  }, []);

  const scrollToSection = useCallback(
    (index: number) => {
      if (isScrolling || index < 0 || index >= sections.length) return;

      setIsScrolling(true);
      setCurrentSection(sections[index].id);

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

      const now = Date.now();
      const timeDiff = now - lastScrollTime.current;

      // 100ms 이내의 연속된 스크롤은 누적
      if (timeDiff < 100) {
        accumulatedDelta.current += e.deltaY;
      } else {
        accumulatedDelta.current = e.deltaY;
      }

      lastScrollTime.current = now;

      // 임계값 설정 (Mac의 부드러운 스크롤 대응)
      const threshold = 50;
      
      if (Math.abs(accumulatedDelta.current) < threshold) return;

      const arr = sections.map(section => section.id);
      const currentIndex = arr.indexOf(currentSection);

      if (accumulatedDelta.current > 0) {
        // 스크롤 다운
        scrollToSection(currentIndex + 1);
      } else {
        // 스크롤 업
        // work1에서 이전으로 갈 때 business2를 건너뛰고 business1로 이동
        if (currentSection === 'work1') {
          scrollToSection(arr.indexOf('business1'));
        } else {
          scrollToSection(currentIndex - 1);
        }
      }

      // 누적값 초기화
      accumulatedDelta.current = 0;
    },
    [currentSection, isScrolling, scrollToSection],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isScrolling) return;

      const arr = sections.map(section => section.id);

      switch (e.key) {
        case 'ArrowDown':
        case ' ':
          e.preventDefault();
          scrollToSection(arr.indexOf(currentSection) + 1);
          break;
        case 'ArrowUp':
          e.preventDefault();
          scrollToSection(arr.indexOf(currentSection) - 1);
          break;
        case 'Home':
          e.preventDefault();
          scrollToSection(arr.indexOf('splash'));
          break;
        case 'End':
          e.preventDefault();
          scrollToSection(arr.indexOf('contact'));
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
        stiffness: 100,
        damping: 25,
        duration: 0.2,
      },
    },
    exit: {
      y: 0,
      opacity: 0.4,
      transition: {
        duration: 1,
        ease: 'easeOut',
      },
    },
  };

  return (
    <HiddenScroll style={{ width: '100%' }}>
      <Header
        pageType='home'
        mode={
          currentSection === 'splash'
            ? 'light'
            : sections.find(section => section.id === currentSection)?.header || 'light'
        }
      />

      <Container>
        <AnimatePresence>
          {currentSection === 'splash' && (
            <SectionWrapper
              key="splash"
              variants={pageVariants}
              initial='initial'
              animate='animate'
              exit='exit'
            >
              <IntroSection onEndSplash={() => scrollToSection(1)} />
            </SectionWrapper>
          )}
          {currentSection === 'best' && (
            <SectionWrapper
              key="best"
              variants={pageVariants}
              initial='initial'
              animate='animate'
              exit='exit'
            >
              <LineupSection />
            </SectionWrapper>
          )}
          {(currentSection === 'business1' || currentSection === 'business2') && (
            <SectionWrapper
              key="business"
              variants={pageVariants}
              initial='initial'
              animate='animate'
              exit='exit'
            >
              <BusinessSection step={currentSection === 'business1' ? 0 : 1} />
            </SectionWrapper>
          )}
          {(currentSection === 'work1') && (
            <SectionWrapper
              key="work1"
              variants={pageVariants}
              initial='initial'
              animate='animate'
              exit='exit'
            >
              <WorkSection step={0} />
            </SectionWrapper>
          )}
          {currentSection === 'work2' && (
            <SectionWrapper
              key="work2"
              variants={pageVariants}
              initial='initial'
              animate='animate'
              exit='exit'
            >
              <WorkSection step={1} />
            </SectionWrapper>
          )}
          {currentSection === 'news' && (
            <SectionWrapper
              key="news"
              variants={pageVariants}
              initial='initial'
              animate='animate'
              exit='exit'
            >
              <NewsSection />
            </SectionWrapper>
          )}
          {currentSection === 'contact' && (
            <SectionWrapper
              key="contact"
              variants={pageVariants}
              initial='initial'
              animate='animate'
              exit='exit'
            >
              <ContactSection />
            </SectionWrapper>
          )}
        </AnimatePresence>
      </Container>
      <Footer />
    </HiddenScroll>
  );
}
