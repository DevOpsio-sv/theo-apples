import type { RouteId } from "../paths";

export type Mark = "apple" | "bust" | "table" | "frame" | "plan";

export interface TextSection {
  id: string;
  title: string;
  paragraphs: string[];
}

export interface SiteCopy {
  hero: { title: string; subtitle: string; primary: string; secondary: string };
  craft: readonly [string, string];
  intro: { label: string; lead: string; body: string; cta: string };
  bodies: {
    label: string;
    cta: string;
    items: { route: RouteId; title: string; text: string; mark: Mark }[];
  };
  featuredLabel: string;
  studio: { label: string; body: string; cta: string };
  chapters: {
    process: { title: string; body: string; cta: string };
    available: { title: string; body: string; cta: string };
    exhibitions: { title: string; body: string; cta: string };
    journal: { title: string; body: string; cta: string };
  };
  signature: { label: string; title: readonly [string, string]; body: string; cta: string };
  homeContact: { label: string; intro: string };
  footerTagline: string;
  alts: {
    heroMain: string;
    floats: readonly [string, string, string, string, string, string];
    splitLeft: string;
    splitRight: string;
    limited: string;
    portrait: string;
  };
  work: { kicker: string; title: string; paragraphs: string[]; linkLabel: string };
  workSections: Record<"sculpture" | "theo-apples" | "furniture" | "paintings" | "projects", string[]>;
  sculpture: { kicker: string; title: string; paragraphs: string[] };
  theo: { kicker: string; title: string; sub: string; sections: TextSection[] };
  furniture: { kicker: string; title: string; paragraphs: string[]; categories: { title: string; text: string }[] };
  paintings: { kicker: string; title: string; paragraphs: string[] };
  projects: { kicker: string; title: string; paragraphs: string[] };
  available: { kicker: string; title: string; paragraphs: string[] };
  artist: { kicker: string; title: string; lede: string; sections: TextSection[] };
  exhibitions: { kicker: string; title: string; paragraphs: string[] };
  process: { kicker: string; title: string; lede: string; sections: TextSection[] };
  blog: { kicker: string; title: string; paragraphs: string[]; categories: { title: string; text: string }[] };
  contact: { kicker: string; title: string; paragraphs: string[] };
  commissions: {
    kicker: string;
    title: string;
    paragraphs: string[];
    may: { title: string; text: string }[];
    steps: { title: string; text: string }[];
    authorship: string;
  };
  press: { kicker: string; title: string; paragraphs: string[] };
  faq: { title: string; items: { q: string; a: string }[] };
  notFound: { title: string; body: string };
  utility: {
    cartTitle: string;
    cartBody: string;
    accountTitle: string;
    accountBody: string;
    thanksTitle: string;
    thanksBody: string;
    cancelTitle: string;
    cancelBody: string;
  };
  policy: Record<"privacy" | "terms" | "shipping" | "refunds" | "accessibility", { title: string; body: string }>;
  seo: Record<
    | "home"
    | "work"
    | "sculpture"
    | "furniture"
    | "paintings"
    | "projects"
    | "theo-apples"
    | "available-works"
    | "artist"
    | "exhibitions"
    | "process"
    | "blog"
    | "contact"
    | "commissions"
    | "press"
    | "faq",
    { title: string; description: string }
  >;
  enquiry: {
    name: string;
    email: string;
    phone: string;
    intent: string;
    message: string;
    consent: string;
    submit: string;
    select: string;
    intents: Record<
      "artwork" | "collector" | "gallery" | "exhibition" | "architect" | "commission" | "press" | "general",
      string
    >;
    notSent: string;
    invalid: string;
    aboutWork: string;
  };
  artworkUi: {
    artist: string;
    year: string;
    category: string;
    series: string;
    medium: string;
    materials: string;
    dimensions: string;
    edition: string;
    availability: string;
    location: string;
    reference: string;
    enquire: string;
    price: string;
    related: string;
    process: string;
    categories: Record<"theo-apples" | "sculpture" | "furniture" | "painting", string>;
  };
  required: {
    exhibitions: string;
    press: string;
    projects: string;
    articles: string;
    paintings: string;
    sculpture: string;
    furniture: string;
    available: string;
    biography: string;
    statement: string;
    education: string;
    collaborations: string;
    collections: string;
    cv: string;
    studio: string;
    history: string;
    bitten: string;
    artworkFacts: string;
    portrait: string;
  };
  crumbs: Record<
    | "home"
    | "work"
    | "sculpture"
    | "furniture"
    | "paintings"
    | "projects"
    | "theo-apples"
    | "available-works"
    | "artist"
    | "exhibitions"
    | "process"
    | "blog"
    | "contact"
    | "commissions"
    | "press"
    | "faq",
    string
  >;
  groups: {
    work: string;
    artist: string;
    acquisition: string;
    language: string;
    english: string;
    bulgarian: string;
  };
}
