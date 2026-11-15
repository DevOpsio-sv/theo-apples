import type { HTMLAttributes } from "react";
import "./ui.css";

export function SectionLabel({ className = "", ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={`section-label ${className}`} {...props} />;
}
