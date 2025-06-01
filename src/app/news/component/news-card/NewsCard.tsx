"use client";

import * as S from "./NewsCard.styles";
import { NewsCardProps, tabMap } from "./NewsCard.types";

export const NewsCard = ({
  date,
  title,
  badgeType,
  isActive,
  onClick,
  className,
}: NewsCardProps) => {
  // 상단 고정 공지 여부 (공지 태그가 있고, 그게 상단 고정일 경우)
  const isFixedNotice = badgeType === "JAEDAM_NOTICE";

  return (
    <S.CardContainer
      isActive={isActive}
      onClick={onClick}
      className={className}
    >
      <S.DateText>{date}</S.DateText>

      <S.Title hasBadge={!!badgeType}>{title}</S.Title>

      {badgeType && (
        <S.Badge badgeType={badgeType} isNoticeFixed={isFixedNotice}>
          {isFixedNotice && <S.BadgeIcon aria-hidden />}
          {tabMap[badgeType]}
        </S.Badge>
      )}
    </S.CardContainer>
  );
};
