import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { resolveDocumentSeo } from "../../content/seo";

function upsertMeta(name: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("name", name);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function upsertProperty(property: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("property", property);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

function replaceAlternates(alternates: { hreflang: string; href: string }[]) {
  document.head.querySelectorAll('link[data-alt="hreflang"]').forEach((node) => node.remove());
  for (const alt of alternates) {
    const link = document.createElement("link");
    link.rel = "alternate";
    link.hreflang = alt.hreflang;
    link.href = alt.href;
    link.dataset.alt = "hreflang";
    document.head.appendChild(link);
  }
}

function replaceJsonLd(data: Record<string, unknown>) {
  let element = document.getElementById("structured-data");
  if (!element) {
    element = document.createElement("script");
    element.id = "structured-data";
    element.setAttribute("type", "application/ld+json");
    document.head.appendChild(element);
  }
  element.textContent = JSON.stringify(data);
}

export function DocumentMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = resolveDocumentSeo(pathname);
    document.title = seo.title;
    document.documentElement.lang = seo.locale;
    upsertMeta("description", seo.description);
    upsertMeta("robots", seo.index ? "index, follow" : "noindex, follow");
    upsertCanonical(seo.canonical);
    upsertProperty("og:title", seo.title);
    upsertProperty("og:description", seo.description);
    upsertProperty("og:url", seo.canonical);
    upsertProperty("og:type", seo.ogType);
    upsertProperty("og:locale", seo.locale === "bg" ? "bg_BG" : "en_GB");
    upsertMeta("twitter:card", "summary_large_image");
    if (seo.image) upsertProperty("og:image", new URL(seo.image, seo.canonical).href);
    if (seo.imageAlt) upsertProperty("og:image:alt", seo.imageAlt);
    replaceAlternates(seo.alternates);
    replaceJsonLd(seo.jsonLd);
  }, [pathname]);

  return null;
}
