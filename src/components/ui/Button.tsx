import type { ButtonHTMLAttributes } from "react";
import "./ui.css";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline" | "text";
}

export function Button({ variant = "solid", className = "", ...props }: ButtonProps) {
  return <button className={`button button--${variant} ${className}`} {...props} />;
}
