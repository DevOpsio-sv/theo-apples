import type { ComponentProps } from "react";
import { Link } from "react-router-dom";
import "./ui.css";

export function TextLink(props: ComponentProps<typeof Link>) {
  return <Link {...props} className={`text-link ${props.className ?? ""}`} />;
}
