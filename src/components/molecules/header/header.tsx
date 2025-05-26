// header.tsx
"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import { FC } from "react";
import { DesktopHeader } from "./header.desktop";
import { MobileHeader } from "./header.mobile";
import { HeaderProps } from "./header.types";

export const Header: FC<HeaderProps> = ({
  pageType = "home",
  mode = "light",
}) => {
  const isMobile = useIsMobile();

  // SSR 중엔 null 반환 → 깜빡임 방지
  if (isMobile === null) return null;

  return isMobile ? (
    <MobileHeader pageType={pageType} mode={mode} />
  ) : (
    <DesktopHeader pageType={pageType} mode={mode} />
  );
};
