import { useEffect, useState } from "react";
import { useLocale } from "../../app/locale";
import { primaryNav } from "../../content/navigation";

const SECTION_IDS = ["sculpture", "furniture", "paintings", "projects"] as const;

export function CategoryIndex() {
  const { locale } = useLocale();
  const [active, setActive] = useState<string | null>(null);
  const items = primaryNav.find((item) => item.id === "work")?.children ?? [];

  useEffect(() => {
    const update = () => {
      const marker = window.innerHeight * 0.34;
      const current = [...SECTION_IDS].reverse().find((id) => {
        const node = document.getElementById(id);
        if (!node) return false;
        const rect = node.getBoundingClientRect();
        return rect.top <= marker && rect.bottom > marker * 0.45;
      });
      setActive(current ?? null);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <nav className="work-index" aria-label={locale === "bg" ? "Раздели в Работа" : "Work sections"}>
      {items.map((item) => (
        <a key={item.id} href={`#${item.id}`} aria-current={active === item.id ? "true" : undefined}>
          {item.label[locale]}
        </a>
      ))}
    </nav>
  );
}
