import type { ImgHTMLAttributes } from "react";

export interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "width" | "height" | "loading"> {
  width: number;
  height: number;
  lazy?: boolean;
}

export function Image({ lazy = true, ...props }: ImageProps) {
  return <img loading={lazy ? "lazy" : "eager"} {...props} />;
}
