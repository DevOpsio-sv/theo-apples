import { Link } from "react-router-dom";
import { useLocale } from "../../app/locale";
import { artworkPath, pathFor, type RouteId } from "../../content/paths";
import { workCopy, type WorkStill } from "../../content/work-gallery";
import { getArtworkBySlug } from "../../data/artworks";
import { WorkImage } from "./WorkImage";

const categoryRoute: Record<WorkStill["category"], RouteId> = {
  sculpture: "sculpture",
  furniture: "furniture",
  painting: "paintings",
  project: "projects",
  "theo-apples": "theo-apples",
};

export function stillPath(still: WorkStill, locale: "en" | "bg") {
  if (still.slug) {
    const artwork = getArtworkBySlug(still.slug);
    if (artwork) return artworkPath(locale, artwork.category, artwork.slug);
  }
  return pathFor(locale, categoryRoute[still.category]);
}

export function ArtworkTile({
  still,
  sizes,
  className = "",
}: {
  still: WorkStill;
  sizes: string;
  className?: string;
}) {
  const { locale } = useLocale();
  const copy = workCopy;
  const year = still.year ? String(still.year) : null;

  return (
    <Link className={`artwork-tile ${className}`.trim()} to={stillPath(still, locale)}>
      <figure className="work-figure">
        <WorkImage still={still} sizes={sizes} />
      </figure>
      <p className="artwork-tile__meta">
        <span>{still.title[locale]}</span>
        {year ? <span>{year}</span> : null}
        <span>{copy.categories[still.category][locale]}</span>
        <span className="artwork-tile__view">{copy.cta.viewWork[locale]} →</span>
      </p>
    </Link>
  );
}
