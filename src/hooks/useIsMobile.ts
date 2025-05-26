import { useMediaQuery } from "./useMediaQuery";

export function useIsMobile(): boolean | null {
  return useMediaQuery("(max-width: 799px)");
}
