import { describe, expect, it } from "vitest";
import { primaryNav } from "../../src/content/navigation";
import { pathFor } from "../../src/content/paths";
import { resolveRedirect } from "../../src/content/redirects";
import { applyDocumentHead, indexablePaths, renderSitemap, resolveDocumentSeo } from "../../src/content/seo";

describe("resolveRedirect", () => {
  it("sends legacy and unprefixed urls to english locale urls", () => {
    expect(resolveRedirect("/")).toBe("/en");
    expect(resolveRedirect("/shop")).toBe("/en/available-works");
    expect(resolveRedirect("/about")).toBe("/en/artist");
    expect(resolveRedirect("/about/")).toBe("/en/artist");
    expect(resolveRedirect("/portfolio")).toBe("/en/work");
    expect(resolveRedirect("/portfolio/flight")).toBe("/en/projects/flight");
    expect(resolveRedirect("/works")).toBe("/en/available-works");
    expect(resolveRedirect("/works/sculpture")).toBe("/en/work/sculpture");
    expect(resolveRedirect("/works/theo-apples")).toBe("/en/theo-apples");
    expect(resolveRedirect("/journal")).toBe("/en/blog");
    expect(resolveRedirect("/journal/studio-note")).toBe("/en/blog/studio-note");
    expect(resolveRedirect("/work")).toBe("/en/work");
    expect(resolveRedirect("/artist")).toBe("/en/artist");
    expect(resolveRedirect("/artwork/crimson-gala-apple")).toBe("/en/theo-apples/crimson-gala-apple");
    expect(resolveRedirect("/bg/work")).toBe("/bg/rabota");
    expect(resolveRedirect("/en")).toBeNull();
    expect(resolveRedirect("/en/work")).toBeNull();
    expect(resolveRedirect("/bg/rabota")).toBeNull();
    expect(resolveRedirect("/en/theo-apples")).toBeNull();
  });

  it("does not chain redirects", () => {
    const samples = ["/", "/shop", "/about/", "/portfolio/flight", "/works/sculpture", "/journal/a", "/work", "/bg/work", "/artwork/crimson-gala-apple"];
    for (const from of samples) {
      const target = resolveRedirect(from);
      expect(target, from).toBeTruthy();
      expect(resolveRedirect(target!), from).toBeNull();
    }
  });
});

describe("primary navigation", () => {
  it("uses the artist menu and locale paths", () => {
    expect(primaryNav.map((item) => item.label.en)).toEqual([
      "Work",
      "Theo Apples",
      "Available Works",
      "Artist",
      "Exhibitions",
      "Process",
      "Blog",
      "Contact",
    ]);
    expect(primaryNav.map((item) => pathFor("en", item.route))).toEqual([
      "/en/work",
      "/en/theo-apples",
      "/en/available-works",
      "/en/artist",
      "/en/exhibitions",
      "/en/process",
      "/en/blog",
      "/en/contact",
    ]);
    expect(primaryNav.map((item) => pathFor("bg", item.route))).toContain("/bg/rabota");
    expect(primaryNav[0]?.children?.map((item) => pathFor("bg", item.route))).toEqual([
      "/bg/rabota/skulptura",
      "/bg/rabota/mebeli",
      "/bg/rabota/kartini",
      "/bg/proekti",
    ]);
  });
});

describe("document seo", () => {
  it("gives each language its own canonical, title and hreflang", () => {
    const en = resolveDocumentSeo("/en");
    const bg = resolveDocumentSeo("/bg");
    expect(en.title).toBe("Teodor Dukov | Bulgarian Sculptor & Contemporary Artist");
    expect(bg.title).toContain("Теодор Дуков");
    expect(en.title).not.toContain("T. Dukov");
    expect(en.canonical).toBe("https://www.theoapples.com/en");
    expect(bg.canonical).toBe("https://www.theoapples.com/bg");
    expect(en.alternates.map((item) => item.hreflang)).toEqual(["en", "bg", "x-default"]);
    expect(en.alternates.find((item) => item.hreflang === "x-default")?.href).toBe(en.canonical);
    expect(en.index).toBe(true);
    expect(resolveDocumentSeo("/en/cart").index).toBe(false);
    expect(resolveDocumentSeo("/en/theo-apples/crimson-gala-apple").canonical).toBe(
      "https://www.theoapples.com/en/theo-apples/crimson-gala-apple",
    );
    expect(resolveDocumentSeo("/en/blog/not-a-real-article").index).toBe(false);
  });

  it("lists both languages in the sitemap and leaves legacy urls out", () => {
    const paths = indexablePaths();
    expect(paths).toContain("/en/work/sculpture");
    expect(paths).toContain("/bg/rabota/skulptura");
    expect(paths).toContain("/en/theo-apples/crimson-gala-apple");
    expect(paths).toContain("/bg/theo-apples/crimson-gala-apple");
    expect(paths).not.toContain("/shop");
    expect(paths).not.toContain("/cart");
    expect(paths).not.toContain("/en/cart");
    const xml = renderSitemap();
    expect(xml).toContain('hreflang="bg"');
    expect(xml).toContain('hreflang="x-default"');
  });

  it("puts crawlable metadata in the initial html", () => {
    const html = applyDocumentHead("<html lang=\"en\"><head><title>Old</title><meta name=\"description\" content=\"old\" /></head><body></body></html>", resolveDocumentSeo("/en/artist"));
    expect(html).toContain("Teodor Dukov | Bulgarian Sculptor &amp; Artist");
    expect(html).toContain('rel="canonical"');
    expect(html).toContain("application/ld+json");
    expect(html).toContain("Bulgarian sculptor");
  });
});
