import { useLocale } from "../../app/locale";
import { copy } from "../../content/copy";
import { homeMedia } from "../../content/home";
import { EnquiryForm } from "../forms/EnquiryForm";
import { Image } from "../ui/Image";
import "./HomeContact.css";

export function HomeContact() {
  const { locale } = useLocale();
  const text = copy(locale).homeContact;

  return (
    <section className="home-contact" aria-labelledby="contact-heading">
      <div className="home-contact__form">
        <h2 id="contact-heading" className="home-contact__heading">
          {text.label}
        </h2>
        <p className="home-contact__intro">{text.intro}</p>
        <EnquiryForm />
      </div>
      <div className="home-contact__media">
        <Image src={homeMedia.portrait.src} alt={copy(locale).alts.portrait} width={homeMedia.portrait.width} height={homeMedia.portrait.height} />
      </div>
    </section>
  );
}
