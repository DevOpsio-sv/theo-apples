# Implementation status

## Done

- Visual identity Cursor rule: `.cursor/rules/visual-identity.mdc`
- Wix screenshots archived: `docs/reference/screenshots/`
- Owned media ingest (author-approved):
  - theoapples.com: 261 images
  - teodordukov.com: 86 images
  - Wix demo: 94 images
  - User-supplied studio photos + ChatGPT sculpture group
  - Manifest: `docs/reference/IMAGE_MANIFEST.md`
- Homepage wired to **real photography** (hero collage, split, featured, limited, contact)
- Editorial sections tightened toward Wix structure (craft bar, range CTA, oversized CONTACT, limited hourglass panel)
- SEO cutover plan deferred: `docs/SEO_DOMAIN_CUTOVER.md`

## Improve vs Wix (intentional)

- Cleaner nav labels (WORKS / THEO APPLES / …)
- Real craft/about/range copy (no pottery/dinnerware placeholders)
- Better a11y landmarks and form labels
- Responsive recomposition

## International discovery

- English `/en/…` and Bulgarian `/bg/…` are separate URLs, with hreflang and a sitemap index
- Teodor Dukov is the artist. Theo Apples is the signature collection
- Artwork pages, archive pages, process, commissions, press and journal exist as real routes
- Unconfirmed biography, exhibitions, prices and press are listed in `docs/CONTENT_REQUIRED.md` and are not invented on the site
- Map: `docs/INTERNATIONAL_DISCOVERY.md`

## Next

- Works index + artwork detail with gallery
- Replace remaining SVG placeholders if any remain
- Turnstile / D1 forms
- R2 derivative pipeline (AVIF/WebP)
- Domain cutover when ready

## Local

```sh
npm install
npm run dev    # http://localhost:3010
```
