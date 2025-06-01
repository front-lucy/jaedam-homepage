import dynamic from "next/dynamic";
import { FC } from "react";
import { HeaderProps } from "./header.types";

const DesktopHeaderClient = dynamic<HeaderProps>(() => import("./header.desktop.client"), {
  ssr: false,
});

export const DesktopHeader: FC<HeaderProps> = (props) => {
  return <DesktopHeaderClient {...props} />;
};
