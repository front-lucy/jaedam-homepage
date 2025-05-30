// molecules/header/header.mobile.tsx

import MenuIcon from "@/assets/icons/Icon-menu.svg";
import InstagramIcon from "@/assets/icons/Icon-sns-instagram.svg";
import XIcon from "@/assets/icons/Icon-sns-x.svg";
import YouTubeIcon from "@/assets/icons/Icon-sns-youtube.svg";
import CloseIcon from "@/assets/icons/Icon-x.svg";

import { AnimatePresence } from "framer-motion";
import { FC, useState } from "react";
import {
  CloseButton,
  Footer,
  Hamburger,
  LogoContainer,
  LogoIconStyled,
  MNavItem,
  NavList,
  Overlay,
  SlideHeader,
  SlideMenu,
  SocialIcons,
  Wrapper,
} from "./header.styles";
import { HeaderProps } from "./header.types";

export const MobileHeader: FC<HeaderProps> = ({
  pageType = "home",
  mode = "light",
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Wrapper pageType={pageType}>
        <LogoContainer>
          <LogoIconStyled mode={mode} />
        </LogoContainer>
        <Hamburger mode={mode} onClick={() => setMenuOpen(true)}>
          <MenuIcon style={{ color: mode === "dark" ? "white" : "black" }} />
        </Hamburger>
      </Wrapper>

      <AnimatePresence>
        {menuOpen && (
          <Overlay onClick={() => setMenuOpen(false)}>
            <SlideMenu
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <SlideHeader>
                <LogoIconStyled mode={mode} />
                <CloseButton mode={mode} onClick={() => setMenuOpen(false)}>
                  <CloseIcon style={{ color: "white" }} />
                </CloseButton>
              </SlideHeader>
              <NavList>
                <MNavItem href="/about">ABOUT</MNavItem>
                <MNavItem href="/business">BUSINESS</MNavItem>
                <MNavItem href="/work">WORK</MNavItem>
                <MNavItem href="/career">CAREER</MNavItem>
                <MNavItem href="/news">NEWS</MNavItem>
              </NavList>

              <Footer>
                <SocialIcons>
                  <a href="#">
                    <XIcon />
                  </a>
                  <a href="#">
                    <InstagramIcon />
                  </a>
                  <a href="#">
                    <YouTubeIcon />
                  </a>
                </SocialIcons>
                <div>© JAEDAM MEDIA Co., Ltd. All rights reserved.</div>
              </Footer>
            </SlideMenu>
          </Overlay>
        )}
      </AnimatePresence>
    </>
  );
};
