/**
 * Public URLs are /en/… and /bg/….
 * Add a language by extending LOCALES and every Record<Locale, …>.
 * Do not machine-publish extra languages.
 */

export const LOCALES = ["en", "bg"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const ROUTE_IDS = [
  "home",
  "work",
  "sculpture",
  "furniture",
  "paintings",
  "projects",
  "theo-apples",
  "available-works",
  "artist",
  "exhibitions",
  "process",
  "blog",
  "contact",
  "commissions",
  "press",
  "faq",
  "cart",
  "account",
  "checkout-success",
  "checkout-cancel",
  "accessibility",
  "privacy",
  "terms",
  "shipping",
  "refunds",
] as const;

export type RouteId = (typeof ROUTE_IDS)[number];

export type ArtworkParent = "theo-apples" | "sculpture" | "furniture" | "paintings";

/** Routes whose public URL can carry one slug. */
export const SLUG_PARENTS = [
  "theo-apples",
  "sculpture",
  "furniture",
  "paintings",
  "projects",
  "exhibitions",
  "blog",
] as const satisfies readonly RouteId[];

export type SlugParent = (typeof SLUG_PARENTS)[number];

const segment = (en: string, bg: string): Record<Locale, string> => ({ en, bg });

/**
 * Path after the locale prefix. Home is empty.
 * Bulgarian slugs are transliterated so they stay stable in URLs.
 * Theo Apples stays Theo Apples: it is the collection name.
 */
export const routes: Record<RouteId, Record<Locale, string>> = {
  home: segment("", ""),
  work: segment("work", "rabota"),
  sculpture: segment("work/sculpture", "rabota/skulptura"),
  furniture: segment("work/furniture", "rabota/mebeli"),
  paintings: segment("work/paintings", "rabota/kartini"),
  projects: segment("projects", "proekti"),
  "theo-apples": segment("theo-apples", "theo-apples"),
  "available-works": segment("available-works", "nalichni-tvorbi"),
  artist: segment("artist", "hudozhnik"),
  exhibitions: segment("exhibitions", "izlozhbi"),
  process: segment("process", "protses"),
  blog: segment("blog", "blog"),
  contact: segment("contact", "kontakt"),
  commissions: segment("commissions", "porachki"),
  press: segment("press", "presa"),
  faq: segment("faq", "vaprosi"),
  cart: segment("cart", "kolichka"),
  account: segment("account", "profil"),
  "checkout-success": segment("checkout/success", "checkout/success"),
  "checkout-cancel": segment("checkout/cancel", "checkout/cancel"),
  accessibility: segment("accessibility", "dostapnost"),
  privacy: segment("policies/privacy", "politiki/poveritelnost"),
  terms: segment("policies/terms", "politiki/uslovia"),
  shipping: segment("policies/shipping", "politiki/dostavka"),
  refunds: segment("policies/refunds", "politiki/vrashtane"),
};

/** Indexed. Account, cart and checkout are reachable and noindex. */
export const INDEXABLE_ROUTES: RouteId[] = [
  "home",
  "work",
  "sculpture",
  "furniture",
  "paintings",
  "projects",
  "theo-apples",
  "available-works",
  "artist",
  "exhibitions",
  "process",
  "blog",
  "contact",
  "commissions",
  "press",
  "faq",
];

const PRIVATE_ROUTES = new Set<RouteId>(["cart", "account", "checkout-success", "checkout-cancel"]);

/** Legal text is not written yet, so these URLs stay out of the sitemap. */
const UNPUBLISHED_ROUTES = new Set<RouteId>(["privacy", "terms", "shipping", "refunds", "accessibility"]);

export function isLocale(value: string | undefined): value is Locale {
  return value === "en" || value === "bg";
}

export function pathFor(locale: Locale, id: RouteId): string {
  const rest = routes[id][locale];
  return rest ? `/${locale}/${rest}` : `/${locale}`;
}

export function artworkParent(category: string): ArtworkParent {
  if (category === "theo-apples") return "theo-apples";
  if (category === "furniture") return "furniture";
  if (category === "painting") return "paintings";
  return "sculpture";
}

export function artworkPath(locale: Locale, category: string, slug: string): string {
  return `${pathFor(locale, artworkParent(category))}/${slug}`;
}

export type PageMatch =
  | { kind: "route"; locale: Locale; id: RouteId }
  | { kind: "artwork"; locale: Locale; parent: ArtworkParent; slug: string }
  | { kind: "project"; locale: Locale; slug: string }
  | { kind: "exhibition"; locale: Locale; slug: string }
  | { kind: "article"; locale: Locale; slug: string }
  | { kind: "not-found"; locale: Locale | null };

export function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname;
}

export function matchLocalizedPath(pathname: string): PageMatch {
  const path = normalizePath(pathname);
  const parts = path.split("/").filter(Boolean);
  if (parts.length === 0) return { kind: "not-found", locale: null };
  const [maybeLocale, ...restParts] = parts;
  if (!isLocale(maybeLocale)) return { kind: "not-found", locale: null };
  const rest = restParts.join("/");
  if (rest === "") return { kind: "route", locale: maybeLocale, id: "home" };

  for (const id of ROUTE_IDS) {
    if (id === "home") continue;
    if (routes[id][maybeLocale] === rest) return { kind: "route", locale: maybeLocale, id };
  }

  const child = matchChild(maybeLocale, rest);
  if (child) return child;
  return { kind: "not-found", locale: maybeLocale };
}

function matchChild(locale: Locale, rest: string): PageMatch | null {
  for (const parent of ["theo-apples", "sculpture", "furniture", "paintings"] as const) {
    const prefix = `${routes[parent][locale]}/`;
    if (!rest.startsWith(prefix)) continue;
    const slug = rest.slice(prefix.length);
    if (slug && !slug.includes("/")) return { kind: "artwork", locale, parent, slug };
  }

  const nested = [
    ["project", "projects"],
    ["exhibition", "exhibitions"],
    ["article", "blog"],
  ] as const;

  for (const [kind, id] of nested) {
    const prefix = `${routes[id][locale]}/`;
    if (!rest.startsWith(prefix)) continue;
    const slug = rest.slice(prefix.length);
    if (slug && !slug.includes("/")) return { kind, locale, slug };
  }

  return null;
}

export function translatePath(pathname: string, target: Locale): string {
  const match = matchLocalizedPath(pathname);
  if (match.kind === "not-found") return pathFor(target, "home");
  if (match.kind === "route") return pathFor(target, match.id);
  if (match.kind === "artwork") return `${pathFor(target, match.parent)}/${match.slug}`;
  if (match.kind === "project") return `${pathFor(target, "projects")}/${match.slug}`;
  if (match.kind === "exhibition") return `${pathFor(target, "exhibitions")}/${match.slug}`;
  return `${pathFor(target, "blog")}/${match.slug}`;
}

export function isPrivatePath(pathname: string): boolean {
  const match = matchLocalizedPath(pathname);
  return match.kind === "route" && PRIVATE_ROUTES.has(match.id);
}

export function isIndexableRoute(id: RouteId): boolean {
  return !PRIVATE_ROUTES.has(id) && !UNPUBLISHED_ROUTES.has(id);
}
