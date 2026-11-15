import type { Locale } from "../content/paths";

/**
 * Measurement names for a future tag manager.
 * No vendor script is injected. Events are pushed to dataLayer when present
 * and dispatched as "studio-analytics" for anything else listening.
 */
export type AnalyticsEvent =
  | { name: "artwork_view"; slug: string }
  | { name: "available_works_view" }
  | { name: "enquiry_click"; intent: string; slug?: string }
  | { name: "contact_submit"; intent: string; delivered: boolean }
  | { name: "commission_enquiry" }
  | { name: "cv_download" }
  | { name: "language_select"; locale: Locale }
  | { name: "blog_view"; slug?: string };

type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] };

export function track(event: AnalyticsEvent) {
  if (typeof window === "undefined") return;
  const payload = { ...event, path: window.location.pathname };
  const layer = (window as DataLayerWindow).dataLayer;
  layer?.push(payload);
  window.dispatchEvent(new CustomEvent("studio-analytics", { detail: payload }));
}
