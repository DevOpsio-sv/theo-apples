import { Link } from "react-router-dom";
import { useLocale } from "../../app/locale";
import { copy } from "../../content/copy";
import { getFeaturedArtworks } from "../../data/artworks";
import { artworkAvailabilityLabel, artworkCaption } from "../../lib/artwork-display";
import { artworkPath } from "../../content/paths";
import { Image } from "../ui/Image";
import { SectionLabel } from "../ui/SectionLabel";
import "./FeaturedCreations.css";

export function FeaturedCreations() {
  const { locale } = useLocale();
  const featured = getFeaturedArtworks();

  return (
    <section className="featured" aria-labelledby="featured-heading">
      <SectionLabel id="featured-heading">{copy(locale).featuredLabel}</SectionLabel>
      <div className="featured__grid">
        {featured.map((artwork) => {
          const image = artwork.images[0];
          return (
            <Link className="featured__item" to={artworkPath(locale, artwork.category, artwork.slug)} key={artwork.id}>
              {image ? (
                <figure>
                  <div className="featured__image">
                    <Image src={image.src} alt={image.alt[locale]} width={image.width} height={image.height} />
                  </div>
                  <figcaption className="featured__caption">{image.caption?.[locale] ?? artworkCaption(artwork, locale)}</figcaption>
                </figure>
              ) : null}
              <h2 className="featured__title">{artwork.title}</h2>
              <p className="featured__materials">{artwork.materials[locale]}</p>
              <p className="featured__status">{artworkAvailabilityLabel(artwork, locale)}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
