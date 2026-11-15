import type { Locale } from "./paths";

/** The person. Theo Apples is a collection, not another name for him. */
export const ARTIST_NAME: Record<Locale, string> = {
  en: "Teodor Dukov",
  bg: "Теодор Дуков",
};

export const COLLECTION_NAME = "Theo Apples";

export const SITE_ORIGIN = "https://www.theoapples.com";

/**
 * Official profiles only. Leave empty until Teodor confirms the URL.
 * Do not add scraper or reseller sites.
 */
export const SAME_AS: string[] = [];

export const PERSON_ID = `${SITE_ORIGIN}/#teodor-dukov`;
export const WEBSITE_ID = `${SITE_ORIGIN}/#website`;

export function artistName(locale: Locale): string {
  return ARTIST_NAME[locale];
}
