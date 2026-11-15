import type { PropsWithChildren } from "react";
import { DocumentMeta } from "../seo/DocumentMeta";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function PageFrame({ children }: PropsWithChildren) {
  return <><DocumentMeta /><SiteHeader /><main id="main-content">{children}</main><SiteFooter /></>;
}
