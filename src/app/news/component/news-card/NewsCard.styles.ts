import { colors, radius, shadow, spacing } from "@/tokens";
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
export const CardContainer = styled.div<{ isActive?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  min-height: 160px;
  padding: ${spacing.XL};
  gap: ${spacing.S};

  border-radius: ${radius.r400};
  background-color: ${colors.white};
  border: 1px solid transparent;
  box-shadow: ${shadow.s100};

  transition: all 0.2s ease;
  cursor: pointer;

  ${({ isActive }) =>
    isActive &&
    css`
      border-color: ${colors.jaedamCyan};
      box-shadow: 0px 1px 8px 0px ${colors.black200};
    `}

  &:hover {
    border: 1px solid ${colors.jaedamCyan};
    box-shadow: 0px 1px 8px 0px ${colors.black200}; // hover 시 shadow-200
  }
`;

// ▸ 날짜 텍스트
export const DateText = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: ${colors.gray400};
`;

// ▸ 제목 텍스트
export const Title = styled.h3<{ hasBadge: boolean }>`
  font-size: 15px;
  font-weight: 700;
  color: ${colors.gray900};
  line-height: 1.5;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  ${({ hasBadge }) =>
    hasBadge
      ? css`
          -webkit-line-clamp: 1;
        `
      : css`
          -webkit-line-clamp: 2;
        `}
`;

// ▸ 뱃지 영역
export const Badge = styled.span<{
  badgeType: BadgeType;
  isNoticeFixed?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.XS};
  padding: ${spacing.S} ${spacing.M};
  border-radius: ${radius.r100};

  font-size: 13px;
  font-weight: 700;
  font-family: "Pretendard", sans-serif;
  line-height: 20px;

  ${({ isNoticeFixed, badgeType }) =>
    isNoticeFixed
      ? css`
          background-color: rgba(34, 212, 221, 0.1);
          color: ${colors.jaedamCyan};
        `
      : css`
          background-color: ${badgeColors[badgeType].bg};
          color: ${badgeColors[badgeType].text};
        `}
`;

// ▸ 아이콘: 공지 전용
export const BadgeIcon = styled.span`
  display: inline-block;
  width: 14px;
  height: 14px;
  background-image: url("/icons/Icon-alram-fill.svg"); // 실제 경로로 변경
  background-size: contain;
  background-repeat: no-repeat;
`;
