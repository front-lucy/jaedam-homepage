'use client';

import { Footer } from '@/components/molecules/footer';
import { Header } from '@/components/molecules/header';
import * as S from './NewsDetail.styles';
import { NewsDetailProps } from './NewsDetail.type';
import { NewsDetailAttachment } from './NewsDetailAttachment';
import { NewsDetailTitleSection } from './NewsDetailTitleSection';

export const NewsDetailLayout = ({ category, title, noticedAt, content, fileList }: NewsDetailProps) => {
  return (
    <>
      <Header
        pageType='sub'
        mode='light'
      />
      <S.Wrapper>
        <NewsDetailTitleSection
          category={category as import('@/app/news/component/news-category/news-card/NewsCard.types').TabKey}
          title={title}
          noticedAt={noticedAt}
        />

        <S.ContentWrapper>
          <S.Inner dangerouslySetInnerHTML={{ __html: content }} />
          {fileList && fileList.length > 0 && <NewsDetailAttachment attachments={fileList} />}
        </S.ContentWrapper>
      </S.Wrapper>
      <Footer />
    </>
  );
};
