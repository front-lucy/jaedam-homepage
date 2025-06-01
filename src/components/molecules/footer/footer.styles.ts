// molecules/footer/footer.styles.ts

import { colors, typography } from "@/tokens";
import styled from "@emotion/styled";

export const FooterWrapper = styled.footer`
  width: 100%;
  background: ${colors.black};
  padding: 40px 24px;
  color: ${colors.gray700};
`;

export const FooterInner = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  @media (min-width: 1280px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

export const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;

  @media (max-width: 1279px) {
    align-items: center;
    text-align: center;
  }
`;

export const Logo = styled.div`
  width: 80px;

  svg {
    height: 100%;
    width: auto;
    display: block;
    color: ${colors.gray500};
  }
`;

export const CompanyInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  ${typography["caption2-regular"]};
  color: ${colors.gray600};

  strong {
    font-weight: 700;
    color: ${colors.gray500};
  }

  @media (max-width: 1279px) {
    text-align: center;
  }
`;

export const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;

  @media (min-width: 1280px) {
    align-items: flex-end;
  }
`;

export const SnsIcons = styled.div`
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

export const DropdownWrapper = styled.div`
  position: relative;
`;

export const DropdownButton = styled.button`
  width: 250px;
  padding: 16px;
  background: ${colors.black};
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: ${colors.gray300};
  font-size: 12px;
  text-align: left;
  font-weight: 500;
  cursor: pointer;
`;

export const DropdownList = styled.ul`
  position: absolute;
  bottom: 100%;
  left: 0;
  width: 250px;
  padding: 16px;
  background: ${colors.gray850};
  border: 1px solid rgba(255, 255, 255, 0.1);
  list-style: none;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 8px;

  li {
  ${typography["caption2-regular"]};
  color: ${colors.gray300};
  padding: 0;
  cursor: pointer;

  &:hover {
    color: ${colors.white};
  }
  }
`;
