import { colors } from "@/tokens";
import styled from "@emotion/styled";

const SkeletonWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 40px 24px;
  width: 100%;

  @media (max-width: 1279px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 32px 20px;
  }

  @media (max-width: 799px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px 12px;
  }
`;

const SkeletonItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SkeletonImage = styled.div`
  width: 100%;
  aspect-ratio: 3 / 4;
  background: ${colors.gray100};
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: pulse 1.5s ease-in-out infinite;
  margin-bottom: 16px;

  @keyframes pulse {
    0% {
      opacity: 0.6;
    }
    50% {
      opacity: 0.8;
    }
    100% {
      opacity: 0.6;
    }
  }
`;

export const WorkGridSkeleton = () => {
  return (
    <SkeletonWrapper>
      {Array.from({ length: 24 }).map((_, index) => (
        <SkeletonItem key={index}>
          <SkeletonImage />
        </SkeletonItem>
      ))}
    </SkeletonWrapper>
  );
};
