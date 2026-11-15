import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { scroll, useMotionValue } from "framer-motion";
import { useLocale } from "../../app/locale";
import { copy } from "../../content/copy";
import { homeMedia } from "../../content/home";
import { pathFor } from "../../content/paths";
import { Image } from "../ui/Image";
import { FloatingArtwork } from "./FloatingArtwork";
import "./HeroCollage.css";

export function HeroCollage() {
  const { locale } = useLocale();
  const text = copy(locale);
  const { heroMain, floats } = homeMedia;
  const heroRef = useRef<HTMLElement>(null);
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    const target = heroRef.current;
    if (!target) return;
    return scroll(
      (value) => {
        scrollYProgress.set(value);
      },
      { target, offset: ["start start", "end start"] },
    );
  }, [scrollYProgress]);

  return (
    <section className="hero" ref={heroRef} aria-labelledby="hero-title">
      <div className="hero__stage">
        <div className="hero__title-group">
          <h1 id="hero-title" className="hero__title">
            {text.hero.title}
          </h1>
          <p className="hero__subtitle">{text.hero.subtitle}</p>
          <div className="hero__actions">
            <Link className="hero__cta" to={pathFor(locale, "work")}>
              {text.hero.primary}
            </Link>
            <Link className="hero__cta hero__cta--quiet" to={pathFor(locale, "available-works")}>
              {text.hero.secondary}
            </Link>
          </div>
        </div>

        <div className="hero__art" aria-label={locale === "bg" ? "Скулптури Theo Apples" : "Theo Apples sculptures"}>
          {floats.map((piece, index) => (
            <FloatingArtwork
              key={piece.slot}
              slot={piece.slot}
              src={piece.src}
              alt={text.alts.floats[index]}
              width={piece.width}
              height={piece.height}
              progress={scrollYProgress}
            />
          ))}
        </div>

        <div className="hero__featured">
          <Image
            className="hero__main"
            src={heroMain.src}
            alt={text.alts.heroMain}
            width={heroMain.width}
            height={heroMain.height}
            lazy={false}
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}
