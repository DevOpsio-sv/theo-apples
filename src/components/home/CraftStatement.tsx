import { useLocale } from "../../app/locale";
import { copy } from "../../content/copy";
import "./CraftStatement.css";

export function CraftStatement() {
  const { locale } = useLocale();
  const lines = copy(locale).craft;
  return (
    <section className="craft-statement" aria-label={locale === "bg" ? "Занаят" : "Craft"}>
      <p className="craft-statement__text">
        {lines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </p>
    </section>
  );
}
