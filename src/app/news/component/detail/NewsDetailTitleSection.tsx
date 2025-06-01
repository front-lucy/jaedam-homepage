"use client";

import BgBubble from "@/assets/icons/NEWS_JD_Visua-bubblel.png";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import { tabMap } from "../news-category/news-card/NewsCard.types";
import * as S from "./NewsDetail.styles";

type Props = {
  category: keyof typeof tabMap;
  title: string;
  noticedAt: string;
};

export const NewsDetailTitleSection = ({ category, title, noticedAt }: Props) => {
  return (
    <S.TitleSection>
      <S.BackgroundImage>
        <Image src={BgBubble} alt="" aria-hidden priority />
      </S.BackgroundImage>
      <S.Category>{tabMap[category]}</S.Category>
      <S.Title>{title}</S.Title>
      <S.Date>{formatDate(noticedAt)}</S.Date>
    </S.TitleSection>
  );
};
