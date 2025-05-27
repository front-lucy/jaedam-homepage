import { colors, typography } from "@/tokens";
import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

export const Title = styled.h2`
  font-family: ${typography.fontFamily};
  font-size: 64px;
  font-weight: 700;
  color: ${colors.gray900};

  @media (max-width: 1024px) {
    font-size: 44px;
  }

  @media (max-width: 768px) {
    font-size: 40px;
  }
`;

export const TabList = styled.ul`
  display: flex;
  gap: 48px;
  list-style: none;
  padding: 0;
  justify-content: center;
  align-items: center;
  position: relative;

  @media (max-width: 1024px) {
    gap: 32px;
    overflow-x: auto;
    padding: 0 32px;
    justify-content: flex-start;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const TabItem = styled.li<{ isActive: boolean }>`
  position: relative;
  font-family: ${typography.fontFamily};
  font-size: 20px;
  font-weight: 700;
  color: ${({ isActive }) => (isActive ? colors.gray900 : colors.gray600)};
  cursor: pointer;
  padding: 4px 0 12px;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: "";
    display: ${({ isActive }) => (isActive ? "block" : "none")};
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: ${colors.jaedamCyan};
  }

  @media (max-width: 1024px) {
    font-size: 18px;
    padding: 4px 0 12px;
  }

  @media (max-width: 768px) {
    font-size: 16px;
    font-weight: 700;
  }
`;
