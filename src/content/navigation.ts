import type { Locale, RouteId } from "./paths";

export interface NavItem {
  id: string;
  label: Record<Locale, string>;
  route: RouteId;
  children?: NavItem[];
  /** Collapses into the secondary menu when the desktop row is tight. */
  secondary?: boolean;
}

/**
 * Public navigation. Paths are resolved per language.
 * FAQ, press and commissions stay in the footer.
 */
export const primaryNav: NavItem[] = [
  {
    id: "work",
    label: { en: "Work", bg: "Работа" },
    route: "work",
    children: [
      { id: "sculpture", label: { en: "Sculpture", bg: "Скулптура" }, route: "sculpture" },
      { id: "furniture", label: { en: "Furniture", bg: "Мебели" }, route: "furniture" },
      { id: "paintings", label: { en: "Paintings", bg: "Картини" }, route: "paintings" },
      { id: "projects", label: { en: "Projects", bg: "Проекти" }, route: "projects" },
    ],
  },
  { id: "theo-apples", label: { en: "Theo Apples", bg: "Theo Apples" }, route: "theo-apples" },
  { id: "available-works", label: { en: "Available Works", bg: "Налични творби" }, route: "available-works" },
  { id: "artist", label: { en: "Artist", bg: "Художник" }, route: "artist" },
  { id: "exhibitions", label: { en: "Exhibitions", bg: "Изложби" }, route: "exhibitions", secondary: true },
  { id: "process", label: { en: "Process", bg: "Процес" }, route: "process", secondary: true },
  { id: "blog", label: { en: "Blog", bg: "Блог" }, route: "blog" },
  { id: "contact", label: { en: "Contact", bg: "Контакт" }, route: "contact" },
];

export const utilityNav: NavItem[] = [
  { id: "account", label: { en: "Log In", bg: "Вход" }, route: "account" },
  { id: "cart", label: { en: "Cart", bg: "Количка" }, route: "cart" },
];

export const moreLabel: Record<Locale, string> = { en: "More", bg: "Още" };

/** Show Log In UI; auth backend may still be stubbed. */
export const showAccount = true;
