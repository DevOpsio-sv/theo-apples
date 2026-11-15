import { useLocale } from "../../app/locale";
import { pathFor } from "../../content/paths";
import { workCopy, workStills } from "../../content/work-gallery";
import { TextLink } from "../ui/TextLink";
import { SectionHeading } from "./SectionHeading";
import { Reveal, WorkImage } from "./WorkImage";

export function ArtistIntro() {
  const { locale } = useLocale();
  return (
    <section className="work-artist" aria-labelledby="artist-heading">
      <Reveal kind="image">
        <figure className="work-figure work-figure--portrait">
          <WorkImage still={workStills.portrait} sizes="(min-width: 900px) 36vw, 100vw" />
        </figure>
      </Reveal>
      <div className="work-artist__copy">
        <Reveal kind="label">
          <SectionHeading title={workCopy.headings.artist[locale]} headingId="artist-heading" />
        </Reveal>
        <Reveal kind="text">
          <p>{workCopy.artist[locale]}</p>
          <TextLink to={pathFor(locale, "artist")}>{workCopy.cta.artist[locale]} →</TextLink>
        </Reveal>
      </div>
    </section>
  );
}
