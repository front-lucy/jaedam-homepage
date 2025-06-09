'use client';
import { colors } from '@/tokens';
import styled from '@emotion/styled';
import { useState } from 'react';
import { BusinessCategoryTabs, BusinessTabKey } from './business-category/BusinessCategoryTabs';
import BusinessPlatform from './business-section/BusinessPlatform';
import BusinessPublish from './business-section/BusinessPublish';
import BusinessWebtoon from './business-section/BusinessWebtoon';

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

export default function BusinessPage() {
  const [activeTab, setActiveTab] = useState<BusinessTabKey>('WEBTOON');
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '64px',
        paddingTop: '64px',
        gap: '32px',
        overflowX: 'hidden',
      }}
    >
      <div>
        <Title>BUSINESS</Title>
      </div>
      <BusinessCategoryTabs
        activeKey={activeTab}
        onChange={setActiveTab}
      />
      {activeTab === 'WEBTOON' && <BusinessWebtoon />}
      {activeTab === 'PUBLISH' && <BusinessPublish />}
      {activeTab === 'PLATFORM' && <BusinessPlatform />}
      {activeTab === 'IP_GLOBAL' && <div>IP_GLOBAL</div>}
    </div>
  );
}
