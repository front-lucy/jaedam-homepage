import { colors, spacing } from "@/tokens";
import styled from "@emotion/styled";

// 전체 wrapper
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

// 제목
export const Title = styled.h2`
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
// TabListWrapper.ts
export const TabListWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  display: flex;
  justify-content: flex-start; // 좌측 정렬
`;

// TabList.ts
export const TabList = styled.ul`
  display: flex;
  align-items: center;
  gap: ${spacing.L};
  flex-shrink: 0;
  width: max-content;

  &.centered {
    margin: 0 auto;
  }

  &.scrollable {
    margin-left: 0;
  }
`;

// 탭 항목
export const TabItem = styled.li<{ isActive: boolean }>`
  position: relative;
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
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: ${({ isActive }) =>
      isActive ? colors.jaedamCyan : "transparent"};
    transition: background-color 0.2s ease-in-out;
  }

  @media (max-width: 1024px) {
    font-size: 18px;

    &::after {
      height: 3px;
    }
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;
