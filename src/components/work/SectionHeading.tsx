export function SectionHeading({
  index,
  kicker,
  title,
  aside,
  headingId,
}: {
  index?: string;
  kicker?: string;
  title: string;
  aside?: string;
  headingId: string;
}) {
  return (
    <header className="section-heading">
      {kicker ? <p className="section-heading__kicker">{kicker}</p> : null}
      {index ? <p className="section-heading__index">{index}</p> : null}
      <h2 id={headingId}>
        {title}
        {aside ? <span className="section-heading__aside"> / {aside}</span> : null}
      </h2>
    </header>
  );
}
