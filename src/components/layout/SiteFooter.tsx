import { Link, useLocation } from "react-router-dom";
import { useLocale } from "../../app/locale";
import { copy } from "../../content/copy";
import { artistName } from "../../content/entity";
import type { SiteCopy } from "../../content/copy/types";
import { pathFor, translatePath } from "../../content/paths";
import { track } from "../../lib/analytics";
import "./SiteFooter.css";

type CrumbRoute = keyof SiteCopy["crumbs"];

const columns: { title: "work" | "artist" | "acquisition"; links: CrumbRoute[] }[] = [
  { title: "work", links: ["sculpture", "theo-apples", "furniture", "paintings", "projects"] },
  { title: "artist", links: ["artist", "exhibitions", "process", "blog", "press"] },
  { title: "acquisition", links: ["available-works", "commissions", "contact", "faq"] },
];

export function SiteFooter() {
  const { locale } = useLocale();
  const { pathname } = useLocation();
  const text = copy(locale);
  const policies = ["privacy", "terms", "shipping", "refunds", "accessibility"] as const;

  return (
    <footer className="site-footer">
      <div className="site-footer__brand">
        <strong>{artistName(locale)}</strong>
        <span>{text.footerTagline}</span>
      </div>
      {columns.map((column) => (
        <nav key={column.title} aria-label={text.groups[column.title]}>
          <span>{text.groups[column.title]}</span>
          {column.links.map((route) => (
            <Link key={route} to={pathFor(locale, route)}>
              {text.crumbs[route]}
            </Link>
          ))}
        </nav>
      ))}
      <nav aria-label={text.groups.language}>
        <span>{text.groups.language}</span>
        <Link to={translatePath(pathname, "en")} hrefLang="en" onClick={() => track({ name: "language_select", locale: "en" })}>
          {text.groups.english}
        </Link>
        <Link to={translatePath(pathname, "bg")} hrefLang="bg" onClick={() => track({ name: "language_select", locale: "bg" })}>
          {text.groups.bulgarian}
        </Link>
      </nav>
      <nav aria-label={locale === "bg" ? "Политики" : "Policies"}>
        {policies.map((policy) => (
          <Link key={policy} to={pathFor(locale, policy)}>
            {text.policy[policy].title}
          </Link>
        ))}
      </nav>
      <small>© {artistName(locale)}. {locale === "bg" ? "Всички права запазени." : "All rights reserved."}</small>
    </footer>
  );
}
