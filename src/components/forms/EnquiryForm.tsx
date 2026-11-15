import { useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { useLocale } from "../../app/locale";
import { copy } from "../../content/copy";
import { getArtworkBySlug } from "../../data/artworks";
import { track } from "../../lib/analytics";
import { ENQUIRY_INTENTS, enquirySchema, type EnquiryIntent } from "../../lib/enquiry";
import { Button } from "../ui/Button";

export function EnquiryForm({ presetWork }: { presetWork?: string }) {
  const { locale } = useLocale();
  const text = copy(locale).enquiry;
  const [params] = useSearchParams();
  const intentParam = params.get("intent");
  const workSlug = presetWork || params.get("work") || "";
  const artwork = workSlug ? getArtworkBySlug(workSlug) : undefined;
  const initialIntent: EnquiryIntent = ENQUIRY_INTENTS.includes(intentParam as EnquiryIntent)
    ? (intentParam as EnquiryIntent)
    : "general";
  const [intent, setIntent] = useState<EnquiryIntent>(initialIntent);
  const [status, setStatus] = useState<"idle" | "invalid" | "not-sent">("idle");

  const workLabel = useMemo(() => artwork?.title ?? workSlug, [artwork, workSlug]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const parsed = enquirySchema.safeParse({
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone") || "",
      intent,
      message: form.get("message"),
      work: workSlug,
      locale,
      consent: form.get("consent") === "on" ? true : false,
    });
    if (!parsed.success) {
      setStatus("invalid");
      return;
    }
    let delivered = false;
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      delivered = response.ok;
    } catch {
      delivered = false;
    }
    track({ name: "contact_submit", intent: parsed.data.intent, delivered });
    if (parsed.data.intent === "commission") track({ name: "commission_enquiry" });
    setStatus("not-sent");
  };

  return (
    <form className="enquiry" onSubmit={onSubmit} noValidate>
      {workLabel ? (
        <p className="wide">
          {text.aboutWork} {workLabel}.
        </p>
      ) : null}
      <label>
        {text.name}
        <input name="name" autoComplete="name" required />
      </label>
      <label>
        {text.email}
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        {text.intent}
        <select name="intent" value={intent} onChange={(event) => setIntent(event.target.value as EnquiryIntent)}>
          {ENQUIRY_INTENTS.map((item) => (
            <option key={item} value={item}>
              {text.intents[item]}
            </option>
          ))}
        </select>
      </label>
      <label>
        {text.phone}
        <input name="phone" type="tel" autoComplete="tel" />
      </label>
      <label className="wide">
        {text.message}
        <textarea name="message" rows={6} required />
      </label>
      <label className="check">
        <input name="consent" type="checkbox" required /> {text.consent}
      </label>
      <Button type="submit">{text.submit}</Button>
      {status === "invalid" ? <p className="status">{text.invalid}</p> : null}
      {status === "not-sent" ? (
        <p className="status" role="status">
          {text.notSent}
        </p>
      ) : null}
    </form>
  );
}
