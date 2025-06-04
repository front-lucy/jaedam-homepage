// src/app/news/[id]/NewsDetail.styles.ts
import { colors, spacing } from '@/tokens';
import { typography } from '@/tokens/typography';
import styled from '@emotion/styled';

export const Wrapper = styled.main`
  width: 100%;
  padding-top: 30px; // Header 공간 고려
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ContentWrapper = styled.section`
  width: 100%;
  max-width: 800px;
  padding: ${spacing['5XL']} 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Inner = styled.div`
  font-size: 16px;
  color: ${colors.gray800};
  line-height: 26px;

  .ql-align-center {
    text-align: center;
  }
  .ql-align-left {
    text-align: left;
  }
  .ql-align-right {
    text-align: right;
  }
  .ql-align-justify {
    text-align: justify;
  }

  strong {
    font-weight: 700;
  }

  em {
    font-style: italic;
  }
  /* 
  p {
    margin-bottom: 1em;
  } */
`;
export const TitleSection = styled.section`
  position: relative;
  width: 100%;
  height: 320px;
  background-color: ${colors.gray100};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  gap: ${spacing['3XL']};
`;

export const BackgroundImage = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0%);
  height: auto;
  z-index: 0;
  overflow: hidden;
  object-fit: contain;
  img {
    width: 667px;
    height: auto;
    object-fit: cover;
    display: block;
  }
`;

export const Category = styled.p`
  position: relative;
  z-index: 1;
  color: ${colors.gray900};
  font-size: 18px;
  font-weight: 700;

  @media (max-width: 799px) {
    font-size: 16px;
  }
`;

export const Title = styled.h1`
  position: relative;
  z-index: 1;
  color: ${colors.black};
  max-width: 920px;
  ${typography['headline2-bold']};

  @media (max-width: 1279px) {
    ${typography['headline3-bold']};
  }
  @media (max-width: 799px) {
    ${typography['headline4-bold']};
  }
`;

export const Date = styled.p`
  position: relative;
  z-index: 1;
  color: ${colors.gray500};
  ${typography['body-bold']};
`;

// ✅ 첨부파일 섹션
export const AttachmentSection = styled.section`
  width: 100%;
  padding: ${spacing.L};
  border: 1px solid ${colors.gray150};
  border-radius: 8px;
  margin-top: 64px;
`;

export const AttachmentTitle = styled.h3`
  ${typography['body-bold']};
  color: ${colors.gray900};
  margin-bottom: 16px;
`;

export const AttachmentList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const AttachmentItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  color: ${colors.gray700};
  font-size: 14px;
  line-height: 1.6;

  div {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    color: inherit;
    word-break: break-all;
    cursor: pointer;
    &:hover {
      color: ${colors.jaedamCyan};
      text-decoration: underline;

      svg {
        color: ${colors.jaedamCyan};
      }
    }

    svg {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
      color: ${colors.gray400};
      transition: color 0.2s;
    }
  }
`;
