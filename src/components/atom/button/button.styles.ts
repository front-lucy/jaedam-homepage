import { typography } from "@/tokens";
import styled from "@emotion/styled";
import {
  ButtonRadius,
  ButtonSize,
  ButtonState,
  ButtonVariant,
} from "./button.types";
import { buttonVariants } from "./button.variants";

interface StyledButtonProps {
  variant: ButtonVariant;
  state: ButtonState;
  size: ButtonSize;
  radius: ButtonRadius;
}

const paddingMap: Record<ButtonSize, string> = {
  large: "12px 24px",
  medium: "8px 16px",
};

const fontSizeMap: Record<ButtonSize, string> = {
  large: "16px",
  medium: "14px",
};

export const StyledButton = styled.button<StyledButtonProps>(
  ({ variant, state, size, radius }) => {
    const styles = buttonVariants[variant][state];
    const pressed = buttonVariants[variant]["pressed"];
    const padding = paddingMap[size];
    const fontSize = fontSizeMap[size];

    return {
      background: `${styles.background} !important`,
      border: `${styles.border} !important`,
      color: `${styles.color} !important`,
      padding,
      fontSize,
      fontFamily: typography.fontFamily,
      fontWeight: 500,
      borderRadius: radius === "round" ? "9999px" : "4px",
      cursor: state === "disabled" ? "not-allowed" : "pointer",
      opacity: 1,
      transition: "all 0.2s ease",

      // 항상 active 반응하도록 처리
      "&:active": {
        background: `${pressed.background} !important`,
        border: `${pressed.border} !important`,
        color: `${pressed.color} !important`,
      },
    };
  }
);
