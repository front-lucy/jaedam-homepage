import { useMediaQuery } from "./useMediaQuery";

export function useDeviceType(): "desktop" | "tablet" | "mobile" {
  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const isTablet = useMediaQuery("(min-width: 800px) and (max-width: 1279px)");
  const isMobile = useMediaQuery("(max-width: 799px)");

  if (isDesktop) return "desktop";
  if (isTablet) return "tablet";
  if (isMobile) return "mobile";
  return 'desktop';
}
