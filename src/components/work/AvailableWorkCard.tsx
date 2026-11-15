import { Link } from "react-router-dom";
import { useLocale } from "../../app/locale";
import { artworkPath, pathFor } from "../../content/paths";
import { workCopy, workStills, type WorkStill } from "../../content/work-gallery";
import type { Artwork } from "../../types/artwork";
import { formatArtworkStatus } from "../../lib/format";
import { TextLink } from "../ui/TextLink";
import { WorkImage } from "./WorkImage";

const stillForSlug: Record<string, WorkStill> = {
  "gilded-concave-apple": workStills.gilded,
  "verdant-leaf-apple": workStills.verdant,
  "crimson-gala-apple": workStills.crimson,
};

function formatDimensions(artwork: Artwork, fallback: string) {
  const size = artwork.dimensions;
  if (!size) return fallback;
  const parts = [
    size.height ? `H ${size.height}` : null,
    size.width ? `W ${size.width}` : null,
    size.depth ? `D ${size.depth}` : null,
    size.diameter ? `Ø ${size.diameter}` : null,
  ].filter(Boolean);
  return parts.length > 0 ? `${parts.join(" × ")} ${size.unit}` : fallback;
}

export function AvailableWorkCard({ artwork }: { artwork: Artwork }) {
  const { locale } = useLocale();
  const still = stillForSlug[artwork.slug];
  const image = artwork.images[0];
  const enquire = `${pathFor(locale, "contact")}?intent=artwork&work=${artwork.slug}`;
  const facts = workCopy.facts;

  return (
    <article className="available-work">
      <Link className="available-work__image" to={artworkPath(locale, artwork.category, artwork.slug)}>
        {still ? (
          <figure className="work-figure">
            <WorkImage still={still} sizes="(min-width: 900px) 34vw, 100vw" />
          </figure>
        ) : image ? (
          <img src={image.src} alt={image.alt[locale]} width={image.width} height={image.height} />
        ) : null}
      </Link>
      <div className="available-work__facts">
        <h3>
          <Link to={artworkPath(locale, artwork.category, artwork.slug)}>{artwork.title}</Link>
        </h3>
        <dl>
          <div>
            <dt>{facts.year[locale]}</dt>
            <dd>{artwork.year ?? workCopy.onEnquiry[locale]}</dd>
          </div>
          <div>
            <dt>{facts.material[locale]}</dt>
            <dd>{artwork.materials[locale]}</dd>
          </div>
          <div>
            <dt>{facts.dimensions[locale]}</dt>
            <dd>{formatDimensions(artwork, workCopy.onEnquiry[locale])}</dd>
          </div>
          <div>
            <dt>{facts.availability[locale]}</dt>
            <dd>{formatArtworkStatus(artwork.status, locale)}</dd>
          </div>
        </dl>
        <TextLink to={enquire}>{workCopy.cta.enquire[locale]} →</TextLink>
      </div>
    </article>
  );
}
