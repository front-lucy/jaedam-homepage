"use client";

import IconAlert from "@/assets/icons/Icon-alram-fill.svg";
import * as S from "./NewsCard.styles";
import { NewsCardProps, tabMap } from "./NewsCard.types";

export const NewsCard = ({
  noticedAt,
  title,
  category,
  important,
  onClick,
  className,
}: NewsCardProps) => {
  return (
    <S.CardContainer onClick={onClick} className={className}>
      <S.DateText>{noticedAt}</S.DateText>

      <S.Title hasBadge={!!category}>{title}</S.Title>

      {category && (
        <S.Badge category={category} isNoticeFixed={important}>
          {important && (
            <S.BadgeIcon>
              <IconAlert />
            </S.BadgeIcon>
          )}
          {tabMap[category]}
        </S.Badge>
      )}
    </S.CardContainer>
  );
};
