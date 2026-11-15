# Theo Apples

Editorial portfolio and collection site for Teodor Dukov — React, TypeScript, Vite, Cloudflare Workers.

Visual reference (UI demo only): https://vasilevasilvena.wixsite.com/theo-apples  
Production domain (cut over later): https://www.theoapples.com/

## Local setup

```sh
npm install
npm run dev
```

Dev server defaults to http://localhost:3010

```sh
npm run build
npm run typecheck
npm run test
```

## Docs

- [Master implementation prompt](docs/MASTER_IMPLEMENTATION_PROMPT.md)
- [SEO / domain cutover](docs/SEO_DOMAIN_CUTOVER.md) — theoapples.com + teodordukov.com archives
- [Status](docs/STATUS.md)
- [International discovery](docs/INTERNATIONAL_DISCOVERY.md)
- [Content required from the artist](docs/CONTENT_REQUIRED.md)

## Media

Owned photography (author-approved) lives under `public/images/`:

- Homepage sets: `hero/`, `featured/`, `split/`, `limited/`, `contact/`
- Full archives: `source/theoapples-com/`, `source/teodordukov-com/`, `source/wix-demo/`
- Manifest: `docs/reference/IMAGE_MANIFEST.md`

Forms, D1 APIs, and checkout are still stubbed for later phases. Before launch, move originals to R2 and generate AVIF/WebP derivatives.
