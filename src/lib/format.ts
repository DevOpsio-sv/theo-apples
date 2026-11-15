export function formatArtworkStatus(status: string, locale: "en" | "bg" = "en"): string {
  const bg = locale === "bg";
  switch (status) {
    case "available":
      return bg ? "Налична" : "Available";
    case "reserved":
      return bg ? "Резервирана" : "Reserved";
    case "sold":
      return bg ? "Продадена" : "Sold";
    case "private_collection":
      return bg ? "Частна колекция" : "Private collection";
    case "made_to_order":
      return bg ? "По поръчка" : "Made to order";
    case "price_on_request":
      return bg ? "Цена по запитване" : "Price on request";
    case "commission_only":
      return bg ? "Само по поръчка" : "Commission only";
    case "archived":
      return bg ? "Архив" : "Archived";
    case "catalogue":
      return bg ? "В колекцията" : "In the collection";
    default:
      return status;
  }
}

export function formatEdition(edition?: {
  type: "unique" | "limited" | "open";
  number?: number;
  total?: number;
}): string | null {
  if (!edition) return null;
  if (edition.type === "unique") return "Unique work";
  if (edition.type === "limited" && edition.total) {
    if (edition.number) return `${edition.number} / ${edition.total}`;
    return `Edition of ${edition.total}`;
  }
  if (edition.type === "open") return "Open edition";
  return null;
}

export function formatPrice(amountCents: number, currency: "EUR" = "EUR"): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amountCents / 100);
}
