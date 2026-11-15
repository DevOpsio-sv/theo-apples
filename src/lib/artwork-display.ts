import type { Locale } from "../content/paths";
import type { Artwork } from "../types/artwork";
import { formatArtworkStatus, formatEdition, formatPrice } from "./format";

export function artworkAvailabilityLabel(artwork: Artwork, locale: Locale = "en"): string {
  if (artwork.status === "available" && artwork.price?.public) {
    return formatPrice(artwork.price.amountCents, artwork.price.currency);
  }
  const edition = formatEdition(artwork.edition);
  if (artwork.status === "available" && edition) return edition;
  return formatArtworkStatus(artwork.status, locale);
}

export function artworkCaption(artwork: Artwork, locale: Locale): string {
  const material = artwork.materials[locale];
  return [artwork.title, locale === "bg" ? "Теодор Дуков" : "Teodor Dukov", material]
    .filter(Boolean)
    .join(", ");
}
