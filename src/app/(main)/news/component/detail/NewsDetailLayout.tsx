'use client';

import * as S from './NewsDetail.styles';
import * as R from '@/app/_components/layout/container';
import { NewsDetailProps } from './NewsDetail.type';
import { NewsDetailAttachment } from './NewsDetailAttachment';
import { NewsDetailTitleSection } from './NewsDetailTitleSection';

export const NewsDetailLayout = ({ category, title, noticedAt, content, fileList }: NewsDetailProps) => {
  return (
    <R.CommonContainer>
      <S.Wrapper>
        <NewsDetailTitleSection
          category={category as import('@/app/(main)/news/component/news-category/news-card/NewsCard.types').TabKey}
          title={title}
          noticedAt={noticedAt}
        />

        <S.ContentWrapper>
          <S.Inner dangerouslySetInnerHTML={{ __html: content }} />
          {fileList && fileList.length > 0 && <NewsDetailAttachment attachments={fileList} />}
        </S.ContentWrapper>
      </S.Wrapper>
    </R.CommonContainer>
  );
};
