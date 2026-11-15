import { useLocale } from "../../app/locale";
import { copy } from "../../content/copy";
import { homeMedia } from "../../content/home";
import { pathFor } from "../../content/paths";
import { TextLink } from "../ui/TextLink";
import "./LimitedEditionFeature.css";

export function LimitedEditionFeature() {
  const { locale } = useLocale();
  const content = copy(locale).signature;

  return (
    <section className="limited" aria-labelledby="limited-heading">
      <img
        className="limited__bg"
        src={homeMedia.limited.src}
        alt={copy(locale).alts.limited}
        width={homeMedia.limited.width}
        height={homeMedia.limited.height}
      />
      <div className="limited__panel">
        <p className="limited__label">{content.label}</p>
        <div className="limited__body">
          <h2 id="limited-heading" className="limited__title">
            {content.title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <p className="limited__copy">{content.body}</p>
          <TextLink className="limited__cta" to={pathFor(locale, "theo-apples")}>
            {content.cta}
          </TextLink>
        </div>
      </div>
    </section>
  );
}
