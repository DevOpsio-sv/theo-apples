import type { ArtworkImage } from "../types/artwork";
import type { Locale } from "./paths";

/**
 * Verified records only.
 * Empty arrays are intentional: missing exhibitions, press, projects and
 * articles are listed in docs/CONTENT_REQUIRED.md and must not be invented.
 */

export interface ExhibitionRecord {
  slug: string;
  title: Record<Locale, string>;
  year?: number;
  venue?: string;
  city?: string;
  country?: string;
  kind?: "solo" | "group";
  summary: Record<Locale, string>;
  artworkSlugs: string[];
  images: ArtworkImage[];
  pressUrl?: string;
  catalogue?: string;
}

export interface ProjectRecord {
  slug: string;
  title: Record<Locale, string>;
  year?: number;
  location?: string;
  client?: string;
  materials: Record<Locale, string[]>;
  summary: Record<Locale, string>;
  description: Record<Locale, string>;
  images: ArtworkImage[];
}

export interface PressRecord {
  slug: string;
  publication: string;
  headline: string;
  date?: string;
  country?: string;
  url?: string;
  summary: Record<Locale, string>;
  relatedSlug?: string;
}

export interface ArticleRecord {
  slug: string;
  category:
    | "sculpture"
    | "theo-apples"
    | "materials"
    | "studio"
    | "exhibitions"
    | "collecting"
    | "furniture"
    | "projects"
    | "press";
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  publishedAt: string;
  paragraphs: Record<Locale, string[]>;
  image?: ArtworkImage;
  relatedArtworkSlugs: string[];
  relatedRoutes: ("theo-apples" | "process" | "artist" | "available-works" | "sculpture" | "furniture" | "exhibitions")[];
}

export const exhibitions: ExhibitionRecord[] = [];
export const projects: ProjectRecord[] = [];
export const pressItems: PressRecord[] = [];
export const articles: ArticleRecord[] = [];

export function getExhibition(slug: string) {
  return exhibitions.find((item) => item.slug === slug);
}

export function getProject(slug: string) {
  return projects.find((item) => item.slug === slug);
}

export function getArticle(slug: string) {
  return articles.find((item) => item.slug === slug);
}
