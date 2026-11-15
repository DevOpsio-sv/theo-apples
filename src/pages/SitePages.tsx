import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocale } from "../app/locale";
import { Editorial, Prose, useCopy } from "../components/layout/Editorial";
import { EnquiryForm } from "../components/forms/EnquiryForm";
import { ContentRequired } from "../components/seo/Breadcrumbs";
import { Image } from "../components/ui/Image";
import { TextLink } from "../components/ui/TextLink";
import { homeMedia } from "../content/home";
import { artworkPath, pathFor, type ArtworkParent } from "../content/paths";
import { getArticle, getExhibition, getProject } from "../content/records";
import { getArtworkBySlug, getArtworksByCategory, getRelatedArtworks } from "../data/artworks";
import { artworkCaption } from "../lib/artwork-display";
import { track } from "../lib/analytics";
import { formatArtworkStatus, formatEdition } from "../lib/format";
import type { Artwork } from "../types/artwork";

export { WorkPage } from "./WorkPage";

function ArchiveList({ items }: { items: Artwork[] }) {
  const { locale } = useLocale();
  if (items.length === 0) return null;
  return (
    <ul className="archive">
      {items.map((artwork) => {
        const image = artwork.images[0];
        return (
          <li key={artwork.id}>
            <Link to={artworkPath(locale, artwork.category, artwork.slug)}>
              {image ? (
                <figure>
                  <Image src={image.src} alt={image.alt[locale]} width={image.width} height={image.height} />
                  <figcaption>{image.caption?.[locale] ?? artworkCaption(artwork, locale)}</figcaption>
                </figure>
              ) : null}
              <h3>{artwork.title}</h3>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function SculpturePage() {
  const text = useCopy();
  return (
    <Editorial kicker={text.sculpture.kicker} title={text.sculpture.title} lede={text.sculpture.paragraphs[0]}>
      {text.sculpture.paragraphs.slice(1).map((paragraph) => (
        <p key={paragraph.slice(0, 40)} className="editorial__note">{paragraph}</p>
      ))}
      <figure className="editorial__figure">
        <Image src={homeMedia.splitRight.src} alt={text.alts.splitRight} width={homeMedia.splitRight.width} height={homeMedia.splitRight.height} />
        <figcaption>{text.alts.splitRight}</figcaption>
      </figure>
      <ContentRequired detail={text.required.sculpture} />
    </Editorial>
  );
}

export function TheoApplesPage() {
  const { locale } = useLocale();
  const text = useCopy();
  return (
    <Editorial kicker={text.theo.kicker} title={text.theo.title} lede={text.theo.sub}>
      {text.theo.sections.map((section) => (
        <Prose key={section.id} id={section.id} title={section.title} paragraphs={section.paragraphs}>
          {section.id === "selected" ? <ArchiveList items={getArtworksByCategory("theo-apples")} /> : null}
          {section.id === "history" ? <ContentRequired detail={text.required.history} /> : null}
          {section.id === "form" ? <ContentRequired detail={text.required.bitten} /> : null}
          {section.id === "available" ? <TextLink to={pathFor(locale, "available-works")}>{text.crumbs["available-works"]}</TextLink> : null}
          {section.id === "making" ? <TextLink to={pathFor(locale, "process")}>{text.crumbs.process}</TextLink> : null}
          {section.id === "commissions" ? <TextLink to={pathFor(locale, "commissions")}>{text.crumbs.commissions}</TextLink> : null}
        </Prose>
      ))}
    </Editorial>
  );
}

export function FurniturePage() {
  const text = useCopy();
  return (
    <Editorial kicker={text.furniture.kicker} title={text.furniture.title} lede={text.furniture.paragraphs[0]}>
      {text.furniture.paragraphs.slice(1).map((paragraph) => (
        <p key={paragraph.slice(0, 40)} className="editorial__note">{paragraph}</p>
      ))}
      {text.furniture.categories.map((category) => (
        <Prose key={category.title} title={category.title} paragraphs={[category.text]} />
      ))}
      <ContentRequired detail={text.required.furniture} />
    </Editorial>
  );
}

export function PaintingsPage() {
  const text = useCopy();
  return (
    <Editorial kicker={text.paintings.kicker} title={text.paintings.title} lede={text.paintings.paragraphs[0]}>
      {text.paintings.paragraphs.slice(1).map((paragraph) => (
        <p key={paragraph.slice(0, 40)} className="editorial__note">{paragraph}</p>
      ))}
      <ContentRequired detail={text.required.paintings} />
    </Editorial>
  );
}

export function ProjectsPage() {
  const text = useCopy();
  return (
    <Editorial kicker={text.projects.kicker} title={text.projects.title} lede={text.projects.paragraphs[0]}>
      {text.projects.paragraphs.slice(1).map((paragraph) => (
        <p key={paragraph.slice(0, 40)} className="editorial__note">{paragraph}</p>
      ))}
      <ContentRequired detail={text.required.projects} />
    </Editorial>
  );
}

export function AvailableWorksPage() {
  const text = useCopy();
  useEffect(() => {
    track({ name: "available_works_view" });
  }, []);
  const groups = [text.crumbs.sculpture, text.crumbs["theo-apples"], text.crumbs.furniture, text.crumbs.paintings, text.crumbs.commissions];
  return (
    <Editorial kicker={text.available.kicker} title={text.available.title} lede={text.available.paragraphs[0]}>
      {text.available.paragraphs.slice(1).map((paragraph) => (
        <p key={paragraph.slice(0, 40)} className="editorial__note">{paragraph}</p>
      ))}
      {groups.map((group) => (
        <Prose key={group} title={group} paragraphs={[]} />
      ))}
      <ContentRequired detail={text.required.available} />
    </Editorial>
  );
}

const artistRequired = {
  biography: "biography",
  statement: "statement",
  education: "education",
  collaborations: "collaborations",
  collections: "collections",
  cv: "cv",
  studio: "studio",
} as const;

export function ArtistPage() {
  const { locale } = useLocale();
  const text = useCopy();
  return (
    <Editorial kicker={text.artist.kicker} title={text.artist.title} lede={text.artist.lede}>
      <figure className="editorial__figure">
        <Image src={homeMedia.portrait.src} alt={text.alts.portrait} width={homeMedia.portrait.width} height={homeMedia.portrait.height} />
        <figcaption>{text.alts.portrait}</figcaption>
      </figure>
      {text.artist.sections.map((section) => (
        <Prose key={section.id} id={section.id} title={section.title} paragraphs={section.paragraphs}>
          {section.id === "exhibitions" ? <TextLink to={pathFor(locale, "exhibitions")}>{text.crumbs.exhibitions}</TextLink> : null}
          {section.id === "projects" ? <TextLink to={pathFor(locale, "projects")}>{text.crumbs.projects}</TextLink> : null}
          {section.id === "press" ? <TextLink to={pathFor(locale, "press")}>{text.crumbs.press}</TextLink> : null}
          {section.id === "contact" ? <TextLink to={pathFor(locale, "contact")}>{text.crumbs.contact}</TextLink> : null}
          {section.id in artistRequired ? <ContentRequired detail={text.required[artistRequired[section.id as keyof typeof artistRequired]]} /> : null}
        </Prose>
      ))}
    </Editorial>
  );
}

export function ExhibitionsPage() {
  const text = useCopy();
  return (
    <Editorial kicker={text.exhibitions.kicker} title={text.exhibitions.title} lede={text.exhibitions.paragraphs[0]}>
      <p className="editorial__note">{text.exhibitions.paragraphs[1]}</p>
      <ContentRequired detail={text.required.exhibitions} />
    </Editorial>
  );
}

export function ProcessPage() {
  const text = useCopy();
  return (
    <Editorial kicker={text.process.kicker} title={text.process.title} lede={text.process.lede}>
      {text.process.sections.map((section) => (
        <Prose key={section.id} id={section.id} title={section.title} paragraphs={section.paragraphs} />
      ))}
      <ContentRequired detail={text.required.studio} />
    </Editorial>
  );
}

export function BlogPage() {
  const text = useCopy();
  useEffect(() => {
    track({ name: "blog_view" });
  }, []);
  return (
    <Editorial kicker={text.blog.kicker} title={text.blog.title} lede={text.blog.paragraphs[0]}>
      <p className="editorial__note">{text.blog.paragraphs[1]}</p>
      {text.blog.categories.map((category) => (
        <Prose key={category.title} title={category.title} paragraphs={[category.text]} />
      ))}
      <ContentRequired detail={text.required.articles} />
    </Editorial>
  );
}

export function PressPage() {
  const text = useCopy();
  return (
    <Editorial kicker={text.press.kicker} title={text.press.title} lede={text.press.paragraphs[0]}>
      <p className="editorial__note">{text.press.paragraphs[1]}</p>
      <ContentRequired detail={text.required.press} />
    </Editorial>
  );
}

export function CommissionsPage() {
  const { locale } = useLocale();
  const text = useCopy();
  return (
    <Editorial kicker={text.commissions.kicker} title={text.commissions.title} lede={text.commissions.paragraphs[0]}>
      {text.commissions.may.map((item) => (
        <Prose key={item.title} title={item.title} paragraphs={[item.text]} />
      ))}
      {text.commissions.steps.map((step) => (
        <Prose key={step.title} title={step.title} paragraphs={[step.text]} />
      ))}
      <p className="editorial__note">{text.commissions.authorship}</p>
      <TextLink to={`${pathFor(locale, "contact")}?intent=commission`} onClick={() => track({ name: "commission_enquiry" })}>
        {text.enquiry.intents.commission}
      </TextLink>
    </Editorial>
  );
}

export function ContactPage() {
  const text = useCopy();
  return (
    <Editorial kicker={text.contact.kicker} title={text.contact.title} lede={text.contact.paragraphs[0]}>
      <EnquiryForm />
    </Editorial>
  );
}

export function FaqPage() {
  const text = useCopy();
  return (
    <Editorial title={text.faq.title}>
      {text.faq.items.map((item) => (
        <section key={item.q} className="editorial__section">
          <h2>{item.q}</h2>
          <p>{item.a}</p>
        </section>
      ))}
    </Editorial>
  );
}

export function PolicyView({ id }: { id: "privacy" | "terms" | "shipping" | "refunds" | "accessibility" }) {
  const text = useCopy();
  const policy = text.policy[id];
  return (
    <Editorial title={policy.title} lede={policy.body}>
      <ContentRequired detail={policy.body} />
    </Editorial>
  );
}

export function UtilityPage({ kind }: { kind: "cart" | "account" | "thanks" | "cancel" }) {
  const text = useCopy().utility;
  const title = kind === "cart" ? text.cartTitle : kind === "account" ? text.accountTitle : kind === "thanks" ? text.thanksTitle : text.cancelTitle;
  const body = kind === "cart" ? text.cartBody : kind === "account" ? text.accountBody : kind === "thanks" ? text.thanksBody : text.cancelBody;
  return (
    <Editorial title={title}>
      <p className="editorial__lede">{body}</p>
    </Editorial>
  );
}

export function NotFoundPage() {
  const { locale } = useLocale();
  const text = useCopy();
  return (
    <Editorial title={text.notFound.title} lede={text.notFound.body}>
      <TextLink to={pathFor(locale, "home")}>{text.crumbs.home}</TextLink>
    </Editorial>
  );
}

export function RecordMissing() {
  return <NotFoundPage />;
}

export function ArticlePage({ slug }: { slug: string }) {
  const { locale } = useLocale();
  const article = getArticle(slug);
  const text = useCopy();
  useEffect(() => {
    if (article) track({ name: "blog_view", slug });
  }, [article, slug]);
  if (!article) return <NotFoundPage />;
  return (
    <Editorial title={article.title[locale]} lede={article.description[locale]}>
      {article.paragraphs[locale].map((paragraph) => (
        <p key={paragraph.slice(0, 40)} className="editorial__note">{paragraph}</p>
      ))}
      <TextLink to={pathFor(locale, "blog")}>{text.crumbs.blog}</TextLink>
    </Editorial>
  );
}

export function ProjectDetail({ slug }: { slug: string }) {
  const { locale } = useLocale();
  const project = getProject(slug);
  if (!project) return <NotFoundPage />;
  return (
    <Editorial title={project.title[locale]} lede={project.summary[locale]}>
      {project.description[locale].split("\n").map((paragraph) => (
        <p key={paragraph.slice(0, 40)}>{paragraph}</p>
      ))}
    </Editorial>
  );
}

export function ExhibitionDetail({ slug }: { slug: string }) {
  const { locale } = useLocale();
  const exhibition = getExhibition(slug);
  if (!exhibition) return <NotFoundPage />;
  return <Editorial title={exhibition.title[locale]} lede={exhibition.summary[locale]} />;
}

function dimensionLine(artwork: Artwork) {
  const size = artwork.dimensions;
  if (!size) return null;
  const bits = [size.height && `${size.height}`, size.width && `${size.width}`, size.depth && `${size.depth}`].filter(Boolean);
  if (bits.length === 0 && size.diameter) return `ø ${size.diameter} ${size.unit}`;
  return bits.length ? `${bits.join(" × ")} ${size.unit}` : null;
}

export function ArtworkView({ slug, parent }: { slug: string; parent: ArtworkParent }) {
  const { locale } = useLocale();
  const text = useCopy();
  const artwork = getArtworkBySlug(slug);
  useEffect(() => {
    if (artwork) track({ name: "artwork_view", slug });
  }, [artwork, slug]);
  if (!artwork) return <NotFoundPage />;
  const categoryKey = artwork.category === "painting" ? "painting" : artwork.category === "furniture" ? "furniture" : artwork.category === "theo-apples" ? "theo-apples" : "sculpture";
  const expected = artwork.category === "painting" ? "paintings" : categoryKey;
  if (expected !== parent) return <NotFoundPage />;
  const size = dimensionLine(artwork);
  const edition = formatEdition(artwork.edition);
  const related = getRelatedArtworks(slug);
  const contact = pathFor(locale, "contact");
  return (
    <Editorial title={artwork.title} lede={artwork.summary[locale]}>
      <p className="editorial__note">
        {text.artworkUi.artist}: {locale === "bg" ? "Теодор Дуков" : "Teodor Dukov"}
      </p>
      <dl className="meta-list">
        <dt>{text.artworkUi.category}</dt>
        <dd>{text.artworkUi.categories[categoryKey]}</dd>
        {artwork.series ? (
          <>
            <dt>{text.artworkUi.series}</dt>
            <dd>{artwork.series}</dd>
          </>
        ) : null}
        {artwork.year ? (
          <>
            <dt>{text.artworkUi.year}</dt>
            <dd>{artwork.year}</dd>
          </>
        ) : null}
        {artwork.medium ? (
          <>
            <dt>{text.artworkUi.medium}</dt>
            <dd>{artwork.medium[locale]}</dd>
          </>
        ) : null}
        <dt>{text.artworkUi.materials}</dt>
        <dd>{artwork.materials[locale]}</dd>
        {size ? (
          <>
            <dt>{text.artworkUi.dimensions}</dt>
            <dd>{size}</dd>
          </>
        ) : null}
        {edition ? (
          <>
            <dt>{text.artworkUi.edition}</dt>
            <dd>{edition}</dd>
          </>
        ) : null}
        <dt>{text.artworkUi.availability}</dt>
        <dd>{formatArtworkStatus(artwork.status, locale)}</dd>
      </dl>
      {artwork.description[locale].split("\n").map((paragraph) => (
        <p key={paragraph.slice(0, 48)} className="editorial__note">{paragraph}</p>
      ))}
      {artwork.images.map((image) => (
        <figure className="editorial__figure" key={image.id}>
          <Image src={image.src} alt={image.alt[locale]} width={image.width} height={image.height} />
          <figcaption>{image.caption?.[locale] ?? image.alt[locale]}</figcaption>
        </figure>
      ))}
      <ContentRequired detail={text.required.artworkFacts} />
      <div className="enquiry-actions">
        <TextLink to={`${contact}?intent=artwork&work=${artwork.slug}`} onClick={() => track({ name: "enquiry_click", intent: "artwork", slug: artwork.slug })}>
          {text.artworkUi.enquire}
        </TextLink>
        <TextLink to={`${contact}?intent=collector&work=${artwork.slug}`} onClick={() => track({ name: "enquiry_click", intent: "collector", slug: artwork.slug })}>
          {text.artworkUi.price}
        </TextLink>
      </div>
      <TextLink to={pathFor(locale, "process")}>{text.artworkUi.process}</TextLink>
      {related.length > 0 ? (
        <Prose title={text.artworkUi.related}>
          <ArchiveList items={related} />
        </Prose>
      ) : null}
    </Editorial>
  );
}
