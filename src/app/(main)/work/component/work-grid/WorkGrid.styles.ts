import BubbleIcon from "@/assets/icons/jd_visua-bubblel.svg";
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

  &:hover .overlay {
    opacity: 1;
  }
`;

export const Thumbnail = styled.img`
  display: block;
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  border: 1px solid rgba(255, 255, 255, 0.1); // 1px 테두리
`;

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  opacity: 0;
  transition: opacity 0.3s ease-in;
  pointer-events: none;
  padding: 40px 24px;
  @media (max-width: 1279px) {
    padding: 28px 24px;
  }

  @media (max-width: 799px) {
    padding: 24px 20px;
  }

  @media (max-width: 499px) {
    padding: 20px 18px;
  }
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  &.overlay {
    opacity: 0;
  }
`;
export const BubbleWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 38%;
  aspect-ratio: 1.27 / 1; /* 말풍선의 비율 (120.85 / 95.49 ≈ 1.27) */
  flex-shrink: 0;

  background-image: url("/assets/icons/JD_Visua-bubblel.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

export const Bubble = styled(BubbleIcon)`
  width: 100%;
  height: auto;
  display: block;
`;

export const Title = styled.div`
  font-weight: 700;
  color: ${colors.white};
  text-align: center;
  line-height: normal;

  font-size: 22px;

  @media (max-width: 1279px) {
    font-size: 20px;
  }

  @media (max-width: 499px) {
    font-size: 16px;
  }

  font-weight: 700;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 8px;
`;
