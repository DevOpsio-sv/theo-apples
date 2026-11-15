import { Link } from "react-router-dom";
import { useLocale } from "../../app/locale";
import { copy } from "../../content/copy";
import type { Mark } from "../../content/copy/types";
import { pathFor } from "../../content/paths";
import { SectionLabel } from "../ui/SectionLabel";
import "./CollectionRange.css";

function RangeMark({ mark }: { mark: Mark }) {
  if (mark === "apple") {
    return (
      <svg
        className="range__mark"
        viewBox="0 0 160 180"
        fill="none"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M80 28c8-18 26-26 38-26-4 20-14 32-30 40 24 6 46 30 46 64 0 40-28 70-54 70S26 146 26 106c0-34 22-58 46-64C56 34 46 22 42 2c12 0 30 8 38 26z"
        />
        <path
          fill="currentColor"
          opacity="0.55"
          d="M76 34c12-4 24-16 28-28-14 4-26 12-32 24 2 2 3 3 4 4z"
        />
        <ellipse cx="80" cy="18" rx="5" ry="10" fill="currentColor" opacity="0.7" />
      </svg>
    );
  }

  if (mark === "bust") {
    return (
      <svg
        className="range__mark"
        viewBox="0 0 160 180"
        fill="none"
        aria-hidden="true"
      >
        <ellipse cx="80" cy="52" rx="34" ry="40" fill="currentColor" />
        <path
          fill="currentColor"
          d="M38 98c10-14 26-20 42-20s32 6 42 20c12 14 18 36 18 56H20c0-20 6-42 18-56z"
        />
        <path
          fill="currentColor"
          opacity="0.35"
          d="M66 44c6-10 18-14 28-10-8 6-14 14-16 24-6-4-10-8-12-14z"
        />
      </svg>
    );
  }

  if (mark === "frame") {
    return (
      <svg className="range__mark" viewBox="0 0 160 180" fill="none" aria-hidden="true">
        <rect x="28" y="24" width="104" height="132" stroke="currentColor" strokeWidth="8" />
        <path d="M40 130l28-40 18 22 14-16 20 34H40z" fill="currentColor" />
      </svg>
    );
  }

  if (mark === "plan") {
    return (
      <svg className="range__mark" viewBox="0 0 180 140" fill="none" aria-hidden="true">
        <path d="M24 110V36h70v74H24zm70-40h62v40H94V70z" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg
      className="range__mark"
      viewBox="0 0 180 140"
      fill="none"
      aria-hidden="true"
    >
      <ellipse cx="90" cy="38" rx="52" ry="22" fill="currentColor" />
      <path
        fill="currentColor"
        d="M24 54h132v10H24zm16 10h16v48H40zm84 0h16v48h-16zM14 112h152v10H14z"
      />
      <ellipse cx="90" cy="36" rx="18" ry="8" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

export function CollectionRange() {
  const { locale } = useLocale();
  const { label, cta, items } = copy(locale).bodies;

  return (
    <section className="range" aria-labelledby="range-heading">
      <header className="range__header">
        <SectionLabel id="range-heading">{label}</SectionLabel>
        <Link className="range__cta" to={pathFor(locale, "work")}>
          {cta}
        </Link>
      </header>

      <div className="range__grid">
        {items.map((column) => (
          <Link className="range__column" to={pathFor(locale, column.route)} key={column.route}>
            <h2>{column.title}</h2>
            <p>{column.text}</p>
            <RangeMark mark={column.mark} />
          </Link>
        ))}
      </div>
    </section>
  );
}
