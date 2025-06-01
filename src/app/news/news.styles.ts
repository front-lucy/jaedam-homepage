import { colors } from "@/tokens";
import styled from "@emotion/styled";

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;

  @media (min-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
`;

export const LayoutWrapper = styled.div`
  display: flex;
  max-width: 1920px;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  margin: 0 auto;

  padding: calc(64px + 48px) 24px 128px 24px;
  gap: 48px;

  @media (max-width: 1279px) {
    padding: calc(64px + 48px) 16px 128px 16px;
    gap: 32px;
  }
`;

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
