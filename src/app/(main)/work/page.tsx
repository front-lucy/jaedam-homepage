'use client';

import { getContents } from '@/api-domain/work';
import { useWorkStore } from '@/store/useWorkStore';
import { colors } from '@/tokens';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { GenreTabs } from './component/genre-tabs/GenreTabs';
import { TabKey, WorkCategoryTabs } from './component/work-category/WorkCategoryTabs';
import { WorkGrid } from './component/work-grid/WorkGrid';
import { WorkGridSkeleton } from './component/work-grid/WorkGridSkeleton';
import * as S from '@/app/_components/layout/container'
import { css } from '@emotion/react';

const Title = styled.h2`
  font-size: 64px;
  font-weight: 700;
  color: ${colors.gray900};

  @media (max-width: 1024px) {
    font-size: 44px;
  }

  @media (max-width: 768px) {
    font-size: 40px;
  }
`;

const WorkPage = () => {
  const {
    selectedTab,
    currentPage,
    items,
    setItems,
    // setSelectedTab,
    setTotalPages,
  } = useWorkStore();

  const [selectedGenre, setSelectedGenre] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContents = async () => {
      setIsLoading(true);
      try {
        const res = await getContents({
          type: selectedTab,
          category: 'NEW',
          genre: '',
          page: currentPage,
          size: 20,
          sort: '',
        });

        if (res) {
          console.log('🌐 res', res);
          setItems(res.content);
          setTotalPages(res.totalPages);
        }
      } catch (err) {
        console.error('콘텐츠 불러오기 실패:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadContents();
  }, [selectedTab, currentPage, setItems, setTotalPages]);

  useEffect(() => {
    // 복원 후 scrollY는 0으로 초기화(한 번만 복원)
    const y = useWorkStore.getState().scrollY;
    if (y > 0) {
      window.scrollTo(0, y);
      useWorkStore.getState().setScrollY(0);
    }
  }, []);

  const [activeTab, setActiveTab] = useState<TabKey>('WEBTOON');

  return (
    <S.CommonContainer css={ContainerAdditional}>
      <div>
        <Title>WORK</Title>
      </div>
      <div style={{ width: '100%' }}>
        <WorkCategoryTabs
          activeKey={activeTab}
          onChange={setActiveTab}
        />
      </div>
      <GenreTabs
        activeGenre={selectedGenre}
        onChange={genre => setSelectedGenre(genre)}
      />
      {isLoading ? <WorkGridSkeleton /> : <WorkGrid items={items} />}
      {/* <Pagination current={currentPage} total={totalPages} onChange={setCurrentPage} /> */}
    </S.CommonContainer>
  );
};

export default WorkPage;

const ContainerAdditional = css`
  padding: calc(64px + 80px) 40px 128px 40px;
  gap: 48px;

  @media (max-width: 1279px) {
    padding: calc(64px + 80px) 24px 128px 24px;
    gap: 32px;
  }
`;
