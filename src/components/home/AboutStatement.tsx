import { useLocale } from "../../app/locale";
import { copy } from "../../content/copy";
import { pathFor } from "../../content/paths";
import { SectionLabel } from "../ui/SectionLabel";
import { TextLink } from "../ui/TextLink";
import "./AboutStatement.css";

export function AboutStatement() {
  const { locale } = useLocale();
  const text = copy(locale).intro;
  return (
    <section className="about-statement" aria-labelledby="artist-intro">
      <SectionLabel id="artist-intro">{text.label}</SectionLabel>
      <p className="about-statement__lead">{text.lead}</p>
      <p className="about-statement__body">{text.body}</p>
      <TextLink to={pathFor(locale, "artist")}>{text.cta}</TextLink>
    </section>
  );
}
