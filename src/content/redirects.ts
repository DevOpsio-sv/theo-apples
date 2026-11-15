import { getArtworkBySlug } from "../data/artworks";
import {
  LOCALES,
  SLUG_PARENTS,
  artworkPath,
  isLocale,
  normalizePath,
  pathFor,
  routes,
  type Locale,
  type RouteId,
} from "./paths";

/**
 * Permanent redirects onto the locale URLs.
 * A target must itself be canonical: resolveRedirect(target) is null.
 * Language is never chosen from an IP address.
 */

const legacyExact: Record<string, string> = {
  "/shop": pathFor("en", "available-works"),
  "/shop-page": pathFor("en", "available-works"),
  "/works": pathFor("en", "available-works"),
  "/category/all-products": pathFor("en", "available-works"),
  "/about": pathFor("en", "artist"),
  "/about-us-1": pathFor("en", "artist"),
  "/portfolio": pathFor("en", "work"),
  "/portfolio-page": pathFor("en", "work"),
  "/category/sculptures": pathFor("en", "sculpture"),
  "/category/sculpture": pathFor("en", "sculpture"),
  "/category/furniture": pathFor("en", "furniture"),
  "/category/paintings": pathFor("en", "paintings"),
  "/category/projects": pathFor("en", "projects"),
  "/category/theo-apples": pathFor("en", "theo-apples"),
  "/category/commissions": pathFor("en", "commissions"),
  "/journal": pathFor("en", "blog"),
  "/book-online": pathFor("en", "contact"),
  "/visit": pathFor("en", "contact"),
  "/studio": pathFor("en", "process"),
  "/blank-1": pathFor("en", "faq"),
};

function canonicalRest(locale: Locale, rest: string): string | null {
  if (rest === "") return "";

  for (const id of Object.keys(routes) as RouteId[]) {
    if (routes[id][locale] === rest) return rest;
  }

  for (const source of LOCALES) {
    if (source === locale) continue;
    for (const id of Object.keys(routes) as RouteId[]) {
      const sourcePath = routes[id][source];
      if (sourcePath && sourcePath === rest) return routes[id][locale];
    }
  }

  for (const source of LOCALES) {
    for (const id of SLUG_PARENTS) {
      const parent = routes[id][source];
      if (!parent || !rest.startsWith(`${parent}/`)) continue;
      const slug = rest.slice(parent.length + 1);
      if (!slug || slug.includes("/")) return null;
      return `${routes[id][locale]}/${slug}`;
    }
  }

  for (const alias of ["artworks", "tvorbi"]) {
    if (rest === alias) return routes.work[locale];
    if (!rest.startsWith(`${alias}/`)) continue;
    const slug = rest.slice(alias.length + 1);
    if (!slug || slug.includes("/")) return null;
    const artwork = getArtworkBySlug(slug);
    if (!artwork) return null;
    const target = artworkPath(locale, artwork.category, artwork.slug);
    const prefix = `/${locale}/`;
    return target.startsWith(prefix) ? target.slice(prefix.length) : null;
  }

  return null;
}

export function resolveRedirect(pathname: string): string | null {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return resolveRedirect(pathname.slice(0, -1)) ?? pathname.slice(0, -1);
  }

  if (pathname === "" || pathname === "/") return "/en";

  const legacy = legacyExact[pathname];
  if (legacy) return legacy;

  if (pathname.startsWith("/journal/")) {
    const slug = pathname.slice("/journal/".length);
    return slug ? `${pathFor("en", "blog")}/${slug}` : pathFor("en", "blog");
  }

  if (pathname.startsWith("/portfolio/")) {
    const slug = pathname.slice("/portfolio/".length);
    return slug ? `${pathFor("en", "projects")}/${slug}` : pathFor("en", "projects");
  }

  if (pathname.startsWith("/artwork/")) {
    const slug = pathname.slice("/artwork/".length);
    const artwork = slug && !slug.includes("/") ? getArtworkBySlug(slug) : undefined;
    if (artwork) return artworkPath("en", artwork.category, artwork.slug);
    return pathFor("en", "work");
  }

  if (pathname.startsWith("/works/")) {
    const rest = pathname.slice("/works/".length);
    if (rest === "theo-apples") return pathFor("en", "theo-apples");
    if (rest.startsWith("theo-apples/")) {
      const slug = rest.slice("theo-apples/".length);
      const artwork = slug && !slug.includes("/") ? getArtworkBySlug(slug) : undefined;
      if (artwork) return artworkPath("en", artwork.category, artwork.slug);
      return slug ? `${pathFor("en", "theo-apples")}/${slug}` : pathFor("en", "theo-apples");
    }
    if (rest === "projects") return pathFor("en", "projects");
    if (rest.startsWith("projects/")) {
      return `${pathFor("en", "projects")}/${rest.slice("projects/".length)}`;
    }
    const canon = canonicalRest("en", `work/${rest}`);
    if (canon !== null) return canon ? `/en/${canon}` : "/en";
    return null;
  }

  const parts = pathname.split("/").filter(Boolean);
  const head = parts[0];
  if (head && isLocale(head)) {
    const rest = parts.slice(1).join("/");
    const canon = canonicalRest(head, rest);
    if (canon === null) return null;
    const next = canon ? `/${head}/${canon}` : `/${head}`;
    return next === pathname ? null : next;
  }

  const unprefixed = canonicalRest("en", parts.join("/"));
  if (unprefixed !== null) {
    const next = unprefixed ? `/en/${unprefixed}` : "/en";
    return next === normalizePath(pathname) ? null : next;
  }

  return null;
}
