'use client';
import { usePathname, useRouter } from 'next/navigation';
import { FC } from 'react';
import { DesktopLogoIconStyled, Nav, NavItem, Wrapper } from './header.styles';
import { HeaderProps } from './header.types';

const DesktopHeaderClient: FC<HeaderProps> = ({ pageType = 'home', mode = 'light' }) => {
  const router = useRouter();
  const pathname = usePathname(); // 현재 경로 가져오기
  return (
    <Wrapper pageType={pageType}>
      <DesktopLogoIconStyled
        mode={mode}
        onClick={() => router.push('/')}
      />
      <Nav>
        {[
          { href: '/about', label: 'ABOUT' },
          { href: '/business', label: 'BUSINESS' },
          { href: '/work', label: 'WORK' },
          { href: '/career', label: 'CAREER' },
          { href: '/news', label: 'NEWS' },
          { href: '/contact', label: 'CONTACT' },
        ].map(({ href, label }) => (
          <NavItem
            key={href}
            mode={mode}
            href={href}
            active={pathname.startsWith(href) ? true : undefined}
          >
            {label}
          </NavItem>
        ))}
      </Nav>
    </Wrapper>
  );
};

export default DesktopHeaderClient;
