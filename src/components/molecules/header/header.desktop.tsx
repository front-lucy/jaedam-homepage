import { FC } from "react";
import { Logo, Nav, NavItem, Wrapper } from "./header.styles";
import { HeaderProps } from "./header.types";

export const DesktopHeader: FC<HeaderProps> = ({
  pageType = "home",
  mode = "light",
}) => {
  return (
    <Wrapper pageType={pageType}>
      <Logo mode={mode}>JAEDAM</Logo>
      <Nav>
        <NavItem mode={mode} href="/about">
          ABOUT
        </NavItem>
        <NavItem mode={mode} href="/business">
          BUSINESS
        </NavItem>
        <NavItem mode={mode} href="/work">
          WORK
        </NavItem>
        <NavItem mode={mode} href="/career">
          CAREER
        </NavItem>
        <NavItem mode={mode} href="/news">
          NEWS
        </NavItem>
      </Nav>
    </Wrapper>
  );
};
