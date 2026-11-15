import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { absoluteUrl, resolveDocumentSeo } from "../../content/seo";

function upsertMeta(name: string, content: string) {
  const nodes = [...document.head.querySelectorAll<HTMLMetaElement>(`meta[name="${name}"]`)];
  const element = nodes[0] ?? document.createElement("meta");
  if (!nodes[0]) {
    element.setAttribute("name", name);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
  nodes.slice(1).forEach((node) => node.remove());
}

function upsertProperty(property: string, content: string) {
  const nodes = [...document.head.querySelectorAll<HTMLMetaElement>(`meta[property="${property}"]`)];
  const element = nodes[0] ?? document.createElement("meta");
  if (!nodes[0]) {
    element.setAttribute("property", property);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
  nodes.slice(1).forEach((node) => node.remove());
}

function removeMeta(name: string) {
  document.head.querySelectorAll(`meta[name="${name}"]`).forEach((node) => node.remove());
}

function removeProperty(property: string) {
  document.head.querySelectorAll(`meta[property="${property}"]`).forEach((node) => node.remove());
}

function upsertCanonical(href: string) {
  const nodes = [...document.head.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]')];
  const element = nodes[0] ?? document.createElement("link");
  if (!nodes[0]) document.head.appendChild(element);
  element.setAttribute("rel", "canonical");
  element.setAttribute("href", href);
  nodes.slice(1).forEach((node) => node.remove());
}

function replaceAlternates(alternates: { hreflang: string; href: string }[]) {
  document.head.querySelectorAll('link[rel="alternate"][hreflang], link[data-alt="hreflang"]').forEach((node) => node.remove());
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
  const nodes = [...document.head.querySelectorAll("#structured-data")];
  const element = nodes[0] ?? document.createElement("script");
  if (!nodes[0]) document.head.appendChild(element);
  element.id = "structured-data";
  element.setAttribute("type", "application/ld+json");
  element.textContent = JSON.stringify(data);
  nodes.slice(1).forEach((node) => node.remove());
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
    upsertProperty("og:type", seo.ogType);
    upsertProperty("og:site_name", seo.siteName);
    upsertProperty("og:title", seo.title);
    upsertProperty("og:description", seo.ogDescription);
    upsertProperty("og:url", seo.canonical);
    upsertProperty("og:locale", seo.locale === "bg" ? "bg_BG" : "en_GB");
    upsertMeta("twitter:card", "summary_large_image");
    upsertMeta("twitter:title", seo.title);
    upsertMeta("twitter:description", seo.twitterDescription);
    if (seo.image) {
      const image = absoluteUrl(seo.image);
      upsertProperty("og:image", image);
      upsertMeta("twitter:image", image);
    } else {
      removeProperty("og:image");
      removeMeta("twitter:image");
    }
    if (seo.image && seo.imageAlt) upsertProperty("og:image:alt", seo.imageAlt);
    else removeProperty("og:image:alt");
    replaceAlternates(seo.alternates);
    replaceJsonLd(seo.jsonLd);
  }, [pathname]);

  return null;
}
