import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { copy } from "../../content/copy";
import { crumbsFor } from "../../content/seo";
import { useLocale } from "../../app/locale";
import { Breadcrumbs } from "../seo/Breadcrumbs";
import "./editorial.css";

export function Editorial({
  kicker,
  title,
  lede,
  children,
}: {
  kicker?: string;
  title: string;
  lede?: string;
  children?: ReactNode;
}) {
  const { locale } = useLocale();
  const { pathname } = useLocation();
  const crumbs = crumbsFor(pathname);
  return (
    <article className="editorial">
      <Breadcrumbs items={crumbs} label={locale === "bg" ? "Пътека" : "Breadcrumb"} />
      {kicker ? <p className="editorial__kicker">{kicker}</p> : null}
      <h1>{title}</h1>
      {lede ? <p className="editorial__lede">{lede}</p> : null}
      {children}
    </article>
  );
}

export function Prose({ id, title, paragraphs, children }: { id?: string; title?: string; paragraphs?: string[]; children?: ReactNode }) {
  const headingId = id ? `${id}-heading` : undefined;
  return (
    <section className="editorial__section" id={id} aria-labelledby={title ? headingId : undefined}>
      {title ? <h2 id={headingId}>{title}</h2> : null}
      {paragraphs?.map((paragraph) => (
        <p key={paragraph.slice(0, 48)}>{paragraph}</p>
      ))}
      {children}
    </section>
  );
}

export function useCopy() {
  const { locale } = useLocale();
  return copy(locale);
}
