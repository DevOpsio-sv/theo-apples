import { bg } from "./bg";
import { en } from "./en";
import type { SiteCopy } from "./types";
import type { Locale } from "../paths";

const bundles: Record<Locale, SiteCopy> = { en, bg };

export function copy(locale: Locale): SiteCopy {
  return bundles[locale];
}
