// molecules/header/header.mobile.tsx

import MenuIcon from "@/assets/icons/Icon-menu.svg";
import InstagramIcon from "@/assets/icons/Icon-sns-instagram.svg";
import XIcon from "@/assets/icons/Icon-sns-x.svg";
import YouTubeIcon from "@/assets/icons/Icon-sns-youtube.svg";
import CloseIcon from "@/assets/icons/Icon-x.svg";
import LogoIcon from "@/assets/icons/Logo_Jaedam-Eng.svg";

import { colors } from "@/tokens";
import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";
import { FC, useState } from "react";
import { Wrapper } from "./header.styles";
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
          <LogoIconStyled />
        </LogoContainer>
        <Hamburger mode={mode} onClick={() => setMenuOpen(true)}>
          <MenuIcon style={{ color: "white" }} />
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
                <LogoIconStyled />
                <CloseButton mode={mode} onClick={() => setMenuOpen(false)}>
                  <CloseIcon style={{ color: "white" }} />
                </CloseButton>
              </SlideHeader>

              <NavList>
                <li>ABOUT</li>
                <li>BUSINESS</li>
                <li>WORK</li>
                <li>CAREER</li>
                <li>NEWS</li>
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

// 스타일 정의

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-width: 100px;
  height: 100%;
`;

const LogoIconStyled = styled(LogoIcon)`
  height: 20px;
  width: auto;
  display: block;
  color: ${colors.white};
`;

const Hamburger = styled.button<{ mode: "light" | "dark" }>`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ mode }) => (mode === "dark" ? colors.gray100 : colors.gray900)};

  svg {
    width: 24px;
    height: 24px;
  }
`;

const CloseButton = styled.button<{ mode: "light" | "dark" }>`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ mode }) => (mode === "dark" ? colors.gray100 : colors.gray900)};

  svg {
    width: 24px;
    height: 24px;
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 999;
  display: flex;
  justify-content: flex-start;
`;

const SlideMenu = styled(motion.div)`
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

const SlideHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  font-size: 18px;
  color: ${colors.white};
`;

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  font-size: 12px;
  color: ${colors.gray700};
`;

const SocialIcons = styled.div`
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
