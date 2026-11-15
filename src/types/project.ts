import type { SeoFields } from "./artwork";
import type { ArtworkImage } from "./artwork";

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  year?: number;
  location?: string;
  client?: string;
  collaborators?: string[];
  categories: string[];
  materials: string[];
  images: ArtworkImage[];
  featured: boolean;
  seo: SeoFields;
}

export interface JournalEntry {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  publishedAt: string;
  updatedAt?: string;
  featuredImage: ArtworkImage;
  gallery?: ArtworkImage[];
  seo: SeoFields;
}
