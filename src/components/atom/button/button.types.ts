export type ButtonRadius = "round" | "square";

export type ButtonVariant = "primary" | "secondary" | "tertiary";
export type ButtonSize = "large" | "medium";
export type ButtonState = "default" | "pressed" | "disabled";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  state?: ButtonState;
  children: React.ReactNode;
  radius?: ButtonRadius;
}
