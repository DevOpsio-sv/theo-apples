import { TextLink } from "../ui/TextLink";
import type { WorkStill } from "../../content/work-gallery";
import { Reveal, WorkImage } from "./WorkImage";
import { SectionHeading } from "./SectionHeading";

export type WorkLayout = "left-image" | "right-image" | "gallery" | "full-width";

export function WorkSection({
  id,
  index,
  title,
  aside,
  text,
  cta,
  layout,
  images,
}: {
  id: string;
  index: string;
  title: string;
  aside?: string;
  text: string;
  cta: { label: string; to: string };
  layout: WorkLayout;
  images: WorkStill[];
}) {
  const headingId = `${id}-heading`;
  const [lead, ...supports] = images;
  const largeSizes = "(min-width: 900px) 58vw, 100vw";

  return (
    <section id={id} className={`work-section work-section--${layout}`} aria-labelledby={headingId}>
      {layout === "gallery" || layout === "full-width" ? (
        <Reveal kind="label">
          <SectionHeading index={index} title={title} aside={aside} headingId={headingId} />
        </Reveal>
      ) : null}

      {lead && layout !== "gallery" ? (
        <Reveal kind="image" className="work-section__media">
          <figure className="work-figure">
            <WorkImage still={lead} sizes={layout === "full-width" ? "(min-width: 900px) 92vw, 100vw" : largeSizes} parallax />
          </figure>
          {supports.length > 0 ? (
            <div className="work-supports">
              {supports.map((still) => (
                <figure key={still.id} className="work-figure work-figure--support">
                  <WorkImage still={still} sizes="(min-width: 900px) 22vw, 48vw" />
                </figure>
              ))}
            </div>
          ) : null}
        </Reveal>
      ) : null}

      <div className="work-section__copy">
        {layout === "left-image" || layout === "right-image" ? (
          <Reveal kind="label">
            <SectionHeading index={index} title={title} aside={aside} headingId={headingId} />
          </Reveal>
        ) : null}
        <Reveal kind="text">
          <p>{text}</p>
          <TextLink to={cta.to}>{cta.label} →</TextLink>
        </Reveal>
      </div>

      {layout === "gallery" ? (
        <div className="work-paintings">
          {lead ? (
            <Reveal kind="image" className="work-paintings__lead">
              <figure className="work-figure">
                <WorkImage still={lead} sizes="(min-width: 900px) 48vw, 100vw" parallax />
              </figure>
            </Reveal>
          ) : null}
          <div className="work-paintings__side">
            {supports.map((still) => (
              <Reveal key={still.id} kind="image">
                <figure className="work-figure">
                  <WorkImage still={still} sizes="(min-width: 900px) 24vw, 100vw" />
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
