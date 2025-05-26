// molecules/header/header.desktop.tsx

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
        <NavItem mode={mode}>ABOUT</NavItem>
        <NavItem mode={mode}>BUSINESS</NavItem>
        <NavItem mode={mode}>WORK</NavItem>
        <NavItem mode={mode}>CAREER</NavItem>
        <NavItem mode={mode}>NEWS</NavItem>
      </Nav>
    </Wrapper>
  );
};
