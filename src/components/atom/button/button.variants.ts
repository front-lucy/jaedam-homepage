import { colors } from "@/tokens";
import { ButtonState, ButtonVariant } from "./button.types";

interface ButtonStyle {
  background: string;
  border: string;
  color: string;
}

export const buttonVariants: Record<
  ButtonVariant,
  Record<ButtonState, ButtonStyle>
> = {
  primary: {
    default: {
      background: colors.jaedamCyan,
      border: "none",
      color: colors.white,
    },
    pressed: {
      background: "#1FC1C9",
      border: "none",
      color: colors.white,
    },
    disabled: {
      background: colors.gray150,
      border: "none",
      color: colors.white,
    },
  },
  secondary: {
    default: {
      background: colors.white,
      border: `1px solid ${colors.gray200}`,
      color: colors.black,
    },
    pressed: {
      background: "#EBEBEB",
      border: `1px solid ${colors.gray200}`,
      color: colors.black,
    },
    disabled: {
      background: colors.white,
      border: `1px solid ${colors.gray150}`,
      color: colors.gray300,
    },
  },
  tertiary: {
    default: {
      background: "transparent",
      border: `1px solid ${colors.jaedamCyan}`,
      color: colors.jaedamCyan,
    },
    pressed: {
      background: "transparent",
      border: `1px solid ${colors.jaedamCyan}`,
      color: "#1FC1C9",
    },
    disabled: {
      background: "transparent",
      border: `1px solid ${colors.gray150}`,
      color: colors.gray400,
    },
  },
};
