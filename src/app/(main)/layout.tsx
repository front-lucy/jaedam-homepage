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
  min-height: 100vh;
`;

const Main = styled.main<{ isCareerPage: boolean }>`
  display: flex;
  max-width: 1920px;
  width: 100%;
  flex: 1;
  margin: 0 auto;
  padding: 0;

  ${({ isCareerPage }) =>
    isCareerPage
      ? `
        padding: calc(64px + 80px) 0 128px 0;
        gap: 48px;

        @media (max-width: 1279px) {
          padding: calc(64px + 80px) 0 128px 0;
          gap: 32px;
        }
      `
      : `
        padding: calc(64px + 80px) 40px 128px 40px;
        gap: 48px;

        @media (max-width: 1279px) {
          padding: calc(64px + 80px) 24px 128px 24px;
          gap: 32px;
        }
      `}
`;
