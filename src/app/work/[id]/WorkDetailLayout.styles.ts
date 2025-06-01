import { colors } from "@/tokens";
import styled from "@emotion/styled";
import Image from "next/image";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 80px;
  padding: 64px 40px;
  @media (max-width: 1279px) {
    padding: 48px 24px 128px 24px;
  }
`;

// 전체 레퍼
export const Container = styled.main`
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-items: flex-start;
  gap: 64px;

  @media (max-width: 1279px) {
    display: flex;
    align-items: flex-start;
    gap: 32px;
  }
`;

export const BackLink = styled.div`
  width: 100%;
  display: flex;
  width: 60px;
  height: 60px;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  border: 1px solid ${colors.gray150};

  @media (max-width: 799px) {
    position: absolute;
    top: 0;
    border-radius: 50%;
    padding: 4px;
    z-index: 10;
  }
`;

// const isDesktop = useMediaQuery("(min-width: 1280px)");
// const isTablet = useMediaQuery("(min-width: 800px) and (max-width: 1279px)");
// const isMobile = useMediaQuery("(max-width: 799px)");
// 컨텐츠 레퍼
export const ContentWrapper = styled.div`
  display: flex;
  gap: 40px;
  align-items: flex-start;
  position: relative;

  @media (max-width: 1279px) {
    flex-direction: row;
    align-items: flex-start;
    gap: 32px;
  }

  @media (max-width: 799px) {
    flex-direction: column-reverse;
    align-items: center;
    gap: 32px;
  }
`;

export const TextSection = styled.section`
  flex: 1;
  width: 100%;
 
  @media (max-width: 1279px) {
    width: 556px;
  }
  @media (min-width: 800px) and (max-width: 1279px) {
    width: 390px;
  }
  @media (max-width: 799px) {
    width: 301px;
  }
`;

export const Logline = styled.div`
  color: ${colors.jaedamCyan};
  font-weight: 700;
  margin-bottom: 16px;
  font-size: 14px;

  @media (min-width: 1280px) {
    font-size: 16px;
  }
`;

export const Title = styled.h1`
  font-weight: 700;
  line-height: normal;
  margin-bottom: 16px;
  font-size: 44px;

  @media (max-width: 799px) {
    font-size: 40px;
  }
`;

export const Writer = styled.div`
  color: ${colors.gray900};
  margin-bottom: 48px;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.6;

  @media (max-width: 799px) {
    margin-bottom: 24px;
  }
`;

export const Synopsis = styled.div`
  white-space: pre-line;
  margin-bottom: 48px;
  color: ${colors.gray800};
  font-size: 16px;
  line-height: 26px;
  font-weight: 400;
`;

export const Meta = styled.dl`
  display: grid;
  grid-template-columns: max-content 1fr;
  row-gap: 8px;
  column-gap: 4px;
  font-size: 14px;
  margin-bottom: 48px;

  dt {
    font-weight: 700;
    color: ${colors.gray900};
    min-width: 100px;
  }

  dd {
    color: ${colors.gray900};
  }
`;

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
`;

export const Tag = styled.span`
  background: ${colors.gray200};
  color: ${colors.gray900};
  font-size: 13px;
  padding: 4px 10px;
  border-radius: 4px;
`;

export const LinkList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const LinkButton = styled.a`
  padding: 8px 16px;
  border: 1px solid ${colors.gray900};
  border-radius: 20px;
  font-weight: 500;
  font-size: 14px;
  color: ${colors.gray900};
  text-decoration: none;
  white-space: nowrap;
`;

export const ThumbnailWrapper = styled.section`
  position: relative;
  width: 520px;
  height: 604px;

  @media (max-width: 1279px) {
    width: 402px;
    height: 456px;
  }
  @media (max-width: 799px) {
    margin-bottom: 16px;
    width: 301px;
    height: 342px;
  }
`;
export const VisualBubbleWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%;
  height: auto;

  @media (max-width: 799px) {
    left: 5%;
  }
`;
export const VisualBubble = styled(Image)`
  width: 520px;
  height: 411px;
  z-index: -99;

  @media (max-width: 1279px) {
    width: 402px;
    height: 318px;
  }
  @media (max-width: 799px) {
    width: 300px;
    height: 237px;
  }
`;
export const Thumbnail = styled(Image)`
  position: absolute;
  z-index: 2;
  border-radius: 12px;
  object-fit: cover;
  top: 82px;
  left: 98px;

  @media (max-width: 1279px) {
    width: 270px;
    height: 391px;
    top: 64px;
    left: 66px;
  }
  @media (max-width: 799px) {
    width: 203px;
    height: 294px;
    top: 48px;
    left: 48px;
  }
`;
