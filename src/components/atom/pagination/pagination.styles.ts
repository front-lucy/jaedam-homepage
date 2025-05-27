// src/components/atom/Pagination/Pagination.styles.ts

import { colors } from "@/tokens";
import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const PageButton = styled.button<{ isActive: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ isActive }) => (isActive ? colors.white : colors.gray600)};
  background-color: ${({ isActive }) =>
    isActive ? colors.jaedamCyan : colors.gray100};
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ isActive }) =>
      isActive ? colors.jaedamCyan : colors.gray200};
  }
`;

export const ArrowButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background: ${colors.gray100};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${colors.gray900};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.3;
  }
`;

export const IconWrapper = styled.span`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
