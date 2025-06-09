import { colors, spacing, typography } from '@/tokens';
import styled from '@emotion/styled';

export const WebtoonWrapper = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  justify-content: center;
  padding-bottom: 100px;
  @media (max-width: 768px) {
    padding-bottom: 90px;
  }
`;

export const IntroWrapper = styled.section<{ backgroundImage: string }>`
  position: relative;
  width: 100vw;
  height: 350px;
  overflow: hidden;
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  @media (max-width: 768px) {
    width: 100%;
    height: 400px;
  }
`;

export const Overlay = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  z-index: -1;
  background-color: rgba(0, 0, 0, 0.8);
  mix-blend-mode: multi;
`;

export const Content = styled.div`
  position: absolute;
  z-index: 99;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const Title = styled.h2`
  ${typography['headline3-bold']};
  color: white;
  text-align: center;

  @media (max-width: 799px) {
    ${typography['title1-bold']};
  }
`;

export const SubText = styled.p`
  ${typography['body-regular']};
  color: white;
  line-height: 1.6;
  margin-top: 16px;
  text-align: center;

  @media (max-width: 799px) {
    ${typography['caption1-regular']};
    line-height: 1.5;
    width: 327px;
  }
`;

// -------------------------------------- //
export const StatsWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  max-width: 1024px;
  padding: 64px 24px;
  align-self: stretch;
  margin: 0 auto;
  margin-top: 64px;

  @media (max-width: 799px) {
    flex-direction: column;
    padding: 48px 24px;
    gap: 48px;
    margin-top: 48px;
  }
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 176px;
  @media (max-width: 1279px) {
    min-width: 176px;
  }
  @media (min-width: 800px) and (max-width: 1279px) {
    min-width: 131px;
  }
  @media (max-width: 599px) {
  }
`;

export const StatValue = styled.div`
  ${typography['display2-black']};
  color: #111;
  text-align: center;

  @media (max-width: 1279px) {
    ${typography['headline1-black']};
  }

  @media (max-width: 799px) {
    ${typography['headline1-black']};
  }
`;

export const StatLabel = styled.div`
  ${typography['title3-medium']};
  color: #111;
  text-align: center;
  margin-top: 8px;

  @media (max-width: 799px) {
    ${typography['body-medium']};
  }
`;

// -------------------------------------- //
export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 24px;
  max-width: 1024px;
  margin: 0 auto;
  margin-top: 64px;
  @media (max-width: 768px) {
    max-width: 327px;
    padding: 0;
  }
`;

export const SectionContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 40px;
  padding: 48px 0;
  border-bottom: 1px solid ${colors.gray200};

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 32px 0;
  }

  &:first-of-type {
    border-top: 1px solid ${colors.gray200};
  }
`;

export const TextCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  min-width: 564px;

  @media (max-width: 1279px) {
    min-width: 564px;
  }
  @media (min-width: 800px) and (max-width: 1279px) {
    min-width: 360px;
  }
  @media (max-width: 599px) {
    gap: 24px;
  }
`;

export const Category = styled.h3`
  ${typography['title2-bold']};
  color: #111;

  @media (max-width: 599px) {
  }
`;

export const Description = styled.p`
  ${typography['title3-medium']};
  color: #666;
  margin-bottom: 16px;

  @media (min-width: 800px) and (max-width: 1279px) {
    ${typography['body-regular']};
  }
  @media (max-width: 599px) {
    ${typography['caption1-regular']};
    margin-bottom: 0;
  }
`;

export const Keyword = styled.p`
  ${typography['body-medium']};
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${colors.jaedamCyan}; // 강조
`;

export const ProcessCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.S};
  max-width: 400px;
`;

export const ProcessTitle = styled.div`
  ${typography['body-medium']};
  font-weight: 600;
  color: ${colors.gray200};
`;

export const ProcessItem = styled.div`
  ${typography['body-medium']};
  color: #111;

  span {
    color: ${colors.gray200};
    font-weight: 700;
    margin-right: 8px;
  }

  @media (max-width: 599px) {
    ${typography['caption1-regular']};
  }
`;
