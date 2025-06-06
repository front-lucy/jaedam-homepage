'use client';

import styled from '@emotion/styled';
import { Header } from '@/components/molecules/header';
import { Footer } from '@/components/molecules/footer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutContainer>
      <Header
        pageType='sub'
        mode='light'
      />
      <Main>{children}</Main>
      <Footer />
    </LayoutContainer>
  );
}

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  display: flex;
  max-width: 1920px;
  flex: 1;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  margin: 0 auto;

  padding: calc(64px + 48px) 24px 128px 24px;
  gap: 48px;

  @media (max-width: 1279px) {
    padding: calc(64px + 48px) 16px 128px 16px;
    gap: 32px;
  }
`;
