import { FC } from "react";
import { StyledButton } from "./button.styles";
import { ButtonProps } from "./button.types";

export const Button: FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  state = "default",
  radius = "square",
  children,
  ...rest
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      state={state}
      disabled={state === "disabled"}
      radius={radius}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};
