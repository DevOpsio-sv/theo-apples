# International discovery

English is the primary language. Bulgarian is the second. Neither is chosen from an IP address. `/` redirects to `/en`. The language control changes the URL.

## Addresses

| English | Bulgarian |
|---|---|
| `/en` | `/bg` |
| `/en/work` | `/bg/rabota` |
| `/en/work/sculpture` | `/bg/rabota/skulptura` |
| `/en/work/furniture` | `/bg/rabota/mebeli` |
| `/en/work/paintings` | `/bg/rabota/kartini` |
| `/en/projects` | `/bg/proekti` |
| `/en/theo-apples` | `/bg/theo-apples` |
| `/en/available-works` | `/bg/nalichni-tvorbi` |
| `/en/artist` | `/bg/hudozhnik` |
| `/en/exhibitions` | `/bg/izlozhbi` |
| `/en/process` | `/bg/protses` |
| `/en/blog` | `/bg/blog` |
| `/en/contact` | `/bg/kontakt` |
| `/en/commissions` | `/bg/porachki` |
| `/en/press` | `/bg/presa` |

A Theo Apple lives at `/en/theo-apples/[slug]` and `/bg/theo-apples/[slug]`. Sculpture, furniture and paintings use their section path plus the slug. `/en/artworks/[slug]` redirects to that canonical page.

Each indexable URL has `hreflang="en"`, `hreflang="bg"` and `hreflang="x-default"` pointing at the English URL. The canonical is the URL of that language, not the other language and not a filtered or campaign variant. `utm_`, `gclid` and `fbclid` are stripped with a 301.

## Names

English pages say **Teodor Dukov**. Bulgarian pages say **Теодор Дуков**. Theo Apples is only the signature collection. The site does not use T. Dukov, Theo, or TD as the artist’s name.

## Structured data

`Person` and `WebSite` identify Teodor Dukov. Artwork pages add `VisualArtwork` and `ImageObject`. Interior pages add `BreadcrumbList`. `sameAs` is omitted until an official profile URL is confirmed. There is no `Organization` node.

## Sitemaps

- `/sitemap.xml` — index
- `/sitemap-pages.xml` — pages and language alternates
- `/sitemap-images.xml` — artwork and homepage images

`/robots.txt` allows Googlebot-Image and Bingbot, and closes cart, account and checkout in both languages.

Submit the sitemap in Google Search Console and Bing Webmaster Tools at launch. Measure artwork views, available-works visits, enquiry clicks, contact submissions, commission enquiries, CV downloads, language choice and journal traffic. Events are pushed to `dataLayer` and dispatched as `studio-analytics`. No tag is installed yet, and the studio inbox is not connected.

## Adding a language

Add the code to `LOCALES` in `src/content/paths.ts` and fill every `Record<Locale, …>` plus a copy bundle. Do not publish a language by machine translation.
