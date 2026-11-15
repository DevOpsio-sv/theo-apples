import { workCopy, workStills } from "../../content/work-gallery";
import { useLocale } from "../../app/locale";
import { ArtworkTile } from "./ArtworkTile";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./WorkImage";

const tiles = [
  { still: workStills.pilgrim, className: "artwork-mosaic__tall", sizes: "(min-width: 900px) 34vw, 100vw" },
  { still: workStills.humility, className: "artwork-mosaic__stack", sizes: "(min-width: 900px) 22vw, 100vw" },
  { still: workStills.hitrusha, className: "artwork-mosaic__stack", sizes: "(min-width: 900px) 22vw, 100vw" },
  { still: workStills.pearTable, className: "artwork-mosaic__wide", sizes: "(min-width: 900px) 58vw, 100vw" },
  { still: workStills.carvedLegs, className: "artwork-mosaic__detail", sizes: "(min-width: 900px) 28vw, 100vw" },
  { still: workStills.exhibition, className: "artwork-mosaic__wide", sizes: "(min-width: 900px) 70vw, 100vw" },
  { still: workStills.greenEyes, className: "artwork-mosaic__painting", sizes: "(min-width: 900px) 32vw, 100vw" },
  { still: workStills.gilded, className: "artwork-mosaic__apple", sizes: "(min-width: 900px) 22vw, 70vw" },
];

export function ArtworkMosaic() {
  const { locale } = useLocale();
  return (
    <section className="work-selected" aria-labelledby="selected-works-heading">
      <Reveal kind="label">
        <SectionHeading title={workCopy.headings.selected[locale]} headingId="selected-works-heading" />
      </Reveal>
      <div className="artwork-mosaic">
        {tiles.map((tile) => (
          <ArtworkTile key={tile.still.id} still={tile.still} sizes={tile.sizes} className={tile.className} />
        ))}
      </div>
    </section>
  );
}
