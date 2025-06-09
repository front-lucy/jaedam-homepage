'use client';

import * as S from './NewsDetail.styles';
import * as R from '@/app/_components/layout/container';
import { NewsDetailProps } from './NewsDetail.type';
import { NewsDetailAttachment } from './NewsDetailAttachment';
import { NewsDetailTitleSection } from './NewsDetailTitleSection';
import { css } from '@emotion/react';

export const NewsDetailLayout = ({ category, title, noticedAt, content, fileList }: NewsDetailProps) => {
  return (
    <R.CommonContainer css={
      css`
        padding: 80px 0 64px 0;
        justify-content: center;
        @media (max-width: 1279px) {
          padding: 64px 0 64px 0;
        }
      `
    }>
        <NewsDetailTitleSection
          category={category as import('@/app/(main)/news/component/news-category/news-card/NewsCard.types').TabKey}
          title={title}
          noticedAt={noticedAt}
        />

        <S.ContentWrapper>
          <S.Inner dangerouslySetInnerHTML={{ __html: content }} />
          {fileList && fileList.length > 0 && <NewsDetailAttachment attachments={fileList} />}
        </S.ContentWrapper>

    </R.CommonContainer>
  );
};
