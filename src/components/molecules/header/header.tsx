// header.tsx
"use client";

import { useDeviceType } from "@/hooks/useDeviceType";
import { FC } from "react";
import { DesktopHeader } from "./header.desktop";
import { MobileHeader } from "./header.mobile";
import { HeaderProps } from "./header.types";

export const Header: FC<HeaderProps> = ({
  pageType = "home",
  mode = "light",
}) => {
  const device = useDeviceType();

  // SSR 중엔 null 반환 → 깜빡임 방지
  if (device === null) return null;

  if (device === "desktop")
    return <DesktopHeader pageType={pageType} mode={mode} />;
  if (device === "tablet")
    return <DesktopHeader pageType={pageType} mode={mode} />;
  return <MobileHeader pageType={pageType} mode={mode} />;
};
