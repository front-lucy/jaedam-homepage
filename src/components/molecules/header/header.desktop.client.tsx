'use client';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { DesktopLogoIconStyled, Nav, NavItem, Wrapper } from './header.styles';
import { HeaderProps } from './header.types';

const DesktopHeaderClient: FC<HeaderProps> = ({ pageType = 'home', mode = 'light' }) => {
  const router = useRouter();
  return (
    <Wrapper pageType={pageType}>
      <DesktopLogoIconStyled
        mode={mode}
        onClick={() => router.push('/')}
      />
      <Nav>
        <NavItem
          mode={mode}
          href='/about'
        >
          ABOUT
        </NavItem>
        <NavItem
          mode={mode}
          href='/business'
        >
          BUSINESS
        </NavItem>
        <NavItem
          mode={mode}
          href='/work'
        >
          WORK
        </NavItem>
        <NavItem
          mode={mode}
          href='/career'
        >
          CAREER
        </NavItem>
        <NavItem
          mode={mode}
          href='/news'
        >
          NEWS
        </NavItem>
        <NavItem
          mode={mode}
          href='/contact'
        >
          CONTACT
        </NavItem>
      </Nav>
    </Wrapper>
  );
};

export default DesktopHeaderClient;
