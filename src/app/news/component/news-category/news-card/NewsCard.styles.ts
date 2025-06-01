import { colors, radius, shadow, spacing, typography } from "@/tokens";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { BadgeType } from "./NewsCard.types";

// ▸ 뱃지 색상 매핑 (고정 공지 제외)
const badgeColors: Record<BadgeType, { bg: string; text: string }> = {
  JAEDAM_NOTICE: { bg: colors.gray150, text: colors.gray700 },
  PRESS_RELEASE: { bg: colors.gray150, text: colors.gray700 },
  MEDIA_CONTENT: { bg: colors.gray150, text: colors.gray700 },
  SNS: { bg: colors.gray150, text: colors.gray700 },
};

// ▸ 카드 컨테이너
export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  min-height: 160px;
  padding: ${spacing.XL};
  gap: ${spacing.L};
  justify-content: space-between;
  border-radius: ${radius.r400};
  background-color: ${colors.white};
  border: 1px solid transparent;
  box-shadow: ${shadow.s100};
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    border: 1px solid ${colors.jaedamCyan};
    box-shadow: 0px 1px 8px 0px ${colors.black200};
  }
`;

// ▸ 날짜 텍스트
export const DateText = styled.p`
  ${typography["caption1-regular"]};
  color: ${colors.gray500};
`;

// ▸ 제목 텍스트
export const Title = styled.h3<{ hasBadge: boolean }>`
  ${typography["title2-bold"]};
  color: ${colors.gray900};

  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  ${({ hasBadge }) =>
    hasBadge
      ? css`
          -webkit-line-clamp: 2;
        `
      : css`
          -webkit-line-clamp: 2;
        `};

  @media (max-width: 1279px) {
    font-size: 16px;
    line-height: 22px;
  }
`;

// ▸ 뱃지 영역
export const Badge = styled.span<{
  category: BadgeType;
  isNoticeFixed?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing["4XS"]};
  padding: ${spacing["3XS"]} ${spacing["2XS"]};
  border-radius: ${radius.r100};
  ${typography["caption2-bold"]}; 


  ${({ isNoticeFixed, category }) =>
    isNoticeFixed
      ? css`
          background: rgba(34, 212, 221, 0.1);
          color: ${colors.jaedamCyan};
        `
      : css`
          background-color: ${badgeColors[category].bg};
          color: ${badgeColors[category].text};
        `}
`;

// ▸ 아이콘: 공지 전용
export const BadgeIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  object-fit: contain;
`;
