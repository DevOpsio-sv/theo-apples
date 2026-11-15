# MASTER IMPLEMENTATION PROMPT — THEO APPLES / T. DUKOV

You are a senior frontend architect, interaction designer and Cloudflare engineer.

Your task is to rebuild the Theo Apples Wix demo as a production-ready website owned and operated independently of Wix.

## Visual / UI reference (DEMO ONLY — not a migration source)

https://vasilevasilvena.wixsite.com/theo-apples

## Production domains (SEO — implement at cutover, Phase 9)

| Domain | Role |
|--------|------|
| https://www.theoapples.com/ | Primary production domain for the new site (transfer later) |
| https://teodordukov.com/ | Artist/name domain — thin hub or redirects; archive separately |
| archive.theoapples.com | Frozen archive of the current theoapples.com site (`noindex`) |
| archive.teodordukov.com | Frozen archive of the current teodordukov.com site (`noindex`) |

SEO cutover principles:

1. New site deploys to `www.theoapples.com`.
2. Map and **301** all indexed theoapples.com URLs to new routes.
3. Keep both old sites live only on `archive.*` subdomains with `noindex`.
4. Do not leave the old theoapples.com indexable beside the new site.
5. Avoid duplicate product content on teodordukov.com.
6. Wix demo URL has no SEO value — UI reference only.

See `docs/SEO_DOMAIN_CUTOVER.md` for the full plan.

---

## 1. PROJECT OBJECTIVE

Build a complete artist, portfolio and art-commerce website for Bulgarian artist Teodor Dukov and his Theo Apples collection.

Present: Theo Apples, sculptures, furniture, installations, limited editions, commissions, biography, portfolio, journal, contact, optional commerce, price-on-request flows, booking requests.

Deploy entirely on Cloudflare. Rebuild every visible element as clean semantic components. Do not reuse Wix runtime or bundles.

## 2. NON-NEGOTIABLE DESIGN DIRECTION

Warm ivory canvas, deep crimson typography, classical serif display, monospaced uppercase labels, thin crimson rules, asymmetrical compositions, floating artwork, generous empty space, exhibition-catalogue character.

Do not introduce: cards, rounded SaaS panels, glassmorphism, gradients, drop shadows, dark mode, blue accents, startup landing patterns, stock photography, generic AI art copy.

## 3. STACK

React, TypeScript, Vite, React Router, Cloudflare Workers + Static Assets, R2, D1, Turnstile, Wrangler, Zod, React Hook Form, Framer Motion (restrained), Vitest, Playwright, ESLint, Prettier.

Optional: @tanstack/react-query, clsx, date-fns, lucide-react, sharp (scripts).

No Next.js. No large CMS initially.

## 4–37

Follow the full scoped plan in the conversation brief: repository structure, routes, tokens, typography, header, homepage sections 1–8, works, artwork detail, portfolio, about, journal, commissions, visit, data models, D1, API, commerce, images, motion, responsive, a11y, SEO, performance, security, privacy, analytics, tests, Wix content migration hygiene, phases 1–9, acceptance criteria, and final delivery report.

**Build the site. Do not substitute a planning document for working code.**
