import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { primaryNav } from "../../src/content/navigation";
import { pathFor } from "../../src/content/paths";
import { resolveRedirect } from "../../src/content/redirects";
import { applyDocumentHead, indexablePaths, renderRobots, renderSitemap, renderSitemapIndex, resolveDocumentSeo } from "../../src/content/seo";

const HOME_DESCRIPTION =
  "Teodor Dukov is a Bulgarian sculptor and contemporary artist working across sculpture, collectible furniture, painting and object-based art, including the signature Theo Apples collection.";
const HOME_OG =
  "Sculpture, collectible furniture, painting and object-based art by Bulgarian artist Teodor Dukov, including the signature Theo Apples collection.";
const HOME_TWITTER = "Sculpture, collectible furniture, painting and object-based art by Bulgarian artist Teodor Dukov.";

function count(html: string, pattern: RegExp): number {
  return html.match(pattern)?.length ?? 0;
}

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
    expect(bg.title).toBe("Теодор Дуков | Български скулптор и съвременен художник");
    expect(en.title).not.toContain("T. Dukov");
    expect(en.description).toBe(HOME_DESCRIPTION);
    expect(en.description).not.toContain("works for particular places");
    expect(en.ogDescription).toBe(HOME_OG);
    expect(en.twitterDescription).toBe(HOME_TWITTER);
    expect(en.siteName).toBe("Teodor Dukov");
    expect(en.image).toBeUndefined();
    expect(en.canonical).toBe("https://teodordukov.com/en");
    expect(bg.canonical).toBe("https://teodordukov.com/bg");
    expect(bg.description).toBe(
      "Теодор Дуков е български скулптор и художник. Скулптура от дърво, Theo Apples, колекционерски мебели и творби за конкретни места.",
    );
    expect(bg.ogDescription).toBe(bg.description);
    expect(bg.twitterDescription).toBe(bg.description);
    expect(en.alternates).toEqual([
      { hreflang: "en", href: "https://teodordukov.com/en" },
      { hreflang: "bg", href: "https://teodordukov.com/bg" },
      { hreflang: "x-default", href: "https://teodordukov.com/en" },
    ]);
    expect(bg.alternates).toEqual(en.alternates);
    expect(en.index).toBe(true);
    expect(bg.index).toBe(true);
    expect(resolveDocumentSeo("/en/cart").index).toBe(false);
    expect(resolveDocumentSeo("/bg/kolichka").index).toBe(false);
    expect(resolveDocumentSeo("/en/theo-apples/crimson-gala-apple").canonical).toBe(
      "https://teodordukov.com/en/theo-apples/crimson-gala-apple",
    );
    expect(resolveDocumentSeo("/en/blog/not-a-real-article").index).toBe(false);
    expect(JSON.stringify(en.jsonLd)).toContain("https://teodordukov.com/en");
    expect(JSON.stringify(en.jsonLd)).not.toContain("theoapples.com");
    expect(JSON.stringify(en.jsonLd)).not.toContain("wixsite.com");
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
    expect(xml).toContain("https://teodordukov.com/en");
    expect(xml).toContain("https://teodordukov.com/bg");
    expect(xml).not.toContain("theoapples.com");
    expect(xml).not.toContain("wixsite.com");
    expect(xml).not.toContain("workers.dev");
    expect(renderSitemapIndex()).toContain("https://teodordukov.com/sitemap-pages.xml");
    expect(renderRobots()).toContain("Sitemap: https://teodordukov.com/sitemap.xml");
    expect(renderRobots()).not.toContain("noindex");
  });

  it("puts one set of crawlable metadata in the initial html", () => {
    const shell = readFileSync(new URL("../../index.html", import.meta.url), "utf8");
    const en = applyDocumentHead(shell, resolveDocumentSeo("/en"));
    const bg = applyDocumentHead(shell, resolveDocumentSeo("/bg"));
    const again = applyDocumentHead(en, resolveDocumentSeo("/bg"));

    expect(en).toContain("<title>Teodor Dukov | Bulgarian Sculptor &amp; Contemporary Artist</title>");
    expect(en).toContain(`content="${HOME_DESCRIPTION}"`);
    expect(en).toContain('rel="canonical" href="https://teodordukov.com/en"');
    expect(en).toContain('property="og:url" content="https://teodordukov.com/en"');
    expect(en).toContain('property="og:site_name" content="Teodor Dukov"');
    expect(en).toContain(`property="og:description" content="${HOME_OG}"`);
    expect(en).toContain(`name="twitter:description" content="${HOME_TWITTER}"`);
    expect(en).toContain('name="twitter:card" content="summary_large_image"');
    expect(en).toContain('name="robots" content="index, follow"');
    expect(en).not.toContain("noindex");
    expect(en).not.toContain("og:image");
    expect(en).not.toContain("twitter:image");
    expect(en).not.toContain("theoapples.com");
    expect(en).not.toContain("wixsite.com");
    expect(en).not.toContain("workers.dev");
    expect(en).not.toContain("pages.dev");
    expect(count(en, /hreflang="/g)).toBe(3);
    expect(count(en, /rel="canonical"/g)).toBe(1);
    expect(count(en, /name="description"/g)).toBe(1);
    expect(count(en, /property="og:url"/g)).toBe(1);
    expect(count(en, /id="structured-data"/g)).toBe(1);

    expect(bg).toContain("<html lang=\"bg\">");
    expect(bg).toContain("<title>Теодор Дуков | Български скулптор и съвременен художник</title>");
    expect(bg).toContain('rel="canonical" href="https://teodordukov.com/bg"');
    expect(bg).toContain('property="og:url" content="https://teodordukov.com/bg"');
    expect(bg).toContain('hreflang="en" href="https://teodordukov.com/en"');
    expect(bg).toContain('hreflang="x-default" href="https://teodordukov.com/en"');
    expect(bg).toContain('name="robots" content="index, follow"');
    expect(count(bg, /hreflang="/g)).toBe(3);
    expect(count(bg, /rel="canonical"/g)).toBe(1);
    expect(count(again, /hreflang="/g)).toBe(3);
    expect(count(again, /rel="canonical"/g)).toBe(1);
    expect(count(again, /<noscript>/g)).toBe(1);

    const artist = applyDocumentHead(
      "<html lang=\"en\"><head><title>Old</title><meta name=\"description\" content=\"old\" /></head><body></body></html>",
      resolveDocumentSeo("/en/artist"),
    );
    expect(artist).toContain("Teodor Dukov | Bulgarian Sculptor &amp; Artist");
    expect(artist).toContain('rel="canonical" href="https://teodordukov.com/en/artist"');
    expect(artist).toContain("https://teodordukov.com/images/contact/artist-portrait-gallery.png");
    expect(count(artist, /property="og:image"/g)).toBe(1);
    expect(count(artist, /name="twitter:image"/g)).toBe(1);
  });
});
