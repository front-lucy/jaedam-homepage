'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import styled from '@emotion/styled';

interface ContactSectionProps {
  className?: string;
}

const Section = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
  color: #333;
`;

const Container = styled(motion.div)`
  max-width: 64rem;
  margin: 0 auto;
  padding: 0 1.5rem;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #333;
  
  @media (min-width: 768px) {
    font-size: 3.5rem;
  }
`;

const Description = styled.p`
  font-size: 1.25rem;
  margin-bottom: 3rem;
  opacity: 0.8;
  max-width: 48rem;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  color: #555;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ContactCard = styled.div`
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 1.5rem;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.4);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const ContactIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const ContactTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
`;

const ContactInfo = styled.p`
  font-size: 1rem;
  color: #555;
`;

const CTAButton = styled(motion.button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.25rem 3rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 1.125rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
  }
`;

export function ContactSection({ className }: ContactSectionProps) {
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

  const contacts = [
    {
      icon: "📧",
      title: "이메일",
      info: "contact@company.com"
    },
    {
      icon: "📞",
      title: "전화",
      info: "+82 2-1234-5678"
    },
    {
      icon: "📍",
      title: "주소",
      info: "서울시 강남구 테헤란로"
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
          함께 시작해보세요
        </Title>
        
        <Description>
          새로운 프로젝트나 아이디어가 있으시다면 언제든 연락주세요.
          전문가 팀이 최고의 솔루션을 제공해드리겠습니다.
        </Description>

        <ContactGrid>
          {contacts.map((contact, index) => (
            <ContactCard key={index}>
              <ContactIcon>{contact.icon}</ContactIcon>
              <ContactTitle>{contact.title}</ContactTitle>
              <ContactInfo>{contact.info}</ContactInfo>
            </ContactCard>
          ))}
        </ContactGrid>
        
        <CTAButton
          whileHover={{ 
            scale: 1.05,
            transition: { type: "spring", stiffness: 400, damping: 10 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          지금 상담받기
        </CTAButton>
      </Container>
    </Section>
  );
} 