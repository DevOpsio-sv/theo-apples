import type { Artwork, Localized } from "../types/artwork";

const text = (en: string, bg: string): Localized => ({ en, bg });

const img = (
  id: string,
  src: string,
  en: string,
  bg: string,
  w: number,
  h: number,
  captionEn: string,
  captionBg: string,
) => ({
  id,
  src,
  alt: text(en, bg),
  width: w,
  height: h,
  role: "primary" as const,
  caption: text(captionEn, captionBg),
});

/**
 * Catalogue seed from owned photographs.
 * Titles are working titles. Year, edition, exact finish and availability
 * are omitted until Teodor confirms them.
 */
export const artworks: Artwork[] = [
  {
    id: "aw-crimson-gala",
    slug: "crimson-gala-apple",
    title: "Crimson Gala Apple",
    category: "theo-apples",
    series: "Theo Apples",
    status: "catalogue",
    summary: text(
      "A carved wooden apple with a glossy crimson and gold surface, set on a small wooden block.",
      "Издълбана дървена ябълка с лъскава пурпурна и златна повърхност, поставена върху малко дървено блокче.",
    ),
    description: text(
      "Crimson Gala Apple is a Theo Apple by Teodor Dukov. The form is a whole apple, carved in wood and finished with a glossy surface that moves between crimson and gold. It stands on a small pale wooden block. The title is a working title. Year, dimensions, edition and the exact surface technique are still to be confirmed by the artist. The photograph shows the sculpture as an object: compact, polished, and made to be seen in the round.",
      "Crimson Gala Apple е Theo Apple на Теодор Дуков. Формата е цяла ябълка, издълбана от дърво, с лъскава повърхност между пурпурно и златно. Стои върху малко светло дървено блокче. Заглавието е работно. Годината, размерите, тиражът и точната техника на повърхността още не са потвърдени от художника. Снимката показва скулптурата като предмет: плътна, полирана, направена да се гледа от всички страни.",
    ),
    materials: text("Wood, with a coloured glossy surface", "Дърво, с цветна лъскава повърхност"),
    finishes: text("Glossy crimson and gold surface", "Лъскава пурпурна и златна повърхност"),
    medium: text("Wood sculpture", "Дървена скулптура"),
    purchasable: false,
    featured: true,
    images: [
      img(
        "cg-1",
        "/images/artworks/teodor-dukov-crimson-gala-apple-wood-sculpture.png",
        "Crimson and gold wooden apple sculpture by Teodor Dukov, on a small wooden block",
        "Пурпурна и златна дървена ябълка от Теодор Дуков върху малко дървено блокче",
        1200,
        1500,
        "Crimson Gala Apple, Teodor Dukov. Wood with a crimson and gold surface.",
        "Crimson Gala Apple, Теодор Дуков. Дърво с пурпурна и златна повърхност.",
      ),
    ],
    variants: [],
    shareImage: "/images/artworks/teodor-dukov-crimson-gala-apple-wood-sculpture.png",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "aw-green-leaf",
    slug: "verdant-leaf-apple",
    title: "Verdant Leaf Apple",
    category: "theo-apples",
    series: "Theo Apples",
    status: "catalogue",
    summary: text(
      "A green wooden apple with carved leaves and a stem, on a small wooden block.",
      "Зелена дървена ябълка с издълбани листа и дръжка, върху малко дървено блокче.",
    ),
    description: text(
      "Verdant Leaf Apple is a Theo Apple by Teodor Dukov. The apple is carved in wood and finished in green, with a stem and paired leaves that make the silhouette more botanical than the plain fruit. It is presented on a small wooden block. The title is a working title. Year, dimensions, edition and the precise finish have not yet been confirmed. What the photograph establishes is the form: fruit, leaf and stem, treated as one sculpture.",
      "Verdant Leaf Apple е Theo Apple на Теодор Дуков. Ябълката е издълбана от дърво и завършена в зелено, с дръжка и двойка листа, които правят силуета по-растителен от голия плод. Поставена е върху малко дървено блокче. Заглавието е работно. Годината, размерите, тиражът и точният финиш още не са потвърдени. Снимката установява формата: плод, листо и дръжка като една скулптура.",
    ),
    materials: text("Wood, with a green surface", "Дърво, със зелена повърхност"),
    finishes: text("Green surface, carved leaf and stem", "Зелена повърхност, издълбани листо и дръжка"),
    medium: text("Wood sculpture", "Дървена скулптура"),
    purchasable: false,
    featured: true,
    images: [
      img(
        "vl-1",
        "/images/artworks/teodor-dukov-verdant-leaf-apple-wood-sculpture.png",
        "Green wooden apple sculpture with leaves by Teodor Dukov",
        "Зелена дървена ябълка с листа от Теодор Дуков",
        1200,
        1500,
        "Verdant Leaf Apple, Teodor Dukov. Wood with a green surface, stem and leaves.",
        "Verdant Leaf Apple, Теодор Дуков. Дърво със зелена повърхност, дръжка и листа.",
      ),
    ],
    variants: [],
    shareImage: "/images/artworks/teodor-dukov-verdant-leaf-apple-wood-sculpture.png",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "aw-gold-concave",
    slug: "gilded-concave-apple",
    title: "Gilded Concave Apple",
    category: "theo-apples",
    series: "Theo Apples",
    status: "catalogue",
    summary: text(
      "A gilded wooden apple opened by two large concave cuts.",
      "Позлатена дървена ябълка, отворена с два големи вдлъбнати среза.",
    ),
    description: text(
      "Gilded Concave Apple is a Theo Apple by Teodor Dukov. The wooden apple is covered in a gold-coloured surface and opened by two circular hollows, so the pale timber inside the form becomes part of the sculpture. The title is a working title. Whether the gold is leaf, another metal application, or a coloured finish has not been confirmed, so the page describes what is visible: a gilded skin and two carved openings. Year, dimensions and edition are likewise unconfirmed.",
      "Gilded Concave Apple е Theo Apple на Теодор Дуков. Дървената ябълка е покрита със златиста повърхност и отворена с две кръгли вдлъбнатини, така че светлото дърво във вътрешността става част от скулптурата. Заглавието е работно. Дали златото е варак, друго метално покритие или цветен финиш, не е потвърдено, затова страницата описва видимото: позлатена кора и два издълбани отвора. Годината, размерите и тиражът също не са потвърдени.",
    ),
    materials: text("Wood, with a gilded surface", "Дърво, с позлатена повърхност"),
    finishes: text("Gilded surface and concave cuts", "Позлатена повърхност и вдлъбнати срезове"),
    medium: text("Wood sculpture", "Дървена скулптура"),
    purchasable: false,
    featured: true,
    images: [
      img(
        "gc-1",
        "/images/artworks/teodor-dukov-gilded-concave-apple-wood-sculpture.png",
        "Gilded wooden apple sculpture with two concave openings by Teodor Dukov",
        "Позлатена дървена ябълка с два вдлъбнати отвора от Теодор Дуков",
        1200,
        1500,
        "Gilded Concave Apple, Teodor Dukov. Wood with a gilded surface and two concave openings.",
        "Gilded Concave Apple, Теодор Дуков. Дърво с позлатена повърхност и два вдлъбнати отвора.",
      ),
    ],
    variants: [],
    shareImage: "/images/artworks/teodor-dukov-gilded-concave-apple-wood-sculpture.png",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
];

export function getFeaturedArtworks() {
  return artworks.filter((artwork) => artwork.featured);
}

export function getArtworkBySlug(slug: string) {
  return artworks.find((artwork) => artwork.slug === slug);
}

export function getArtworksByCategory(category: Artwork["category"]) {
  return artworks.filter((artwork) => artwork.category === category);
}

export function getRelatedArtworks(slug: string) {
  const current = getArtworkBySlug(slug);
  if (!current) return [];
  return artworks.filter((artwork) => artwork.category === current.category && artwork.slug !== slug);
}
