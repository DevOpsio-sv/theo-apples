import { resolveRedirect } from "../src/content/redirects.ts";
import { applyDocumentHead, renderImageSitemap, renderRobots, renderSitemap, renderSitemapIndex, resolveDocumentSeo } from "../src/content/seo.ts";
import { enquirySchema } from "../src/lib/enquiry.ts";

export interface Env {
  DB: D1Database;
  MEDIA: R2Bucket;
  ASSETS: Fetcher;
}

const TRACKING = new Set(["fbclid", "gclid", "gbraid", "wbraid", "mc_cid", "mc_eid", "yclid", "msclkid"]);

function stripTracking(url: URL): boolean {
  let changed = false;
  for (const key of [...url.searchParams.keys()]) {
    if (key.startsWith("utm_") || TRACKING.has(key)) {
      url.searchParams.delete(key);
      changed = true;
    }
  }
  return changed;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (request.method === "GET" && stripTracking(url)) {
      return Response.redirect(url.toString(), 301);
    }

    const redirectTo = resolveRedirect(url.pathname);
    if (redirectTo) {
      const destination = new URL(redirectTo, url.origin);
      destination.search = url.search;
      return Response.redirect(destination.toString(), 301);
    }

    if (url.pathname === "/sitemap.xml") {
      return new Response(renderSitemapIndex(), {
        headers: { "content-type": "application/xml; charset=utf-8" },
      });
    }

    if (url.pathname === "/sitemap-pages.xml") {
      return new Response(renderSitemap(), {
        headers: { "content-type": "application/xml; charset=utf-8" },
      });
    }

    if (url.pathname === "/sitemap-images.xml") {
      return new Response(renderImageSitemap(), {
        headers: { "content-type": "application/xml; charset=utf-8" },
      });
    }

    if (url.pathname === "/robots.txt") {
      return new Response(renderRobots(), {
        headers: { "content-type": "text/plain; charset=utf-8" },
      });
    }

    if (url.pathname === "/api/enquiries" && request.method === "POST") {
      const body: unknown = await request.json().catch(() => null);
      const parsed = enquirySchema.safeParse(body);
      if (!parsed.success) return Response.json({ ok: false, reason: "invalid" }, { status: 400 });
      return Response.json({ ok: false, delivered: false, reason: "studio_inbox_not_configured" }, { status: 503 });
    }

    if (url.pathname.startsWith("/api/")) {
      return Response.json({ ok: false, endpoint: url.pathname }, { status: 501 });
    }

    const asset = await env.ASSETS.fetch(request);
    const type = asset.headers.get("content-type") ?? "";
    if (!type.includes("text/html")) return asset;
    const html = await asset.text();
    const seo = resolveDocumentSeo(url.pathname);
    const headers = new Headers(asset.headers);
    headers.set("content-type", "text/html; charset=utf-8");
    return new Response(applyDocumentHead(html, seo), { status: asset.status, headers });
  },
} satisfies ExportedHandler<Env>;
