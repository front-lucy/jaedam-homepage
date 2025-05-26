// molecules/footer/footer.desktop.tsx

import InstagramIcon from "@/assets/icons/Icon-sns-instagram.svg";
import XIcon from "@/assets/icons/Icon-sns-x.svg";
import YouTubeIcon from "@/assets/icons/Icon-sns-youtube.svg";
import LogoIcon from "@/assets/icons/Logo_Jaedam-Kor.svg";
import {
  CompanyInfo,
  DropdownButton,
  DropdownList,
  DropdownWrapper,
  FooterInner,
  FooterWrapper,
  LeftSection,
  Logo,
  RightSection,
  SnsIcons,
} from "@/components/molecules/footer/footer.styles";
import { useState } from "react";
export const DesktopFooter = ({}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const familySites = [
    { label: "큐티즈", href: "#" },
    { label: "스튜디오담", href: "#" },
    { label: "설몬", href: "#" },
    { label: "마켓몬", href: "#" },
    { label: "재담쇼츠", href: "#" },
  ];

  return (
    <FooterWrapper>
      <FooterInner>
        <LeftSection>
          <Logo>
            <LogoIcon />
          </Logo>
          <CompanyInfo>
            <div>
              <strong>대표자</strong> 황남용 <strong>사업자 등록번호</strong>{" "}
              105-87-84058 / 832-85-02168
            </div>
            <div>
              <strong>통신판매업신고(본사/지점)</strong> 제 2020-서울마포-2201
              호 / 제 2024-부천원미-0603 호
            </div>
          </CompanyInfo>
        </LeftSection>

        <RightSection>
          <SnsIcons>
            <a href="#">
              <XIcon />
            </a>
            <a href="#">
              <InstagramIcon />
            </a>
            <a href="#">
              <YouTubeIcon />
            </a>
          </SnsIcons>

          <DropdownWrapper>
            <DropdownButton onClick={toggleDropdown}>
              FAMILY SITE ▾
            </DropdownButton>
            {dropdownOpen && (
              <DropdownList>
                {familySites.map((site) => (
                  <li
                    key={site.label}
                    onClick={() => window.open(site.href, "_blank")}
                  >
                    {site.label}
                  </li>
                ))}
              </DropdownList>
            )}
          </DropdownWrapper>
        </RightSection>
      </FooterInner>
    </FooterWrapper>
  );
};
