import { artworks, getArtworkBySlug } from "../data/artworks";
import { artistName, PERSON_ID, SAME_AS, SITE_NAME, SITE_ORIGIN, WEBSITE_ID } from "./entity";
import { copy } from "./copy";
import { homeMedia } from "./home";
import { workShareImage } from "./work-gallery";
import {
  INDEXABLE_ROUTES,
  LOCALES,
  artworkParent,
  artworkPath,
  isIndexableRoute,
  matchLocalizedPath,
  normalizePath,
  pathFor,
  translatePath,
  type Locale,
  type PageMatch,
  type RouteId,
} from "./paths";
import { articles, exhibitions, getArticle, getExhibition, getProject, projects } from "./records";

export { SITE_ORIGIN };

const categoryCopy = copy("en");

/** Stub records for /work/:category. English until those pages read locale copy directly. */
export const workCategoryContent: Record<string, { title: string; description: string }> = {
  sculpture: {
    title: categoryCopy.sculpture.title,
    description: categoryCopy.workSections.sculpture.join(" "),
  },
  furniture: {
    title: categoryCopy.furniture.title,
    description: categoryCopy.workSections.furniture.join(" "),
  },
  paintings: {
    title: categoryCopy.paintings.title,
    description: categoryCopy.workSections.paintings.join(" "),
  },
  projects: {
    title: categoryCopy.projects.title,
    description: categoryCopy.workSections.projects.join(" "),
  },
  "theo-apples": {
    title: categoryCopy.theo.title,
    description: categoryCopy.theo.sub,
  },
  commissions: {
    title: categoryCopy.commissions.title,
    description: categoryCopy.commissions.paragraphs[0],
  },
};

export interface AlternateLink {
  hreflang: "en" | "bg" | "x-default";
  href: string;
}

export interface Crumb {
  name: string;
  path: string;
}

export interface DocumentSeo {
  locale: Locale;
  title: string;
  description: string;
  ogDescription: string;
  twitterDescription: string;
  siteName: string;
  canonical: string;
  index: boolean;
  alternates: AlternateLink[];
  image?: string;
  imageAlt?: string;
  ogType: "website" | "article";
  crumbs: Crumb[];
  jsonLd: Record<string, unknown>;
}

const POLICY_IDS = new Set<RouteId>(["privacy", "terms", "shipping", "refunds", "accessibility"]);

export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${SITE_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}

function crumbLabel(locale: Locale, id: RouteId): string {
  const labels = copy(locale).crumbs;
  if (id in labels) return labels[id as keyof typeof labels];
  if (POLICY_IDS.has(id)) {
    const key = id === "accessibility" ? "accessibility" : id;
    return copy(locale).policy[key as "privacy"].title;
  }
  return id;
}

export function crumbsFor(pathname: string): Crumb[] {
  const match = matchLocalizedPath(normalizePath(pathname));
  if (match.kind === "not-found") return [];
  const locale = match.locale;
  const home = { name: crumbLabel(locale, "home"), path: pathFor(locale, "home") };
  if (match.kind === "route") {
    if (match.id === "home") return [home];
    const trail = [home];
    if (match.id === "sculpture" || match.id === "furniture" || match.id === "paintings") {
      trail.push({ name: crumbLabel(locale, "work"), path: pathFor(locale, "work") });
    }
    trail.push({ name: crumbLabel(locale, match.id), path: pathFor(locale, match.id) });
    return trail;
  }

  if (match.kind === "artwork") {
    const artwork = getArtworkBySlug(match.slug);
    const trail = [home];
    if (match.parent !== "theo-apples") {
      trail.push({ name: crumbLabel(locale, "work"), path: pathFor(locale, "work") });
    }
    trail.push({ name: crumbLabel(locale, match.parent), path: pathFor(locale, match.parent) });
    trail.push({
      name: artwork?.title ?? match.slug,
      path: artwork ? artworkPath(locale, artwork.category, artwork.slug) : pathname,
    });
    return trail;
  }

  const parent: RouteId = match.kind === "project" ? "projects" : match.kind === "exhibition" ? "exhibitions" : "blog";
  const recordName =
    match.kind === "project"
      ? getProject(match.slug)?.title[locale]
      : match.kind === "exhibition"
        ? getExhibition(match.slug)?.title[locale]
        : getArticle(match.slug)?.title[locale];
  return [
    home,
    { name: crumbLabel(locale, parent), path: pathFor(locale, parent) },
    { name: recordName ?? match.slug, path: `${pathFor(locale, parent)}/${match.slug}` },
  ];
}

function alternatesFor(pathname: string, index: boolean): AlternateLink[] {
  if (!index) return [];
  const en = absoluteUrl(translatePath(pathname, "en"));
  const bg = absoluteUrl(translatePath(pathname, "bg"));
  return [
    { hreflang: "en", href: en },
    { hreflang: "bg", href: bg },
    { hreflang: "x-default", href: en },
  ];
}

function personNode() {
  const node: Record<string, unknown> = {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Teodor Dukov",
    alternateName: "Теодор Дуков",
    jobTitle: "Sculptor and artist",
    description:
      "Teodor Dukov is a Bulgarian sculptor and artist working across sculpture, wood, the Theo Apples collection, collectible furniture and object-based art.",
    nationality: { "@type": "Country", name: "Bulgaria" },
    url: absoluteUrl(pathFor("en", "artist")),
    image: absoluteUrl(homeMedia.portrait.src),
  };
  if (SAME_AS.length > 0) node.sameAs = SAME_AS;
  return node;
}

function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: absoluteUrl(pathFor("en", "home")),
    inLanguage: ["en", "bg"],
    publisher: { "@id": PERSON_ID },
  };
}

function breadcrumbNode(crumbs: Crumb[]) {
  if (crumbs.length < 2) return null;
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

function graph(locale: Locale, path: string, title: string, description: string, crumbs: Crumb[], extra: Record<string, unknown>[] = []) {
  const page = {
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name: title,
    description,
    inLanguage: locale,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PERSON_ID },
  };
  const nodes = [personNode(), websiteNode(), page, breadcrumbNode(crumbs), ...extra].filter(Boolean);
  return { "@context": "https://schema.org", "@graph": nodes };
}

function artworkNode(locale: Locale, slug: string) {
  const artwork = getArtworkBySlug(slug);
  if (!artwork) return null;
  return {
    "@type": "VisualArtwork",
    name: artwork.title,
    artist: { "@id": PERSON_ID },
    creator: { "@id": PERSON_ID },
    artform: artwork.category === "painting" ? "Painting" : "Sculpture",
    artMedium: artwork.materials[locale],
    description: artwork.description[locale],
    url: absoluteUrl(artworkPath(locale, artwork.category, artwork.slug)),
    image: artwork.images.map((image) => ({
      "@type": "ImageObject",
      contentUrl: absoluteUrl(image.src),
      caption: image.caption?.[locale] ?? image.alt[locale],
      width: image.width,
      height: image.height,
    })),
  };
}

function build(
  locale: Locale,
  path: string,
  title: string,
  description: string,
  index: boolean,
  extra: Record<string, unknown>[] = [],
  image?: string,
  imageAlt?: string,
  ogType: "website" | "article" = "website",
): DocumentSeo {
  const crumbs = crumbsFor(path);
  return {
    locale,
    title,
    description,
    ogDescription: description,
    twitterDescription: description,
    siteName: SITE_NAME,
    canonical: absoluteUrl(path),
    index,
    alternates: alternatesFor(path, index),
    image,
    imageAlt,
    ogType,
    crumbs,
    jsonLd: graph(locale, path, title, description, crumbs, extra),
  };
}

function missing(locale: Locale, path: string): DocumentSeo {
  const text = copy(locale);
  return build(locale, path, `${text.notFound.title} — ${artistName(locale)}`, text.notFound.body, false);
}

export function resolveDocumentSeo(pathname: string): DocumentSeo {
  const path = normalizePath(pathname.split("?")[0] || "/");
  const match = matchLocalizedPath(path);
  const locale: Locale = match.locale ?? "en";
  const text = copy(locale);

  if (match.kind === "not-found") return missing(locale, path === "" ? "/en" : path);

  if (match.kind === "artwork") {
    const artwork = getArtworkBySlug(match.slug);
    if (!artwork || artworkParent(artwork.category) !== match.parent) return missing(locale, path);
    const title =
      locale === "bg"
        ? `${artwork.title} | ${artwork.category === "theo-apples" ? "Дървена скулптура ябълка от Теодор Дуков" : "Скулптура от Теодор Дуков"}`
        : `${artwork.title} | ${artwork.category === "theo-apples" ? "Wooden Apple Sculpture by Teodor Dukov" : "Sculpture by Teodor Dukov"}`;
    const node = artworkNode(locale, artwork.slug);
    return build(
      locale,
      path,
      title,
      artwork.summary[locale],
      true,
      node ? [node] : [],
      artwork.shareImage,
      artwork.images[0]?.alt[locale],
    );
  }

  if (match.kind === "article") {
    const article = getArticle(match.slug);
    if (!article) return missing(locale, path);
    return build(locale, path, `${article.title[locale]} | ${artistName(locale)}`, article.description[locale], true, [], article.image?.src, article.image?.alt[locale], "article");
  }

  if (match.kind === "project") {
    const project = getProject(match.slug);
    if (!project) return missing(locale, path);
    return build(locale, path, `${project.title[locale]} | ${artistName(locale)}`, project.summary[locale], true, [], project.images[0]?.src, project.images[0]?.alt[locale]);
  }

  if (match.kind === "exhibition") {
    const exhibition = getExhibition(match.slug);
    if (!exhibition) return missing(locale, path);
    return build(
      locale,
      path,
      `${exhibition.title[locale]} | ${artistName(locale)}`,
      exhibition.summary[locale],
      true,
      [],
      exhibition.images[0]?.src,
      exhibition.images[0]?.alt[locale],
    );
  }

  return routeSeo(match, path, text, locale);
}

function routeSeo(match: Extract<PageMatch, { kind: "route" }>, path: string, text: ReturnType<typeof copy>, locale: Locale): DocumentSeo {
  if (POLICY_IDS.has(match.id)) {
    const key = match.id === "accessibility" ? "accessibility" : (match.id as "privacy");
    const policy = text.policy[key];
    return build(locale, path, `${policy.title} — ${artistName(locale)}`, policy.body, false);
  }

  if (!isIndexableRoute(match.id)) {
    const utilityTitle =
      match.id === "cart"
        ? text.utility.cartTitle
        : match.id === "account"
          ? text.utility.accountTitle
          : match.id === "checkout-success"
            ? text.utility.thanksTitle
            : text.utility.cancelTitle;
    return build(locale, path, `${utilityTitle} — ${artistName(locale)}`, text.footerTagline, false);
  }

  const seo = text.seo[match.id as keyof typeof text.seo];
  // Share images only where a real, non-demo asset is already assigned.
  // The homepage has no social card. The Wix demo hero is not used as og:image.
  const image = match.id === "work" ? workShareImage.src : match.id === "artist" ? homeMedia.portrait.src : undefined;
  const imageAlt = match.id === "work" ? workShareImage.alt[locale] : match.id === "artist" ? text.alts.portrait : undefined;
  const doc = build(locale, path, seo.title, seo.description, true, [], image, imageAlt);
  return {
    ...doc,
    ogDescription: seo.ogDescription ?? doc.description,
    twitterDescription: seo.twitterDescription ?? doc.description,
  };
}

export function indexablePaths(): string[] {
  const paths: string[] = [];
  for (const locale of LOCALES) {
    for (const id of INDEXABLE_ROUTES) paths.push(pathFor(locale, id));
    for (const artwork of artworks) paths.push(artworkPath(locale, artwork.category, artwork.slug));
    for (const article of articles) paths.push(`${pathFor(locale, "blog")}/${article.slug}`);
    for (const project of projects) paths.push(`${pathFor(locale, "projects")}/${project.slug}`);
    for (const exhibition of exhibitions) paths.push(`${pathFor(locale, "exhibitions")}/${exhibition.slug}`);
  }
  return paths;
}

function escapeXml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function renderSitemap(): string {
  const body = indexablePaths()
    .map((path) => {
      const links = (["en", "bg"] as const)
        .map((locale) => {
          const href = absoluteUrl(translatePath(path, locale));
          return `    <xhtml:link rel="alternate" hreflang="${locale}" href="${escapeXml(href)}" />`;
        })
        .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(absoluteUrl(translatePath(path, "en")))}" />`);
      return `  <url>\n    <loc>${escapeXml(absoluteUrl(path))}</loc>\n${links.join("\n")}\n  </url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${body}\n</urlset>\n`;
}

export function renderImageSitemap(): string {
  const urls: string[] = [];
  for (const locale of LOCALES) {
    for (const artwork of artworks) {
      const images = artwork.images
        .map(
          (image) =>
            `    <image:image><image:loc>${escapeXml(absoluteUrl(image.src))}</image:loc><image:caption>${escapeXml(image.caption?.[locale] ?? image.alt[locale])}</image:caption></image:image>`,
        )
        .join("\n");
      urls.push(`  <url>\n    <loc>${escapeXml(absoluteUrl(artworkPath(locale, artwork.category, artwork.slug)))}</loc>\n${images}\n  </url>`);
    }
  }
  const hero = `  <url>\n    <loc>${escapeXml(absoluteUrl("/en"))}</loc>\n    <image:image><image:loc>${escapeXml(absoluteUrl(homeMedia.heroMain.src))}</image:loc><image:caption>${escapeXml(copy("en").alts.heroMain)}</image:caption></image:image>\n  </url>`;
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${hero}\n${urls.join("\n")}\n</urlset>\n`;
}

export function renderSitemapIndex(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap><loc>${SITE_ORIGIN}/sitemap-pages.xml</loc></sitemap>\n  <sitemap><loc>${SITE_ORIGIN}/sitemap-images.xml</loc></sitemap>\n</sitemapindex>\n`;
}

export function renderRobots(): string {
  const closed = [
    "/en/cart",
    "/en/account",
    "/en/checkout",
    "/bg/kolichka",
    "/bg/profil",
    "/bg/checkout",
  ]
    .map((path) => `Disallow: ${path}`)
    .join("\n");
  return `User-agent: *\nAllow: /\n${closed}\n\nUser-agent: Googlebot-Image\nAllow: /\n\nUser-agent: Bingbot\nAllow: /\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`;
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeAttr(value: string): string {
  return escapeHtml(value).replace(/"/g, "&quot;");
}

function replaceMetaName(html: string, name: string, content: string): string {
  const tag = `<meta name="${name}" content="${escapeAttr(content)}" />`;
  const re = new RegExp(`<meta\\s+name="${name}"[^>]*>`, "gi");
  if (!re.test(html)) return html.replace("</head>", `${tag}\n</head>`);
  re.lastIndex = 0;
  let used = false;
  return html.replace(re, () => {
    if (used) return "";
    used = true;
    return tag;
  });
}

/** Removes a previous discovery block and any stray managed tags so a route cannot emit two sets. */
function stripManagedHead(html: string): string {
  return html
    .replace(/<!--discovery-->[\s\S]*?<!--\/discovery-->/g, "")
    .replace(/<link\s+rel="canonical"[^>]*>/gi, "")
    .replace(/<link\s+rel="alternate"[^>]*hreflang="[^"]*"[^>]*>/gi, "")
    .replace(/<link\s+hreflang="[^"]*"[^>]*rel="alternate"[^>]*>/gi, "")
    .replace(/<meta\s+name="robots"[^>]*>/gi, "")
    .replace(/<meta\s+property="og:[^"]+"[^>]*>/gi, "")
    .replace(/<meta\s+name="twitter:[^"]+"[^>]*>/gi, "")
    .replace(/<script\b[^>]*\bid="structured-data"[^>]*>[\s\S]*?<\/script>/gi, "");
}

/** Injects crawlable head tags into the SPA shell. Body copy is rendered by the app. */
export function applyDocumentHead(html: string, seo: DocumentSeo): string {
  let next = html.replace(/<html lang="[^"]*">/, `<html lang="${seo.locale}">`);
  next = next.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(seo.title)}</title>`);
  next = replaceMetaName(next, "description", seo.description);
  next = stripManagedHead(next);
  const image = seo.image ? absoluteUrl(seo.image) : "";
  const links = [
    `<link rel="canonical" href="${escapeAttr(seo.canonical)}" />`,
    ...seo.alternates.map(
      (alt) => `<link rel="alternate" hreflang="${alt.hreflang}" href="${escapeAttr(alt.href)}" data-alt="hreflang" />`,
    ),
    `<meta name="robots" content="${seo.index ? "index, follow" : "noindex, follow"}" />`,
    `<meta property="og:type" content="${seo.ogType}" />`,
    `<meta property="og:site_name" content="${escapeAttr(seo.siteName)}" />`,
    `<meta property="og:title" content="${escapeAttr(seo.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(seo.ogDescription)}" />`,
    `<meta property="og:url" content="${escapeAttr(seo.canonical)}" />`,
    `<meta property="og:locale" content="${seo.locale === "bg" ? "bg_BG" : "en_GB"}" />`,
    image ? `<meta property="og:image" content="${escapeAttr(image)}" />` : "",
    image && seo.imageAlt ? `<meta property="og:image:alt" content="${escapeAttr(seo.imageAlt)}" />` : "",
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(seo.twitterDescription)}" />`,
    image ? `<meta name="twitter:image" content="${escapeAttr(image)}" />` : "",
    `<script type="application/ld+json" id="structured-data">${JSON.stringify(seo.jsonLd).replace(/</g, "\\u003c")}</script>`,
  ]
    .filter(Boolean)
    .join("\n");
  next = next.replace("</head>", `<!--discovery-->\n${links}\n<!--/discovery-->\n</head>`);
  const noscript = `<noscript><p>${escapeHtml(seo.description)}</p></noscript>`;
  if (/<noscript>[\s\S]*?<\/noscript>/.test(next)) {
    next = next.replace(/<noscript>[\s\S]*?<\/noscript>/, noscript);
  } else if (next.includes("<body>")) {
    next = next.replace("<body>", `<body>\n${noscript}`);
  }
  return next;
}
