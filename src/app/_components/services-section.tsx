'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import styled from '@emotion/styled';

interface ServicesSectionProps {
  className?: string;
}

const Section = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
`;

const Container = styled(motion.div)`
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 1.5rem;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  
  @media (min-width: 768px) {
    font-size: 3.5rem;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ServiceCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 1.5rem;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const ServiceIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
`;

const ServiceTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const ServiceDescription = styled.p`
  font-size: 0.9rem;
  opacity: 0.9;
  line-height: 1.6;
`;

export function ServicesSection({ className }: ServicesSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    amount: 0.2,
    margin: "-50px"
  });

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

  const services = [
    {
      icon: "💻",
      title: "웹 개발",
      description: "최신 기술 스택으로 반응형 웹사이트와 웹 애플리케이션을 개발합니다."
    },
    {
      icon: "📱",
      title: "모바일 앱",
      description: "iOS와 Android를 위한 네이티브 및 크로스 플랫폼 앱을 제작합니다."
    },
    {
      icon: "🎨",
      title: "UI/UX 디자인",
      description: "사용자 중심의 직관적이고 아름다운 인터페이스를 디자인합니다."
    },
    {
      icon: "☁️",
      title: "클라우드 솔루션",
      description: "확장 가능하고 안전한 클라우드 인프라를 구축하고 관리합니다."
    }
  ];

  return (
    <Section 
      ref={ref}
      className={className}
    >
      <Container
        variants={pageVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <Title>
          우리가 제공하는 서비스
        </Title>
        
        <ServicesGrid>
          {services.map((service, index) => (
            <ServiceCard key={index}>
              <ServiceIcon>{service.icon}</ServiceIcon>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </Container>
    </Section>
  );
} 