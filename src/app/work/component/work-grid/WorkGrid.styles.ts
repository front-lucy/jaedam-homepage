import { colors } from "@/tokens";
import styled from "@emotion/styled";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 40px 24px;

  @media (max-width: 1279px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 32px 20px;
  }

  @media (max-width: 799px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px 12px;
  }
`;

export const Item = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
`;

export const Thumbnail = styled.img`
  display: block;
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
`;

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;

  ${Item}:hover & {
    opacity: 1;
  }
`;

export const Title = styled.div`
  color: ${colors.white};
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  line-height: 1.4;
  padding: 0 8px;
  word-break: keep-all;
`;
