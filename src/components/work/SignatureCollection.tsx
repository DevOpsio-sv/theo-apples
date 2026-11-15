import { Link } from "react-router-dom";
import { useLocale } from "../../app/locale";
import { pathFor } from "../../content/paths";
import { workCopy, workStills } from "../../content/work-gallery";
import { TextLink } from "../ui/TextLink";
import { SectionHeading } from "./SectionHeading";
import { Reveal, WorkImage } from "./WorkImage";
import { stillPath } from "./ArtworkTile";

const supports = [workStills.verdant, workStills.crimson, workStills.striped];

export function SignatureCollection() {
  const { locale } = useLocale();
  const major = workStills.gilded;

  return (
    <section className="work-signature" aria-labelledby="theo-apples-heading">
      <Reveal kind="label">
        <SectionHeading
          kicker={workCopy.signatureLabel[locale]}
          title={workCopy.headings.theo[locale]}
          headingId="theo-apples-heading"
        />
      </Reveal>
      <div className="work-signature__cluster">
        <Reveal kind="image" className="work-signature__major">
          <Link to={stillPath(major, locale)}>
            <figure className="work-figure">
              <WorkImage still={major} sizes="(min-width: 900px) 42vw, 100vw" parallax />
            </figure>
          </Link>
        </Reveal>
        <div className="work-signature__supports">
          {supports.map((still) => (
            <Reveal key={still.id} kind="image">
              <Link to={stillPath(still, locale)}>
                <figure className="work-figure">
                  <WorkImage still={still} sizes="(min-width: 900px) 18vw, 100vw" />
                </figure>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
      <Reveal kind="text" className="work-signature__copy">
        <p className="work-signature__line">{workCopy.signature[locale]}</p>
        <p>{workCopy.signatureNote[locale]}</p>
        <TextLink to={pathFor(locale, "theo-apples")}>{workCopy.cta.theo[locale]} →</TextLink>
      </Reveal>
    </section>
  );
}
