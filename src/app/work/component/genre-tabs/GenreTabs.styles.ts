import { colors } from "@/tokens";
import styled from "@emotion/styled";

export const TabList = styled.ul`
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  padding: 0 24px;
  justify-content: center;
  gap: 40px;

  @media (max-width: 1279px) {
    justify-content: flex-start;
    padding: 0 20px;
    gap: 32px;
  }

  @media (max-width: 799px) {
    padding: 0 16px;
    gap: 24px;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const TabItem = styled.li<{ active: boolean }>`
  font-family: "Pretendard", sans-serif;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  color: ${({ active }) => (active ? colors.black : colors.gray400)};
  border-bottom: ${({ active }) =>
    active ? `2px solid ${colors.black}` : "none"};

  font-size: 18px;

  @media (max-width: 1279px) {
    font-size: 16px;
  }

  @media (max-width: 799px) {
    font-size: 16px;
  }

  padding: 12px 4px;
`;
