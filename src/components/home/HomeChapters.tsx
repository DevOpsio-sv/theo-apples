import { Link } from "react-router-dom";
import { useLocale } from "../../app/locale";
import { copy } from "../../content/copy";
import { homeMedia } from "../../content/home";
import { pathFor } from "../../content/paths";
import { ContentRequired } from "../seo/Breadcrumbs";
import { Image } from "../ui/Image";
import { TextLink } from "../ui/TextLink";
import "./HomeChapters.css";

export function HomeChapters() {
  const { locale } = useLocale();
  const text = copy(locale);
  const chapters = [
    { key: "process" as const, route: "process" as const },
    { key: "available" as const, route: "available-works" as const },
    { key: "exhibitions" as const, route: "exhibitions" as const },
    { key: "journal" as const, route: "blog" as const },
  ];

  return (
    <>
      <section className="home-studio">
        <div>
          <p className="label">{text.studio.label}</p>
          <p>{text.studio.body}</p>
          <TextLink to={pathFor(locale, "artist")}>{text.studio.cta}</TextLink>
        </div>
        <figure>
          <Image src={homeMedia.portrait.src} alt={text.alts.portrait} width={homeMedia.portrait.width} height={homeMedia.portrait.height} />
          <figcaption>{text.alts.portrait}</figcaption>
        </figure>
      </section>
      {chapters.map((chapter) => (
        <section className="home-chapter" key={chapter.key}>
          <h2>{text.chapters[chapter.key].title}</h2>
          <p>{text.chapters[chapter.key].body}</p>
          {chapter.key === "exhibitions" ? <ContentRequired detail={text.required.exhibitions} /> : null}
          {chapter.key === "journal" ? <ContentRequired detail={text.required.articles} /> : null}
          {chapter.key === "available" ? <ContentRequired detail={text.required.available} /> : null}
          <Link to={pathFor(locale, chapter.route)}>{text.chapters[chapter.key].cta}</Link>
        </section>
      ))}
    </>
  );
}
