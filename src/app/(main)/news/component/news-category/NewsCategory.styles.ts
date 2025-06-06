import { colors, spacing } from "@/tokens";
import styled from "@emotion/styled";

interface StyledProps {
  isActive: boolean;
}

export const TabList = styled.div`
  width: 100%;
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  padding: 0 24px;
  justify-content: center;
  gap: 40px;

  @media (max-width: 1279px) {
    justify-content: center;
    padding: 0 20px;
    gap: 32px;
  }

  @media (max-width: 799px) {
    justify-content: flex-start;
    padding: 0 16px;
    gap: 24px;
  }

  //   /* Desktop (≥1280px) */
  @media (min-width: 1280px) {
    justify-content: center;
    gap: ${spacing["3XL"]}; /* 40px */
    margin: 0 auto;
  }

  /* Tablet (800px ~ 1279px) */
  @media (min-width: 800px) and (max-width: 1279px) {
    justify-content: center;
    gap: ${spacing["2XL"]}; /* 32px */
    margin-left: 0;
  }
  /* Mobile (≤799px) */
  @media (max-width: 799px) {
    justify-content: center;
    gap: ${spacing.XL}; /* 24px */
    margin-left: 0;
  }

  /* SMobile (≤500px) */
  @media (max-width: 450px) {
    justify-content: flex-start;
    gap: ${spacing.XL}; /* 24px */
    margin-left: 0;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

/** 각 탭 버튼 */

export const TabButton = styled.button<StyledProps>`
  all: unset;
  cursor: pointer;
  padding: ${spacing["3XS"]} 0 ${spacing.S} 0;
  text-align: center;
  white-space: nowrap;
  font-size: 28px;
  font-weight: 700;
  line-height: normal;

  color: ${({ isActive }) => (isActive ? colors.gray900 : colors.gray600)};
  border-bottom: ${({ isActive }) =>
    isActive ? `4px solid ${colors.jaedamCyan}` : "4px solid transparent"};

  /* Tablet (800px ~ 1279px) */
  @media (min-width: 800px) and (max-width: 1279px) {
    font-size: 18px;
    border-bottom: ${({ isActive }) =>
      isActive ? `3px solid ${colors.jaedamCyan}` : "3px solid transparent"};
  }

  /* Mobile (≤799px) */
  @media (max-width: 799px) {
    font-size: 18px;
    border-bottom: ${({ isActive }) =>
      isActive ? `3px solid ${colors.jaedamCyan}` : "3px solid transparent"};
  }
`;
