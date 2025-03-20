import styled from "@emotion/styled";
import { useRouter } from "next/router";

interface HeaderProps {
  background?: string;
  color?: string;
  hoverColor?: string;
  logoColor?: string;
}

const HeaderWrap = styled.div`
  position: sticky;
  width: 100%;
  top: 0;
  z-index: 10;
`;

const HeaderContainer = styled.header<HeaderProps>`
  position: sticky;
  top: 0;
  padding: 40px 80px;
  background-color: ${({ background }: HeaderProps) =>
    background || "transparent"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
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
  width: 100px;
`;

const Nav = styled.nav``;

const NavList = styled.div`
  display: flex;
  gap: 20px;
`;

const NavLink = styled.div<HeaderProps>`
  text-decoration: none;
  color: ${({ color }: HeaderProps) => color || "#fff"};
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 700;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ hoverColor }: HeaderProps) => hoverColor || "#00c1d4"};
  }
`;

export default function Header({
  logoColor,
  background,
  color,
  hoverColor,
}: HeaderProps) {
  const router = useRouter();

  return (
    <HeaderWrap>
      <HeaderContainer background={background}>
        <Logo>
          <LogoLink href="https://www.jaedam.com/">
            {logoColor === "black" ? (
              <LogoImage
                src="https://s3.ap-northeast-2.amazonaws.com/shortz.net/public/images/logo/Logo-Black.png"
                alt="logo"
              />
            ) : (
              <LogoImage
                src="https://s3.ap-northeast-2.amazonaws.com/shortz.net/public/images/logo/Logo-jaedamshortz-kr-color.png"
                alt="logo"
              />
            )}
          </LogoLink>
        </Logo>
        <Nav>
          <NavList>
            <NavLink
              color={color}
              hoverColor={hoverColor}
              onClick={() => router.push("/webtoon/new")}
            >
              WEBTOON
            </NavLink>
            <NavLink color={color} hoverColor={hoverColor}>
              BUSINESS
            </NavLink>
            <NavLink color={color} hoverColor={hoverColor}>
              BRAND
            </NavLink>
            <NavLink color={color} hoverColor={hoverColor}>
              ABOUT
            </NavLink>
            <NavLink color={color} hoverColor={hoverColor}>
              CONTACT US
            </NavLink>
          </NavList>
        </Nav>
      </HeaderContainer>
    </HeaderWrap>
  );
}
