import { useLocale } from "../../app/locale";
import { copy } from "../../content/copy";
import { homeMedia } from "../../content/home";
import { Image } from "../ui/Image";
import "./SplitArtworkSpread.css";

export function SplitArtworkSpread() {
  const { locale } = useLocale();
  const text = copy(locale);
  return (
    <section className="split-spread" aria-label={locale === "bg" ? "Избрана скулптура" : "Selected sculpture"}>
      <div className="split-spread__frame split-spread__left">
        <Image src={homeMedia.splitLeft.src} alt={text.alts.splitLeft} width={homeMedia.splitLeft.width} height={homeMedia.splitLeft.height} lazy={false} />
      </div>
      <div className="split-spread__frame split-spread__right">
        <Image src={homeMedia.splitRight.src} alt={text.alts.splitRight} width={homeMedia.splitRight.width} height={homeMedia.splitRight.height} />
      </div>
    </section>
  );
}
