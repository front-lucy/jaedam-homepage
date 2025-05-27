import { colors, typography } from "@/tokens";
import styled from "@emotion/styled";
import Link from "next/link";

export const Wrapper = styled.header<{
  pageType: "home" | "sub";
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
  background: ${({ pageType }) =>
    pageType === "home" ? "transparent" : "rgba(255, 255, 255, 0.7)"};
  backdrop-filter: ${({ pageType }) =>
    pageType === "home" ? "none" : "blur(8px)"};

  @media (min-width: 1280px) {
    padding: 0 40px;
  }
`;

export const Logo = styled.h1<{ mode?: "light" | "dark" }>`
  font-size: 18px;
  font-weight: 400;
  font-family: ${typography.fontFamily};
  color: ${({ mode }) => (mode === "dark" ? colors.gray100 : colors.gray900)};

  @media (min-width: 1280px) {
    font-size: 24px;
  }
`;

export const Nav = styled.nav`
  display: flex;
  gap: 32px;
`;

export const NavItem = styled(Link)<{ mode?: "light" | "dark" }>`
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  color: ${({ mode }) => (mode === "dark" ? colors.gray100 : colors.gray900)};

  &:hover {
    color: ${colors.jaedamCyan};
  }
`;
