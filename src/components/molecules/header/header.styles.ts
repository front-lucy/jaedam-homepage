import LogoIcon from '@/assets/icons/Logo_Jaedam-Eng.svg';
import { colors, typography } from '@/tokens';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import Link from 'next/link';

/* ────────── 공통 및 Desktop 전용 ────────── */

export const Wrapper = styled.header<{
  pageType: 'home' | 'sub';
}>`
  width: 100%;
  height: 64px;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background: ${({ pageType }) => (pageType === 'home' ? 'transparent' : 'rgba(255, 255, 255, 0.7)')};
  backdrop-filter: ${({ pageType }) => (pageType === 'home' ? 'none' : 'blur(8px)')};

  @media (min-width: 1280px) {
    padding: 0 40px;
  }
`;

export const Logo = styled.h1<{ mode?: 'light' | 'dark' }>`
  ${typography['headline4-regular']};
  color: ${({ mode }) => (mode === 'dark' ? colors.gray100 : colors.gray900)};

  @media (min-width: 1280px) {
    font-size: 24px; // 필요 시 오버라이딩 (또는 typography에 desktop 전용 추가)
  }
`;

export const Nav = styled.nav`
  display: flex;
  gap: 32px;
`;

export const NavItem = styled(Link)<{ mode?: 'light' | 'dark' }>`
  ${typography['body-medium']};
  cursor: pointer;
  color: ${({ mode }) => (mode === 'dark' ? colors.white : colors.black)};

  &:hover {
    color: ${colors.jaedamCyan};
  }
`;

export const MNavItem = styled(Link)`
  ${typography['body-medium']};
  cursor: pointer;
  color: ${colors.white};

  &:hover {
    color: ${colors.jaedamCyan};
  }
`;

export const DesktopLogoIconStyled = styled(LogoIcon)<{
  mode: 'light' | 'dark';
}>`
  height: 20px;
  width: auto;
  display: block;
  cursor: pointer;
  color: ${({ mode }) => (mode === 'dark' ? colors.white : colors.black)};
`;

/* ────────── Mobile 전용 스타일 ────────── */

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-width: 100px;
  height: 100%;
`;

export const LogoIconStyled = styled(LogoIcon)<{ mode: 'light' | 'dark' }>`
  height: 20px;
  width: auto;
  display: block;
  color: ${({ mode }) => (mode === 'dark' ? colors.white : colors.black)};
`;

export const Hamburger = styled.button<{ mode: 'light' | 'dark' }>`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ mode }) => (mode === 'dark' ? colors.white : colors.black)};

  svg {
    width: 24px;
    height: 24px;
  }
`;

export const CloseButton = styled.button<{ mode: 'light' | 'dark' }>`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ mode }) => (mode === 'dark' ? colors.gray100 : colors.gray900)};

  svg {
    width: 24px;
    height: 24px;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 999;
  display: flex;
  justify-content: flex-start;
`;

export const SlideMenu = styled(motion.div)`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  background: ${colors.black};
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const SlideHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  ${typography['headline4-medium']};
  color: ${colors.white};
`;

export const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  ${typography['caption2-regular']};
  color: ${colors.gray700};
`;

export const SocialIcons = styled.div`
  display: flex;
  gap: 16px;

  svg {
    width: 20px;
    height: 20px;
    color: ${colors.gray700};
    flex-shrink: 0;
    object-fit: contain;
    overflow: visible;
  }
`;
