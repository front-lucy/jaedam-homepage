// molecules/footer/footer.tsx

"use client";

import { MobileFooter } from "@/components/molecules/footer/footer.mobile";
import { useIsMobile } from "@/hooks/useIsMobile";
import { FC } from "react";
// import { DesktopFooter } from "./footer.desktop";

export const Footer: FC = () => {
  const isMobile = useIsMobile();

  if (isMobile === null) return null;

  return isMobile ? (
    <MobileFooter />
  ) : (
    <MobileFooter /> // fallback: 모바일 우선 적용
  );
};
