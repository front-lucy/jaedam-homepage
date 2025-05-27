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
    font-size: 32px;
  }

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const TabList = styled.ul`
  display: flex;
  gap: 48px;
  list-style: none;
  padding: 0;
  justify-content: center;
  align-items: center;

  @media (max-width: 1024px) {
    gap: 32px;
    overflow-x: auto;
    padding: 0 32px;
    justify-content: flex-start;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  @media (max-width: 1024px) {
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const TabItem = styled.li<{ isActive: boolean }>`
  position: relative;
  font-size: 20px;
  font-weight: 700;
  color: ${({ isActive }) => (isActive ? colors.gray900 : colors.gray600)};
  cursor: pointer;
  padding: 4px 0 12px;

  &:hover {
    color: ${colors.gray900};

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      height: 3px;
      width: 100%;
      background-color: ${colors.jaedamCyan};
    }
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

export const Underline = styled.div`
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: ${colors.jaedamCyan};
`;
