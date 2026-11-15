export interface SeoFields {
  title: string;
  description: string;
  image: string;
}

export interface Localized {
  en: string;
  bg: string;
}

export type ArtworkCategory =
  | "theo-apples"
  | "sculpture"
  | "furniture"
  | "painting"
  | "installation"
  | "limited-edition"
  | "commission";

export type ArtworkStatus =
  | "available"
  | "reserved"
  | "sold"
  | "private_collection"
  | "made_to_order"
  | "price_on_request"
  | "commission_only"
  | "archived"
  /** Published as a work. Availability has not been confirmed. */
  | "catalogue";

export interface ArtworkImage {
  id: string;
  src: string;
  alt: Localized;
  width: number;
  height: number;
  role: "primary" | "detail" | "context" | "process";
  focalPoint?: { x: number; y: number };
  caption?: Localized;
}

export interface ArtworkVariant {
  id: string;
  label: string;
  sku?: string;
  status: ArtworkStatus;
  priceCents?: number;
  purchasable: boolean;
}

export interface Artwork {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: ArtworkCategory;
  series?: string;
  status: ArtworkStatus;
  summary: Localized;
  description: Localized;
  year?: number;
  medium?: Localized;
  materials: Localized;
  finishes: Localized;
  dimensions?: {
    width?: number;
    height?: number;
    depth?: number;
    diameter?: number;
    unit: "cm";
  };
  edition?: {
    type: "unique" | "limited" | "open";
    number?: number;
    total?: number;
  };
  price?: {
    amountCents: number;
    currency: "EUR";
    public: boolean;
  };
  purchasable: boolean;
  featured: boolean;
  images: ArtworkImage[];
  variants: ArtworkVariant[];
  /** Share image. Page title and description are built per language. */
  shareImage: string;
  createdAt: string;
  updatedAt: string;
}
