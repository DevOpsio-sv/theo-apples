# SEO & Domain Cutover Plan (Phase 9)

Status: **Deferred until launch** — implement when transferring DNS.

## Domains

| Host | Purpose |
|------|---------|
| `www.theoapples.com` | New Cloudflare production site |
| `theoapples.com` | 301 → `www.theoapples.com` (single canonical host) |
| `archive.theoapples.com` | Static freeze of current theoapples.com; `noindex,follow` |
| `www.teodordukov.com` | Artist hub OR 301 important paths → theoapples.com `/about`, `/portfolio`, `/contact` |
| `teodordukov.com` | 301 → chosen www/hub policy |
| `archive.teodordukov.com` | Static freeze of current teodordukov.com; `noindex,follow` |

## UI demo (ignore for SEO)

`https://vasilevasilvena.wixsite.com/theo-apples` — visual reference only.

## Cutover checklist

1. Crawl and export URL inventory for theoapples.com and teodordukov.com (Screaming Frog / Search Console).
2. Build redirect table into D1 `redirects` + Worker middleware.
3. Export static archives; publish on `archive.*` with robots `noindex`.
4. Point theoapples.com DNS to Cloudflare; deploy Worker + assets.
5. Activate 301 map; verify with `curl -I`.
6. Submit new sitemap in Google Search Console.
7. Monitor coverage / 404s for 4–8 weeks.
8. Decide teodordukov.com strategy A (redirects) vs B (thin artist hub).

Language URLs are already `/en/…` and `/bg/…`. Cutover redirects should land on those, not on unprefixed paths. See `docs/INTERNATIONAL_DISCOVERY.md`.

## Example theoapples.com → new route mappings

| Legacy (examples — finalize after crawl) | New |
|------------------------------------------|-----|
| `/` | `/` |
| Category / product paths | `/works`, `/works/theo-apples`, `/artwork/:slug` |
| Contact / about equivalents | `/contact`, `/about` |

Store final map in `migrations/` seed or `content/redirects.ts`.
