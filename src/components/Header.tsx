import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useState } from "react";

interface HeaderProps {
  background?: string;
  color?: string;
  hoverColor?: string;
  logoColor?: string;
}

interface MenuItem {
  label: string;
  path: string;
  submenu: string[];
}

const menuItems: MenuItem[] = [
  {
    label: "WEBTOON",
    path: "/webtoon/new",
    submenu: ["신작", "연재작", "완결작"],
  },
  {
    label: "WORK",
    path: "/work",
    submenu: ["NEWS", "작가 모집", "사업문의&제휴"],
  },

  {
    label: "BRAND",
    path: "/brand",
    submenu: ["만화 제작", "콘텐츠 유통", "해외 세일즈", "IP 비즈니스"],
  },
  {
    label: "NEWSROOM",
    path: "/news",
    submenu: ["만화 제작", "콘텐츠 유통", "해외 세일즈", "IP 비즈니스"],
  },
  {
    label: "CAREER",
    path: "/career",
    submenu: ["만화 제작", "콘텐츠 유통", "해외 세일즈", "IP 비즈니스"],
  },
  {
    label: "ABOUT",
    path: "/about",
    submenu: ["미션&비전", "연혁", "조직도", "오시는 길"],
  },
];

export default function Header({ background, color, hoverColor }: HeaderProps) {
  const router = useRouter();
  const { pathname } = router;
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <HeaderWrap onMouseLeave={() => setActiveMenu(null)}>
      <HeaderContainer background={background}>
        <Logo>
          <LogoLink href="/">
            <LogoImage
              src={
                "https://s3.ap-northeast-2.amazonaws.com/shortz.net/public/images/logo/Logo-Symboltype-color.png"
              }
              alt="logo"
            />
          </LogoLink>
        </Logo>
        <Nav>
          <NavList>
            {menuItems.map(({ label, path }) => {
              const isActive = pathname === path;
              return (
                <NavItem key={label} onMouseEnter={() => setActiveMenu(label)}>
                  <NavLink
                    isActive={isActive}
                    color={color}
                    hoverColor={hoverColor}
                    onClick={() => router.push(path)}
                  >
                    {label}
                  </NavLink>
                </NavItem>
              );
            })}
          </NavList>
        </Nav>
      </HeaderContainer>
    </HeaderWrap>
  );
}

// ✅ 스타일 컴포넌트
const HeaderWrap = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 100;
`;

const HeaderContainer = styled.header<HeaderProps>`
  position: relative; /* 서브메뉴가 메인 메뉴 아래에 나오도록 기준점 설정 */
  display: flex;
  justify-content: space-between;

  align-items: center;
  padding: 20px 80px;
  background: ${({ background }: { background: string }) =>
    background || "#fff"};
  transition: background-color 0.3s ease;
`;
const Logo = styled.h1`
  margin: 0;
  font-size: 1.5rem;
`;

const LogoLink = styled.a`
  text-decoration: none;
  color: inherit;
`;

const LogoImage = styled.img`
  width: 30px;
`;

const Nav = styled.nav``;

const NavList = styled.div`
  display: flex;
  gap: 30px;
  margin-left: 30px;
  line-height: 1.4;
`;

const NavItem = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    color: #00c1d4;
  }
`;

const NavLink = styled.div<{
  isActive: boolean;
  color?: string;
  hoverColor?: string;
}>`
  cursor: pointer;
  transition: color 0.3s ease;
  color: ${({ isActive, color }: { isActive: boolean; color?: string }) =>
    isActive ? "#00c1d4" : color || "#333"};
  &:hover {
    color: ${({
      isActive,
      hoverColor,
    }: {
      isActive: boolean;
      hoverColor?: string;
    }) => (isActive ? "#00c1d4" : hoverColor || "#00c1d4")};
  }
`;
