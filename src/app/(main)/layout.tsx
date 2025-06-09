'use client';

import styled from '@emotion/styled';
import { Header } from '@/components/molecules/header';
import { Footer } from '@/components/molecules/footer';
import { usePathname } from 'next/navigation';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isCareerPage = pathname === '/career';

  return (
    <LayoutContainer>
      <Header
        pageType='sub'
        mode='light'
      />
      <Main isCareerPage={isCareerPage}>{children}</Main>
      <Footer />
    </LayoutContainer>
  );
}

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
`;

const Main = styled.main<{ isCareerPage: boolean }>`
  display: flex;
  max-width: 1920px;
  width: 100%;
  flex: 1;
  margin: 0 auto;
  padding: 0;
`;
