import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLocale } from "../../app/locale";
import type { WorkStill } from "../../content/work-gallery";

function srcSet(sources: { src: string; width: number }[]) {
  return sources.map((source) => `${source.src} ${source.width}w`).join(", ");
}

function useParallax(enabled: boolean) {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const parent = node.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
      const shift = Math.max(-1, Math.min(1, progress)) * rect.height * -0.035;
      node.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [enabled]);

  return ref;
}

export function WorkImage({
  still,
  sizes,
  priority = false,
  parallax = false,
}: {
  still: WorkStill;
  sizes: string;
  priority?: boolean;
  parallax?: boolean;
}) {
  const { locale } = useLocale();
  const ref = useParallax(parallax);
  const avif = srcSet(still.avif);
  const webp = srcSet(still.webp);

  return (
    <picture className={`work-picture${still.fit === "cover" ? " work-picture--cover" : ""}`}>
      {avif ? <source type="image/avif" srcSet={avif} sizes={sizes} /> : null}
      {webp ? <source type="image/webp" srcSet={webp} sizes={sizes} /> : null}
      <img
        ref={ref}
        src={still.src}
        alt={still.alt[locale]}
        width={still.width}
        height={still.height}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
      />
    </picture>
  );
}

export function Reveal({
  kind,
  className = "",
  immediate = false,
  children,
}: {
  kind: "label" | "image" | "text";
  className?: string;
  immediate?: boolean;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(immediate);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal reveal--${kind}${visible ? " is-in" : ""} ${className}`.trim()}>
      {children}
    </div>
  );
}
