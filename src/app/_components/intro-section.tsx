'use client';

import JaedamLogoENG from '@/assets/icons/Logo-Jaedam-Eng.png';
import SpeechBubbleSVG from '@/assets/icons/visual-bubble.svg';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useDeviceType } from '@/hooks/useDeviceType';
import { useWindowSize } from '@/hooks/useWindowSize';

const Wrapper = styled.div<{ isFixed: boolean }>`
  position: ${({ isFixed }) => (isFixed ? 'fixed' : 'relative')};
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  background: white;
  overflow: hidden;
  z-index: 10;
`;

const Canvas = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

const TextLine = styled(motion.div)<{ fontSize?: string }>`
  font-family: Pretendard, serif;
  display: flex;
  gap: 16px;
  line-height: 1;
  color: #111;
  
  font-size: ${props => props.fontSize || '120px'};
`;

const Bold = styled.span`
  font-weight: 800;
`;

const Light = styled.span`
  font-weight: 300;
`;

const Tag = styled(motion.div)<{ angle: number; width: string; height: string; fontSize: string }>`
  position: absolute;
  background-color: #22d4dd;
  color: white;
  font-weight: bold;
  width: ${props => props.width};
  height: ${props => props.height};
  font-size: ${props => props.fontSize};
  border-radius: 900px;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(34, 212, 221, 0.1);
  transform: translate(-50%, -50%) rotate(${props => props.angle}deg);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-shrink: 0;
`;

const styleVariants = {
  desktop: {
    title: {
      fontSize: '120px',
      lineHeight: '100%',
    },
    bubble: {
      width: '454px',
      height: 'auto',
    }
  },
  tablet: {
    title: {
      fontSize: '90px',
      lineHeight: '100%',
    },
    bubble: {
      width: '454px',
      height: 'auto',
    }
  },
  mobile: {
    title: {
      fontSize: '60px',
      lineHeight: '100%',
    },
    bubble: {
      width: '363px',
      height: 'auto',
    }
  },
}

const badgeVariants = {
  desktop: {
    width: '160px',
    height: '45px',
    fontSize: '18px',
  },
  tablet: {
    width: '128px',
    height: '36px',
    fontSize: '14px',
  },
  mobile: {
    width: '90px',
    height: '25px',
    fontSize: '10px',
  },
};

const v2Tags = {
  desktop: [
    { label: 'WEBTOON', x: 0.214, y: 0.287, angle: -12 }, // 왼쪽: 410/1920, 310/1080
    { label: 'COMIC BOOK', x: 0.182, y: 0.479, angle: 0 }, // 왼쪽: 350/1920, 517/1080
    { label: 'CHARACTER', x: 0.219, y: 0.649, angle: 12 }, // 왼쪽: 420/1920, 701/1080
    { label: 'WEB NOVEL', x: 0.786, y: 0.287, angle: 12 }, // 오른쪽: (1920-410)/1920, 310/1080
    { label: 'MOVIE', x: 0.818, y: 0.479, angle: 0 }, // 오른쪽: (1920-350)/1920, 517/1080
    { label: 'IP BIZ', x: 0.781, y: 0.649, angle: -12 }, // 오른쪽: (1920-420)/1920, 701/1080
  ],
  tablet: [
    { label: 'WEBTOON', x: 0.023, y: 0.323, angle: -12 }, // 18/800, 349/1080
    { label: 'COMIC BOOK', x: -0.038, y: 0.482, angle: 0 }, // -30/800, 521/1080
    { label: 'CHARACTER', x: 0.033, y: 0.62, angle: 12 }, // 26/800, 670/1080
    { label: 'WEB NOVEL', x: 0.831, y: 0.32, angle: 12 }, // 665/800, 346/1080
    { label: 'MOVIE', x: 0.878, y: 0.482, angle: 0 }, // 702/800, 521/1080
    { label: 'IP BIZ', x: 0.821, y: 0.621, angle: -12 }, // 657/800, 671/1080
  ],
  mobile: [
    { label: 'WEBTOON', x: -0.104, y: 0.336, angle: -12 }, // -39/375, 273/812
    { label: 'COMIC BOOK', x: -0.195, y: 0.484, angle: 0 }, // -73/375, 393/812
    { label: 'CHARACTER', x: -0.091, y: 0.611, angle: 12 }, // -34/375, 496/812
    { label: 'WEB NOVEL', x: 0.891, y: 0.336, angle: 12 }, // 334/375, 273/812
    { label: 'MOVIE', x: 0.960, y: 0.484, angle: 0 }, // 360/375, 393/812
    { label: 'IP BIZ', x: 0.877, y: 0.610, angle: -12 }, // 329/375, 496/812
  ],
};

interface IntroSectionProps {
  onEndSplash: () => void;
}

export function IntroSection({ onEndSplash }: IntroSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const [step, setStep] = useState(3);
  const [expandBubble, setExpandBubble] = useState(false);
  const [bubbleIn, setBubbleIn] = useState(false);
  const windowSize = useWindowSize();

  const device = useDeviceType();

  const isFixed = step < 5;
  const MotionSpeechBubble = motion.create(SpeechBubbleSVG);
  const MotionLogo = motion.img;

  useEffect(() => {
    if (step === 3) {
      setBubbleIn(true);
    }
    if (step === 4) {
      setExpandBubble(true);
    }
    if (step === 5) {
      onEndSplash();
    }
  }, [step, onEndSplash]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const hexToRGBA = (hex: string, alpha: number) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const createDot = (): Dot => ({
      active: true,
      diameter: Math.random() * 4,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      velocity: {
        x: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 0.15,
        y: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 0.15,
      },
      alpha: 0.05,
      hex: '#22D4DD',
      color: hexToRGBA('#22D4DD', 0.05),
    });
    const updateDot = (dot: Dot) => {
      if (dot.alpha < 0.4) {
        dot.alpha += 0.005;
        dot.color = hexToRGBA(dot.hex, dot.alpha);
      }
      dot.x += dot.velocity.x;
      dot.y += dot.velocity.y;
      if (dot.x > canvas.width + 10 || dot.x < -10 || dot.y > canvas.height + 10 || dot.y < -10) {
        dot.active = false;
      }
    };
    const drawDot = (dot: Dot) => {
      ctx.fillStyle = dot.color;
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.diameter, 0, Math.PI * 2);
      ctx.fill();
    };
    const animate = () => {
      if (dotsRef.current.length < 30) {
        for (let i = dotsRef.current.length; i < 30; i++) {
          dotsRef.current.push(createDot());
        }
      }
      dotsRef.current.forEach(updateDot);
      dotsRef.current = dotsRef.current.filter(dot => dot.active);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dotsRef.current.forEach(drawDot);
      requestAnimationFrame(animate);
    };
    const resize = () => {
      dotsRef.current = [];
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    animate();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const tagVariants = {
    initial: (custom: { x: number; y: number }) => ({
      x: custom.x * windowSize.width,
      y: custom.y * windowSize.height,
      opacity: 0,
    }),
  };

  return (
    <Wrapper isFixed={isFixed}>
      <Canvas ref={canvasRef} />
      {step >= 1 && (
        <Overlay>
          <TextLine
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: expandBubble ? 0 : 1 }}
            transition={{ duration: 0.8, opacity: { duration: 0.1 } }}
            fontSize={styleVariants[device].title.fontSize}
          >
            <Bold>세상</Bold>
            <Light>의 모든</Light>
          </TextLine>
          <TextLine
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: expandBubble ? 0 : 1 }}
            transition={{
              duration: 0.8,
              opacity: { duration: 0.1 },
            }}
            fontSize={styleVariants[device].title.fontSize}
          >
            <Bold>재미</Bold>
            <Light>를 담다</Light>
          </TextLine>
        </Overlay>
      )}
      {step >= 2 &&
        windowSize.width > 0 &&
        v2Tags[device].map(tag => {
          const x = tag.x * windowSize.width;
          const y = tag.y * windowSize.height;
          return (
            <Tag
              key={tag.label}
              angle={tag.angle}
              width={badgeVariants[device].width}
              height={badgeVariants[device].height}
              fontSize={badgeVariants[device].fontSize}
              initial={{
                x,
                y,
              }}
              custom={{ x, y }}
              animate={{
                x,
                y,
                opacity: expandBubble ? 0 : 1,
                scale: 1,
                rotate: `${-tag.angle}deg`,
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {tag.label}
            </Tag>
          );
        })}
      {step === 3 && bubbleIn && (
        <MotionSpeechBubble
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: styleVariants[device].bubble.width,
            zIndex: -1,
          }}
          initial={{ x: '-50%', y: '50vh', scale: 1, opacity: 0 }}
          animate={{ x: '-50%', y: '-50%', scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      )}
      {step === 4 && expandBubble && (
        <>
          <MotionSpeechBubble
            style={{
              position: 'absolute',
              left: '36%',
              top: '30%',
              transform: 'translate(-50%, -50%)',
              width: '454px',
              zIndex: -1,
            }}
            initial={{ scale: 1 }}
            animate={{ scale: 10 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <MotionLogo
              src={JaedamLogoENG.src}
              alt='Jaedam Logo'
              style={{
                width: '667px',
                height: 'auto',
                zIndex: 0,
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 1, ease: 'easeOut' }}
            />
          </div>
        </>
      )}
    </Wrapper>
  );
}

interface Dot {
  active: boolean;
  diameter: number;
  x: number;
  y: number;
  velocity: { x: number; y: number };
  alpha: number;
  hex: string;
  color: string;
}
