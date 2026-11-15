import { useLocation } from "react-router-dom";
import { useLocale } from "../app/locale";
import { ArtistIntro } from "../components/work/ArtistIntro";
import { ArtworkMosaic } from "../components/work/ArtworkMosaic";
import { AvailableWorkCard } from "../components/work/AvailableWorkCard";
import { CategoryIndex } from "../components/work/CategoryIndex";
import { SignatureCollection } from "../components/work/SignatureCollection";
import { SectionHeading } from "../components/work/SectionHeading";
import { WorkSection } from "../components/work/WorkSection";
import { Reveal, WorkImage } from "../components/work/WorkImage";
import { TextLink } from "../components/ui/TextLink";
import { Breadcrumbs } from "../components/seo/Breadcrumbs";
import { workCopy, workStills } from "../content/work-gallery";
import { pathFor } from "../content/paths";
import { crumbsFor } from "../content/seo";
import { getArtworksByCategory } from "../data/artworks";
import "../components/work/work.css";

export function WorkPage() {
  const { locale } = useLocale();
  const { pathname } = useLocation();
  const copy = workCopy;
  const available = getArtworksByCategory("theo-apples").slice(0, 4);
  const closeLines = copy.headings.close[locale].split("\n");

  return (
    <div className="work">
      <CategoryIndex />
      <div className="work-main">
        <header className="work-intro">
          <div className="work-intro__copy">
            <Breadcrumbs items={crumbsFor(pathname)} label={locale === "bg" ? "Пътека" : "Breadcrumb"} />
            <Reveal kind="label" immediate>
              <h1>{copy.title[locale]}</h1>
            </Reveal>
            <Reveal kind="text" immediate>
              <p className="work-intro__lede">{copy.lede[locale]}</p>
              {copy.intro[locale].map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </Reveal>
          </div>
          <Reveal kind="image" className="work-intro__figure" immediate>
            <figure className="work-figure">
              <WorkImage
                still={workStills.pilgrim}
                sizes="(min-width: 900px) 46vw, 100vw"
                priority
                parallax
              />
            </figure>
          </Reveal>
        </header>

        <WorkSection
          id="sculpture"
          index="01"
          title={copy.headings.sculpture[locale]}
          text={copy.sculpture[locale]}
          cta={{ label: copy.cta.sculpture[locale], to: pathFor(locale, "sculpture") }}
          layout="left-image"
          images={[workStills.dance, workStills.humility, workStills.hitrusha]}
        />
        <WorkSection
          id="furniture"
          index="02"
          title={copy.headings.furniture[locale]}
          aside={copy.furnitureAside[locale]}
          text={copy.furniture[locale]}
          cta={{ label: copy.cta.furniture[locale], to: pathFor(locale, "furniture") }}
          layout="right-image"
          images={[workStills.pearTable, workStills.carvedLegs]}
        />
        <WorkSection
          id="paintings"
          index="03"
          title={copy.headings.paintings[locale]}
          text={copy.paintings[locale]}
          cta={{ label: copy.cta.paintings[locale], to: pathFor(locale, "paintings") }}
          layout="gallery"
          images={[workStills.greenEyes, workStills.sisters, workStills.girlWithCoke]}
        />
        <WorkSection
          id="projects"
          index="04"
          title={copy.headings.projects[locale]}
          text={copy.projects[locale]}
          cta={{ label: copy.cta.projects[locale], to: pathFor(locale, "projects") }}
          layout="full-width"
          images={[workStills.exhibition]}
        />

        <SignatureCollection />
        <ArtworkMosaic />

        <section className="work-material" aria-labelledby="material-heading">
          <figure className="work-figure work-figure--bleed">
            <WorkImage still={workStills.surface} sizes="100vw" parallax />
          </figure>
          <div className="work-material__copy">
            <Reveal kind="label">
              <SectionHeading title={copy.headings.material[locale]} headingId="material-heading" />
            </Reveal>
            <Reveal kind="text">
              <p>{copy.material[locale]}</p>
              <TextLink to={pathFor(locale, "process")}>{copy.cta.process[locale]} →</TextLink>
            </Reveal>
          </div>
        </section>

        <section className="work-available" aria-labelledby="available-heading">
          <Reveal kind="label">
            <SectionHeading title={copy.headings.available[locale]} headingId="available-heading" />
          </Reveal>
          <Reveal kind="text">
            <p className="work-available__note">{copy.availableNote[locale]}</p>
          </Reveal>
          {available.map((artwork) => (
            <AvailableWorkCard key={artwork.id} artwork={artwork} />
          ))}
          <TextLink to={pathFor(locale, "available-works")}>{copy.cta.available[locale]} →</TextLink>
        </section>

        <ArtistIntro />

        <section className="work-close" aria-labelledby="studio-cta-heading">
          <h2 id="studio-cta-heading">
            {closeLines.map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </h2>
          <p>{copy.close[locale]}</p>
          <div className="work-close__actions">
            <TextLink to={pathFor(locale, "contact")}>{copy.cta.contact[locale]} →</TextLink>
            <TextLink to={pathFor(locale, "available-works")}>{copy.cta.available[locale]} →</TextLink>
          </div>
        </section>
      </div>
    </div>
  );
}
