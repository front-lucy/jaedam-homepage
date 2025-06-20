'use client';

import { getNoticeList, NoticeHomeListResponse } from '@/api-domain/news';
import { formatDate } from '@/utils/formatDate';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NewsCard } from './component/news-category/news-card/NewsCard';
import { BadgeType, NewsCardProps } from './component/news-category/news-card/NewsCard.types';
import { NewsCategoryTabs, TabKey } from './component/news-category/NewsCategoryTabs';
import { GridContainer, Title } from './news.styles';
import * as S from '@/app/_components/layout/container';

export default function ContactPage() {
  const [noticeList, setNoticeList] = useState<NoticeHomeListResponse[]>([]);
  const [activeTab, setActiveTab] = useState<TabKey>('SNS');
  const router = useRouter();
  const mapToNewsCardProps = (item: NoticeHomeListResponse): NewsCardProps => ({
    noticedAt: formatDate(item.noticedAt),
    title: item.title,
    category: item.category as BadgeType,
    important: item.important,
  });

  useEffect(() => {
    const loadNoticeList = async () => {
      const res = await getNoticeList({
        category: 'SNS',
        page: 0,
        size: 20,
        sort: '',
      });
      console.log('🌐 res', res.body);
      setNoticeList(res.body.content);
    };

    loadNoticeList();
  }, []);

  return (
    <S.CommonContainer>
      <div>
        <Title>NEWS</Title>
      </div>
      <NewsCategoryTabs
        activeKey={activeTab}
        onChange={setActiveTab}
      />
      <GridContainer>
        {noticeList.map((item, index) => (
          <NewsCard
            key={index}
            {...mapToNewsCardProps(item)}
            onClick={() => router.push(`/news/${item.id}`)}
          />
        ))}
      </GridContainer>
    </S.CommonContainer>
  );
}
