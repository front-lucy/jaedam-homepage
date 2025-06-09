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
  height: 100dvh;
  overflow: hidden;
  position: relative;
`;

const SectionWrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
`;

const sections: Array<{ id: string; header: 'light' | 'dark' }> = [
  { id: 'splash', header: 'light' },
  { id: 'best', header: 'dark' },
  { id: 'business1', header: 'light' },
  { id: 'business2', header: 'light' },
  { id: 'work1', header: 'dark' },
  { id: 'work2', header: 'dark' },
  { id: 'news', header: 'light' },
  { id: 'contact', header: 'dark' },
];

const HiddenScroll = styled.div<{ $scrollable: boolean }>`
  height: 100dvh;
  overflow: ${({ $scrollable }) => ($scrollable ? 'auto' : 'hidden')};

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default function Home() {
  const [currentSection, setCurrentSection] = useState('splash');
  const [isScrolling, setIsScrolling] = useState(false);
  const [splashEnded, setSplashEnded] = useState(false);
  const lastScrollTime = useRef(0);
  const accumulatedDelta = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

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
      if (splashEnded && index === 0) return;

      setIsScrolling(true);
      setCurrentSection(sections[index].id);

      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    },
    [isScrolling, splashEnded],
  );

  const SCROLL_LOCK_DURATION = 1000;
  const MIN_SWIPE_DISTANCE = 50;

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (currentSection !== 'contact') {
        e.preventDefault();
      }

      if (isScrolling) return;

      const now = Date.now();

      accumulatedDelta.current += e.deltaY;
      lastScrollTime.current = now;

      const threshold = 50;
      if (Math.abs(accumulatedDelta.current) < threshold) return;

      const arr = sections.map(section => section.id);
      const currentIndex = arr.indexOf(currentSection);

      setIsScrolling(true);

      if (accumulatedDelta.current > 0) {
        scrollToSection(currentIndex + 1);
      } else {
        if (splashEnded && currentIndex === 1) {
          setIsScrolling(false);
          accumulatedDelta.current = 0;
          return;
        }

        if (currentSection === 'work1') {
          scrollToSection(arr.indexOf('business1'));
        } else {
          scrollToSection(currentIndex - 1);
        }
      }

      accumulatedDelta.current = 0;

      setTimeout(() => {
        setIsScrolling(false);
      }, SCROLL_LOCK_DURATION);
    },
    [currentSection, isScrolling, scrollToSection, splashEnded],
  );

  const handleTouchStart = useCallback((e: TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientY);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (currentSection !== 'contact') {
      e.preventDefault();
    }
    setTouchEnd(e.targetTouches[0].clientY);
  }, [currentSection]);

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd || isScrolling) return;
    
    const distance = touchStart - touchEnd;
    const isDownSwipe = distance > MIN_SWIPE_DISTANCE;
    const isUpSwipe = distance < -MIN_SWIPE_DISTANCE;

    if (!isDownSwipe && !isUpSwipe) return;

    const arr = sections.map(section => section.id);
    const currentIndex = arr.indexOf(currentSection);
    
    setIsScrolling(true);

    if (isDownSwipe) {
      // 아래로 스와이프 - 다음 섹션
      scrollToSection(currentIndex + 1);
    } else if (isUpSwipe) {
      // 위로 스와이프 - 이전 섹션
      if (splashEnded && currentIndex === 1) {
        setIsScrolling(false);
        return;
      }

      if (currentSection === 'work1') {
        scrollToSection(arr.indexOf('business1'));
      } else {
        scrollToSection(currentIndex - 1);
      }
    }

    setTimeout(() => {
      setIsScrolling(false);
    }, SCROLL_LOCK_DURATION);
  }, [touchStart, touchEnd, isScrolling, currentSection, scrollToSection, splashEnded]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isScrolling) return;

      const arr = sections.map(section => section.id);
      const currentIndex = arr.indexOf(currentSection);

      // ✅ 숫자 키 1~9를 눌러 해당 인덱스로 이동
      if (/^[1-9]$/.test(e.key)) {
        const targetIndex = Number(e.key) - 1;
        if (targetIndex >= 0 && targetIndex < arr.length) {
          scrollToSection(targetIndex);
          return;
        }
      }

      switch (e.key) {
        case 'ArrowDown':
        case ' ':
          e.preventDefault();
          scrollToSection(currentIndex + 1);
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (splashEnded && currentIndex === 1) return;
          scrollToSection(currentIndex - 1);
          break;
        case 'Home':
          e.preventDefault();
          scrollToSection(splashEnded ? 1 : 0);
          break;
        case 'End':
          e.preventDefault();
          scrollToSection(arr.indexOf('contact'));
          break;
      }
    },
    [currentSection, isScrolling, scrollToSection, splashEnded],
  );

  useEffect(() => {
    if (!containerRef.current) return;
    const ref = containerRef.current;

    ref.addEventListener('wheel', handleWheel, { passive: false });
    ref.addEventListener('touchstart', handleTouchStart, { passive: false });
    ref.addEventListener('touchmove', handleTouchMove, { passive: false });
    ref.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (ref) {
        ref.removeEventListener('wheel', handleWheel);
        ref.removeEventListener('touchstart', handleTouchStart);
        ref.removeEventListener('touchmove', handleTouchMove);
        ref.removeEventListener('touchend', handleTouchEnd);
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleWheel, handleKeyDown, handleTouchStart, handleTouchMove, handleTouchEnd]);

  const pageVariants = {
    initial: { y: '100%', opacity: 1 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 25, duration: 0.2 },
    },
    exit: {
      y: 0,
      opacity: 0.4,
      transition: { duration: 1, ease: 'easeOut' },
    },
  };

  const splashVariants = {
    initial: { opacity: 1 },
    animate: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  useEffect(() => {
    if (currentSection !== 'contact') {
      setIsFooterVisible(false);
      setIsScrollable(false);
    }
  }, [currentSection]);

  return (
    <HiddenScroll
      $scrollable={isScrollable}
      style={{ width: '100%' }}
    >
      <Header
        pageType='home'
        mode={
          currentSection === 'splash'
            ? 'light'
            : sections.find(section => section.id === currentSection)?.header || 'light'
        }
      />

      <Container ref={containerRef}>
        <AnimatePresence>
          {currentSection === 'splash' && (
            <SectionWrapper
              key='splash'
              variants={splashVariants}
              initial='initial'
              animate='animate'
              exit='exit'
            >
              <IntroSection
                onEndSplash={() => {
                  setSplashEnded(true);
                  scrollToSection(1);
                }}
              />
            </SectionWrapper>
          )}

          {currentSection === 'best' && (
            <SectionWrapper
              key='best'
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
              key='business'
              variants={pageVariants}
              initial='initial'
              animate='animate'
              exit='exit'
            >
              <BusinessSection step={currentSection === 'business1' ? 0 : 1} />
            </SectionWrapper>
          )}

          {currentSection === 'work1' && (
            <SectionWrapper
              key='work1'
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
              key='work2'
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
              key='news'
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
              key='contact'
              variants={pageVariants}
              initial='initial'
              animate='animate'
              exit='exit'
              onAnimationComplete={() => {
                setIsFooterVisible(true);
                setTimeout(() => {
                  setIsScrollable(true);
                }, 100);
              }}
            >
              <ContactSection />
            </SectionWrapper>
          )}
        </AnimatePresence>
      </Container>

      {isFooterVisible && <Footer />}
    </HiddenScroll>
  );
}
